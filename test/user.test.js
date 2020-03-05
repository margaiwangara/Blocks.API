const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const User = require('../models/user');
const { user } = require('../data/test.data');

// init
const expect = chai.expect;

// middleware
chai.use(chaiHttp);

const updatedUser = {
  name: 'jane',
  email: 'janedoe@app.com',
};

describe('User', function() {
  before(function(done) {
    User.deleteMany({})
      .then(() => done())
      .catch(error => done(error));
  });

  // create new user
  describe('#POST /users', function() {
    it('should create a new user', function(done) {
      chai
        .request(server)
        .post('/api/users')
        .send(user)
        .then(res => {
          expect(res.status).to.eql(201);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.keys(
            'email',
            'profileImage',
            'name',
            'surname',
            '_id',
            'createdAt',
            'updatedAt',
            '__v',
          );
          expect(res.body).not.to.have.keys('password', 'role');
          done();
        })
        .catch(error => done(error));
    });
  });

  // get all users
  describe('#GET /users', function() {
    it('should get all user documents from user collection', function(done) {
      chai
        .request(server)
        .get('/api/users')
        .then(res => {
          expect(res.status).to.be.eq(200);
          expect(res.body).to.have.all.keys(
            'success',
            'data',
            'count',
            'pagination',
          );
          expect(res.body.success).to.be.true;
          expect(res.body.count).to.be.eql(1);
          expect(res.body.data).to.be.an('array');
          expect(res.body.data.length).to.be.eql(1);
          done();
        })
        .catch(error => done(error));
    });
  });

  // get single user
  describe('#GET /users/:id', function() {
    it('should get single user document from collection', function(done) {
      chai
        .request(server)
        .get(`/api/users/${user._id}`)
        .then(resp => {
          expect(resp.status).to.eql(200);
          expect(resp.body).to.be.an('object');
          expect(resp.body).to.have.keys(
            'email',
            'profileImage',
            'name',
            'surname',
            '_id',
            'createdAt',
            'updatedAt',
            '__v',
          );
          expect(resp.body).not.to.have.keys('password', 'role');
          expect(resp.body.email).to.be.eql(user.email);
          expect(resp.body.name).to.be.eql(user.name);
          expect(resp.body.surname).to.be.eql(user.surname);
          expect(resp.body.profileImage).to.be.eql(user.profileImage);
          done();
        })
        .catch(error => done(error));
    });
  });

  // update existing user
  describe('#PUT /users/:id', function() {
    it('should update an existing user data', function(done) {
      chai
        .request(server)
        .put(`/api/users/${user._id}`)
        .send(updatedUser)
        .then(u => {
          expect(u.status).to.be.eql(200);
          expect(u.body).to.be.an('object');
          expect(u.body.email).to.be.eql(updatedUser.email);
          expect(u.body.name).to.be.eql(updatedUser.name);
          expect(u.body).to.not.have.keys('password', 'role');
          done();
        })
        .catch(error => done(error));
    });
  });

  // delete existing user
  describe('#DELETE /users/:id', function() {
    it('should delete an existing user data', function(done) {
      chai
        .request(server)
        .delete(`/api/users/${user._id}`)
        .then(d => {
          expect(d.status).to.be.eql(200);
          expect(d.body).to.be.an('object');
          expect(d.body).to.have.keys('success', 'data');
          expect(d.body.data).to.be.an('object');
          expect(Object.keys(d.body.data).length).to.be.eql(0);
          done();
        })
        .catch(error => done(error));
    });
  });
});
