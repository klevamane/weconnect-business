import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../app';
import reviews from '../model/reviewModel';

const { expect } = chai;
chai.use(chaiHttp);

describe('POST REVIEW /business / review', () => {
  it('it should return 201 status code', (done) => {
    const review = {
      id: reviews.length + 1,
      userId: 1,
      comment: 'The comment',
      businessId: 1,
    };
    chai.request(app)
      .post('/api/v1/businesses/:businessId/reviews')
      .send(review)
      .end((err, res) => {
        expect(res).to.have.status(201);
        done();
      });
  });
  it('it should return 401 (Unauthorized) status code', (done) => {
    const businessId = 6;
    chai.request(app)
      .post(`/api/v1/businesses/${businessId}/reviews`)
      .end((err, res) => {
        expect(res.statusCode).to.equal(401);
        done();
      });
  });
});

describe('GET /business / review', () => {
  it('it should return an object', (done) => {
    const businessId = 1;
    chai.request(app)
      .get(`/api/v1/businesses/${businessId}/reviews`)
      .end((err, res) => {
        expect(res).to.be.an('object');
        done();
      });
  });
  it('it should return 302 status code', (done) => {
    const businessId = 1;
    chai.request(app)
      .get(`/api/v1/businesses/${businessId}/reviews`)
      .end((err, res) => {
        expect(res.statusCode).to.equal(302);
        done();
      });
  });
});
