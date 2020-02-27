const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const User = require('../models/user');

// init
const expect = chai.expect;

// middleware
chai.use(chaiHttp);

describe('Authentication', function() {
  describe('#POST /auth/register', function() {
    // clear db before test
    before(function(done) {
      User.deleteMany({})
        .then(() => done())
        .catch(error => done(error));
    });

    it('should register a new user', function(done) {
      const user = {
        email: 'testuser@app.com',
        password: 'TestUser1',
      };

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
});
