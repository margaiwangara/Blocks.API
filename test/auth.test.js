const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const User = require('../models/user');

// init
const expect = chai.expect;

// middleware
chai.use(chaiHttp);

// test user
const user = {
  email: 'testuser@app.com',
  password: 'TestUser1',
};

describe('Authentication', function() {
  // clear db before test
  before(function(done) {
    User.deleteMany({})
      .then(() => done())
      .catch(error => done(error));
  });
  // register test
  describe('#POST /auth/register', function() {
    it('should register a new user', function(done) {
      chai
        .request(server)
        .post('/api/auth/register')
        .send(user)
        .then(res => {
          expect(res.status).to.eql(201);
          expect(res.body)
            .to.be.an('object')
            .and.to.have.keys('token', 'user');
          expect(res.body.user)
            .to.be.an('object')
            .and.to.have.keys('email', 'id');
          expect(res.body.token).to.be.a('string');
          done();
        })
        .catch(error => done(error));
    });
  });

  // login test
  describe('#POST /auth/login', function() {
    it('should log in an existing user', function(done) {
      chai
        .request(server)
        .post('/api/auth/login')
        .send(user)
        .then(res => {
          expect(res.status).to.eql(200);
          expect(res.body)
            .to.be.an('object')
            .and.to.have.keys('token', 'user');
          expect(res.body.user)
            .to.be.an('object')
            .and.to.have.keys('email', 'id');
          expect(res.body.user.email).to.eql(user.email);
          expect(res.body.token).to.be.a('string');
          done();
        })
        .catch(error => done(error));
    });
  });
});
