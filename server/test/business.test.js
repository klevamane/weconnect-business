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
    const businessId = 7;
    chai.request(app)
      .delete(`/api/v1/businesses/${businessId}`)
      .end((err, res) => {
        expect(res.body.message).to.equal('Only business owner can delete a business');
        done();
      });
  });

  it('should return false error', (done) => {
    const businessId = 7;
    chai.request(app)
      .delete(`/api/v1/businesses/${businessId}`)
      .end((err, res) => {
        expect(res.body.error).to.equal(true);
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

  it('should have a message property', (done) => {
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

  it('should return {} if string is passed as an Id', (done) => {
    const valuepased = '';
    chai.request(app)
      .delete(`/api/v1/businesses/${valuepased}`)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should delete a business', (done) => {
    const businessId = 1;
    chai.request(app)
      .delete(`/api/v1/businesses/${businessId}`)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        done();
      });
  });
});

// POST
describe('POST Business /:businessId', () => {
  it('should return 201 statuscode if business is created', (done) => {
    const newBusiness = {
      id: 3,
      name: 'businessname',
      location: 'aba',
      mobile: '08025786657',
      description: 'This is the description',
      url: 'www.eand.com',
      category: 'IT'
    };
    chai.request(app)
      .post('/api/v1/businesses')
      .send(newBusiness)
      .end((err, res) => {
        expect(res).to.have.status(201);
        done();
      });
  });

  it('should return 406 Not Acceptable status code', (done) => {
    const newBusiness = {
      id: 3,
      name: '',
      location: 'aba',
      mobile: '08025786657',
      description: 'This is the description',
      url: 'www.eand.com',
      category: 'IT'
    };
    chai.request(app)
      .post('/api/v1/businesses')
      .send(newBusiness)
      .end((err, res) => {
        expect(res).to.have.status(406);
        done();
      });
  });

  it('should return Business must have a name, category and Location', (done) => {
    const newBusiness = {
      id: 3,
      name: 'name',
      location: '',
      mobile: '08025786657',
      description: 'This is the description',
      url: 'www.eand.com',
      category: 'IT'
    };
    chai.request(app)
      .post('/api/v1/businesses')
      .send(newBusiness)
      .end((err, res) => {
        expect(res).to.have.status(406);
        expect(res.body.message).to.equal('Business must have a name, category and Location');
        done();
      });
  });


  it('should return Business has been registered', (done) => {
    const newBusiness = {
      id: 3,
      name: 'businessnamenew',
      location: 'aba',
      address1: 'Theaddressofthebusiness',
      mobile: '08179578665',
      description: 'Thisisthedescription',
      url: 'njjkj',
      category: 'IT'
    };
    chai.request(app)
      .post('/api/v1/businesses')
      .send(newBusiness)
      .end((err, res) => {
        expect(res.body.message).to.equal('Business has been registered');
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
describe('/GET Business/', () => {
  it('should Return 200 if businesses are displayed', (done) => {
    chai.request(app)
      .get('/api/v1/businesses')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.businesses[0]).to.have.property('id');
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

  it('should display "List of all registered businesses"', (done) => {
    chai.request(app)
      .get('/api/v1/businesses')
      .end((err, res) => {
        expect(res.body.message).to.equal('List of all registered businesses');
        done();
      });
  });
});
// GET by Id
describe('/GET By ID/:businessId', () => {
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
        expect(responseSize).to.not.be.above(1);
        expect(res).to.have.status(400);
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

describe('/GET BUSINESSES BY LOCATION', () => {
  it('should Return an object', (done) => {
    const location = 'bayelsa';
    chai.request(app)
      .get(`/api/v1/businesses?location=${location}`)
      .end((err, res) => {
        expect(res).to.be.an('object');
        done();
      });
  });

  it('should Return id property = 2', (done) => {
  //  const location = 'rivers';
    chai.request(app)
      .get('/api/v1/businesses?location=rivers')
      .end((err, res) => {
        expect(res.body.locationArray[0]).to.have.property('id');
        expect(res.body.locationArray[0]).to.have.property('ownerId');
        expect(res.body.locationArray[0]).to.have.property('mobile');
        expect(res.body.locationArray[0]).to.have.property('category');
        done();
      });
  });
});

// CATEGORY
describe('/GET By Business by CATEGORY filter', () => {
  it('Should get a business', (done) => {
    chai.request(app)
      .get('/api/v1/businesses?category=Medicine')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
  it('Should not GET a business', (done) => {
    chai.request(app)
      .get('/api/v1/businesses?category=Mediciner')
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
});
