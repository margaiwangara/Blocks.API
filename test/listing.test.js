const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const Listing = require('../models/listing');

// init
const expect = chai.expect;

// middleware
chai.use(chaiHttp);

const listing = {
  title: '45 Drivewood Circle',
  description:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia recusandae esse reiciendis officia omnis non rerum dicta cupiditate nostrum molestias deserunt aut minus inventore animi atque, consequuntur ad fugit',
  address: 'Norwood MA, 02062',
  price: 490000,
  features: {
    bedrooms: 3,
    bathrooms: 2,
    sqft: 3200,
    garage: 2,
    lotSize: 2.5,
  },
  listDate: new Date(2018, 8, 30),
  isPublished: true,
};

describe('Listing', function() {
  before(function(done) {
    Listing.deleteMany({})
      .then(() => done())
      .catch(error => done(error));
  });

  // Create listing
  describe('#POST /listings', function() {
    it('should create a new listing', function(done) {
      chai
        .request(server)
        .post('/api/listings')
        .send(listing)
        .then(res => {
          expect(res.status).to.be.eql(201);
          expect(res.body).to.be.an('object');
          expect([res.body].length).to.be.eql(1);

          // get all listings
          describe('#GET /listings', function() {
            it('should get all listings', function(done) {
              chai
                .request(server)
                .get('/api/listings')
                .then(gl => {
                  expect(gl.status).to.be.eql(200);
                  expect(gl.body).to.be.an('object');
                  expect(gl.body).to.have.all.keys(
                    'count',
                    'pagination',
                    'success',
                    'data',
                  );
                  expect(gl.body.count).to.be.eql(1);
                  expect(gl.body.pagination).to.be.an('object');
                  expect(gl.body.data).to.be.an('array');
                  expect(gl.body.data.length).to.be.eql(1);
                  done();
                })
                .catch(error => done(error));
            });
          });

          // get single listing
          describe('#GET /listings/:id', function() {
            it('should get a single listing', function(done) {
              chai
                .request(server)
                .get(`/api/listings/${res.body._id}`)
                .then(gsl => {
                  expect(gsl.status).to.be.eql(200);
                  expect(gsl.body).to.be.an('object');
                  done();
                })
                .catch(error => done(error));
            });
          });

          // update listing
          describe('#UPDATE /listings/:id', function() {
            it('should update existing listing', function(done) {
              chai
                .request(server)
                .put(`/api/listings/${res.body._id}`)
                .send({
                  title: '18 Jefferson Lane',
                  address: 'Woburn MA, 01801',
                  price: 300000,
                })
                .then(ul => {
                  expect(ul.status).to.be.eql(200);
                  expect(ul.body).to.be.an('object');
                  done();
                })
                .catch(error => done(error));
            });
          });

          // delete listing
          describe('#DELETE /listings/:id', function() {
            it('should delete an existing listing', function(done) {
              chai
                .request(server)
                .delete(`/api/listings/${res.body._id}`)
                .then(dl => {
                  expect(dl.status).to.be.eql(200);
                  expect(dl.body).to.be.an('object');
                  expect(dl.body).to.have.all.keys('success', 'data');
                  expect(Object.keys(dl.body.data).length).to.be.eql(0);
                  done();
                })
                .catch(error => done(error));
            });
          });
          done();
        })
        .catch(error => done(error));
    });
  });
});
