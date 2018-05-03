import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../app';
import models from '../models';

const { Business, User } = models;
const { expect } = chai;
chai.use(chaiHttp);

const runBeforeAll = () => {
  before((done) => {
    User.destroy({
      cascade: true,
      truncate: true
    });
    done();
  });
};

const doBeforeEach = () => {
  beforeEach((done) => {
    models.sequelize.sync();
    done();
  });
};
// CREATE
describe('POST USER /user', () => {
  runBeforeAll();
  // doBeforeEach();
  it('should create a new user', (done) => {
    const user = {
      email: 'validuser@email.com',
      firstname: 'Durant',
      lastname: 'Kevin',
      password: 'password123'
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res).to.be.an('object');
        done();
      });
  });

  it('should return an object', (done) => {
    const user = {
      email: 'usertwo@email.com',
      firstname: 'Durant',
      lastname: 'Kevin',
      password: 'password'
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        expect(res).to.be.an('object');
        done();
      });
  });

  it('firstname must contain only alphabets', (done) => {
    const user = {
      firstname: '',
      email: 'userone@email.com',
      lastname: 'Kevin',
      password: 'newpassword'
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        expect(res.body.error).to.equal('firstname must contain only alphabets');
        expect(res).to.have.status(400);
        done();
      });
  });

  it('lastname must contain only alphabets', (done) => {
    const user = {
      firstname: 'firstname',
      email: 'userone@email.com',
      lastname: '',
      password: 'newpassword',
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('lastname must contain only alphabets');
        done();
      });
  });

  it('You must provide a valid email address', (done) => {
    const user = {
      firstname: 'firstname',
      email: 'userone',
      lastname: 'lastname',
      password: 'newpassword',
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('You must provide a valid email address');
        done();
      });
  });

  it('Password must be between 6-15 characters', (done) => {
    const user = {
      firstname: 'firstname',
      email: 'userone@email.com',
      lastname: 'lastname',
      password: 'pass',
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('Password must be between 6-15 characters');
        done();
      });
  });

  it('Email already exist', (done) => {
    const user = {
      firstname: 'firstname',
      email: 'validuser@email.com',
      lastname: 'lastname',
      password: 'password123',
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('Email already exist');
        done();
      });
  });
});

// Login

describe('POST /auth/login', () => {
  it('should not authenticate an unregistered user', (done) => {
    const user = {
      email: 'invalid@email.com',
      password: 'password123'
    };
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(user)
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body.message).to.equal('Invalid email or password');
        done();
      });
  });

  it('should authenticate a registered user', (done) => {
    const user = {
      email: 'validuser@email.com',
      password: 'password123'
    };
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(user)
      .end((err, res) => {
        expect(res).to.have.status(202);
        expect(res.body.message).to.equal('User has been authenticated');
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

  it('should return Invalid email or password', (done) => {
    const user = {
      email: 'mail@email.com',
      password: 'wrongpassword'
    };
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(user)
      .end((err, res) => {
        expect(res.body.message).to.equal('Invalid email or password');
        expect(res).to.have.status(401);
        done();
      });
  });

  it('Should return User has been authenticated', (done) => {
    const user = {
      email: 'validuser@email.com',
      password: 'password123'
    };
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(user)
      .end((err, res) => {
        expect(res.body.message).to.equal('User has been authenticated');
        done();
      });
  });
});
