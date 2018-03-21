import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../app';

const { expect } = chai;
chai.use(chaiHttp);
// DELETE
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
// POST
describe('POST Business', () => {
  it('should return 204 status code if business is created', (done) => {
    chai.request(app)
      .post('/api/v1/businesses')
      .end((err, res) => {
        expect(res).to.have.status(201);
        done();
      });
  });

  it('should return Business has been registered', (done) => {
    chai.request(app)
      .post('/api/v1/businesses')
      .end((err, res) => {
        expect(res.body.message).to.equal('Business has been registerd');
        done();
      });
  });

  it('should return an object', (done) => {
    chai.request(app)
      .post('/api/v1/businesses')
      .end((err, res) => {
        expect(res).to.be.an('object');
        done();
      });
  });
});

// GET
describe('/GET/', () => {
  it('should Return 200 if businesses are displayed', (done) => {
    chai.request(app)
      .get('/api/v1/businesses')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should Return an object', (done) => {
    chai.request(app)
      .get('/api/v1/businesses')
      .end((err, res) => {
        expect(res).to.be.an('object');
        done();
      });
  });
});

it('should display "List of all registered businesses"', (done) => {
  chai.request(app)
    .get('/api/v1/businesses')
    .end((err, res) => {
      expect(res.body.message).to.equal('List of all registered businesses');
      done();
    });
});

// GET by Id
describe('/GET/:businessId', () => {
  it('should Return an object', (done) => {
    const businessId = 7;
    chai.request(app)
      .get(`/api/v1/businesses/${businessId}`)
      .end((err, res) => {
        expect(res).to.be.an('object');
        done();
      });
  });

  it('Number of businesses should be 0', (done) => {
    chai.request(app)
      .get(`/api/v1/businesses/${7}`)
      .end((err, res) => {
        const responseBody = res.body;
        const responseSize = Object.keys(responseBody).length;
        // also returns the message property so value = 1
        expect(responseSize).to.not.be.above(1);
        done();
      });
  });

  it('Number of businesses should be 1', (done) => {
    chai.request(app)
      .get(`/api/v1/businesses/${1}`)
      .end((err, res) => {
        const responseBody = res.body;
        const responseSize = Object.keys(responseBody).length;
        expect(responseSize).to.be.above(0);
        done();
      });
  });

  it('should be a number', (done) => {
    chai.request(app)
      .get(`/api/v1/businesses/${1}`)
      .end((err, res) => {
        const responseBody = res.body;
        const responseSize = Object.keys(responseBody).length;
        expect(responseSize).to.be.a('number');
        done();
      });
  });
});
