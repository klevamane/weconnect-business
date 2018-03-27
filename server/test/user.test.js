import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../app';

const { expect } = chai;
chai.use(chaiHttp);
// CREATE
describe('POST USER /user', () => {
  it('should create a new user', (done) => {
    const user = {
      id: '',
      email: '',
      firstname: '',
      lastname: '',
      password: '',
      createdAt: '',
      updatedAt: ''
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

describe('POST /auth/login', () => {
  it('should authenticate a registered user', (done) => {
    const user = {
      email: 'mail@email.com',
      password: 'pass'
    };
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(user)
      .end((err, res) => {
        expect(res).to.have.status(202);
        done();
      });
  });

  it('should return 401 unathorized user', (done) => {
    const user = {
      email: 'mail@email.com',
      password: 'wrongpassword'
    };
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(user)
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });

  it('should return Wrong login credentials', (done) => {
    const user = {
      email: 'mail@email.com',
      password: 'wrongpassword'
    };
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(user)
      .end((err, res) => {
        expect(res.body.message).to.equal('Wrong login credentials');
        done();
      });
  });

  it('should return Valid user', (done) => {
    const user = {
      email: 'mail@email.com',
      password: 'pass'
    };
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(user)
      .end((err, res) => {
        expect(res.body.message).to.equal('Valid user');
        done();
      });
  });
});

