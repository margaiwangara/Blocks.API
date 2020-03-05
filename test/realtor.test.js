const chai = require('chai');
const chaiHttp = require('chai-http');
const Realtor = require('../models/realtor');
const server = require('../index');
const { realtor } = require('../data/test.data');

// init
const expect = chai.expect;

// middleware
chai.use(chaiHttp);

const updatedRealtor = {
  name: 'Jane Doe',
  email: 'janedoe@app.com',
  hireDate: new Date(2019, 11, 25),
};

describe('Realtor', function() {
  before(function(done) {
    Realtor.deleteMany({})
      .then(() => done())
      .catch(error => done(error));
  });

  // create new realtor
  describe('#POST /realtors', function() {
    it('should create new realtor', function(done) {
      chai
        .request(server)
        .post('/api/realtors')
        .send(realtor)
        .then(res => {
          expect(res.status).to.be.eql(201);
          expect(res.body).to.be.an('object');
          expect([res.body].length).to.be.eql(1);
          done();
        })
        .catch(error => done(error));
    });
  });

  // get all realtors
  describe('#GET /realtors', function() {
    it('should get all realtors', function(done) {
      chai
        .request(server)
        .get('/api/realtors')
        .then(res => {
          expect(res.status).to.be.eql(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.all.keys(
            'data',
            'pagination',
            'success',
            'count',
          );
          expect(res.body.data).to.be.an('array');
          expect(res.body.data.length).to.be.eql(1);
          expect(res.body.pagination).to.be.an('object');
          expect(res.body.success).to.be.true;
          expect(res.body.count).to.be.eql(1);
          done();
        })
        .catch(error => done(error));
    });
  });

  // get single realtor
  describe('#GET /realtors/:id', function() {
    it('should get a single realtor', function(done) {
      chai
        .request(server)
        .get(`/api/realtors/${realtor._id}`)
        .then(res => {
          expect(res.status).to.be.eql(200);
          expect(res.body).to.be.an('object');
          expect([res.body].length).to.be.eql(1);

          done();
        })
        .catch(error => done(error));
    });
  });

  // update existing realtor
  describe('#PUT /realtors/:id', function() {
    it('should update an existing realtor', function(done) {
      chai
        .request(server)
        .put(`/api/realtors/${realtor._id}`)
        .send(updatedRealtor)
        .then(res => {
          expect(res.status).to.be.eql(200);
          expect(res.body).to.be.an('object');
          expect([res.body].length).to.be.eql(1);
          expect(res.body.name).to.be.eql(updatedRealtor.name);
          expect(res.body.email).to.be.eql(updatedRealtor.email);
          expect(new Date(res.body.hireDate).getTime()).to.be.eql(
            updatedRealtor.hireDate.getTime(),
          );
          done();
        })
        .catch(error => done(error));
    });
  });

  // delete an existing realtor
  describe('#DELETE /realtors/:id', function() {
    it('should delete an existing realtor', function(done) {
      chai
        .request(server)
        .delete(`/api/realtors/${realtor._id}`)
        .then(res => {
          expect(res.status).to.be.eql(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.all.keys('success', 'data');
          expect(res.body.success).to.be.true;
          expect(res.body.data).to.be.an('object');
          expect(Object.keys(res.body.data).length).to.be.eql(0);
          done();
        })
        .catch(error => done(error));
    });
  });
});
