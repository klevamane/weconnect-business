import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../app';

const { expect } = chai;
chai.use(chaiHttp);

describe('/DELETE/:businessId', () => {
  it('should Return 204 if business is deleted', (done) => {
    const businessId = 1;
    chai.request(app)
      .delete(`/api/v1/businesses/${businessId}`)
      .end((err, res) => {
        expect(res).to.have.status(204);
        done();
      });
  });

  it('should return message: Business has been deleted', (done) => {
    const businessId = 1;
    chai.request(app)
      .delete(`/api/v1/businesses/${businessId}`)
      .end((err, res) => {
        expect(res.body.message).to.equal('Only business owner can delete a business');
        done();
      });
  });

  it('should return an object', (done) => {
    const businessId = 1;
    chai.request(app)
      .delete(`/api/v1/businesses/${businessId}`)
      .end((err, res) => {
        expect(res).to.be.an('object');
        done();
      });
  });

  it('should have a message', (done) => {
    const businessId = 1;
    chai.request(app)
      .delete(`/api/v1/businesses/${businessId}`)
      .end((err, res) => {
        expect(res.body).to.have.property('message');
        done();
      });
  });

  it('should have an error property', (done) => {
    chai.request(app)
      .delete(`/api/v1/businesses/${2}`)
      .end((err, res) => {
        expect(res.body).to.have.property('error');
        done();
      });
  });
});

it('should return {} if string is passed as an Id', (done) => {
  const valuepased = '';
  chai.request(app)
    .delete(`/api/v1/businesses/${valuepased}`)
    .end((err, res) => {
      expect(res.body).to.be.an('object');
      done();
    });
});

