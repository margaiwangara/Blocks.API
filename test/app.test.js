const expect = require('chai').expect;

describe('Initial Test', function() {
  describe('typeof string', function() {
    it('should return typeof string', function() {
      expect('hello world')
        .to.be.a('string')
        .with.lengthOf(11);
    });
  });
});
