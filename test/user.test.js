const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const User = require('../models/user');

// init
const expect = chai.expect;

// middleware
chai.use(chaiHttp);

describe('User', function() {
  before(function(done) {
    User.deleteMany({})
      .then(() => done())
      .catch(error => done(error));
  });

  describe('#GET /users', function() {
    it('should get all user documents from user collection', function(done) {
      chai
        .request(server)
        .get('/api/users')
        .then(res => {
          expect(res.status).to.eq(200);
          expect(res.body).to.have.all.keys(
            'success',
            'data',
            'count',
            'pagination',
          );
          expect(res.body.success).to.be.true;
          expect(res.body.count).to.be.eql(0);
          expect(res.body.data).to.be.an('array');
          expect(res.body.data.length).to.be.eql(0);
          done();
        })
        .catch(error => done(error));
    });
  });

  // create new user
  describe('#POST /users', function() {
    it('should create a new user', function(done) {
      chai
        .request(server)
        .post('/api/users')
        .send({
          name: 'John',
          surname: 'Doe',
          email: 'johndoe@app.com',
          password: 'JohnDoe1',
        })
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

          // get single user
          describe('#GET /users/:id', function() {
            it('should get single user document from collection', function(done) {
              chai
                .request(server)
                .get(`/api/users/${res.body._id}`)
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
                  expect(resp.body.email).to.be.eql(res.body.email);
                  expect(resp.body.name).to.be.eql(res.body.name);
                  expect(resp.body.surname).to.be.eql(res.body.surname);
                  expect(resp.body.profileImage).to.be.eql(
                    res.body.profileImage,
                  );
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
                .put(`/api/users/${res.body._id}`)
                .send({ name: 'jane', email: 'janedoe@app.com' })
                .then(u => {
                  expect(u.status).to.be.eql(200);
                  expect(u.body).to.be.an('object');
                  expect(u.body.email).to.not.be.eql(res.body.email);
                  expect(u.body.name).to.not.be.eql(res.body.name);
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
                .delete(`/api/users/${res.body._id}`)
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
        })
        .catch(error => done(error));
    });
  });
});
