import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../app';

const { expect } = chai;
chai.use(chaiHttp);
// DELETE
describe('POST /user', () => {
  it('should create a new user', (done) => {
    const user = {
      id: 1,
      email: 'userone@email.com',
      firstname: 'Durant',
      lastname: 'Kevin',
      password: 'newpassword',
      createdAt: '03/03/2018',
      updatedAt: '03/03/2018'
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should return an object', (done) => {
    const user = {
      id: 1,
      email: 'userone@email.com',
      firstname: 'Durant',
      lastname: 'Kevin',
      password: 'newpassword',
      createdAt: '03/03/2018',
      updatedAt: '03/03/2018'
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        expect(res).to.be.an('object');
        done();
      });
  });

  it('should return an object', (done) => {
    const user = {
      id: 1,
      email: 'userone@email.com',
      firstname: 'Durant',
      lastname: 'Kevin',
      password: 'newpassword',
      createdAt: '03/03/2018',
      updatedAt: '03/03/2018'
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        expect(res.body.message).to.equal('User has been registered');
        done();
      });
  });
});

