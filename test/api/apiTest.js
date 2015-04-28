var request = require('supertest');
var assert = require('chai').assert;

describe('API Tests', function() {

  it('should get the bookmark list successfully', function(done) {
    request('http://localhost:3000')
      .get('/bookmarks')
      .expect(200)
      .end(function(err, res) {
        if(err) return done(err);
        assert.isDefined(res.text);
        done();
      });
  });

  it('should not get info about a specific bookmark without authentication', function(done) {
    request('http://localhost:3000')
      .get('/bookmarks/1')
      .expect(401)
      .end(function(err, res) {
        if(err) return done(err);
        assert.isDefined(res.text);
        assert.equal(res.text, '"Unauthorized"');
        done();
      });
  });

  it('should return status 404 when endpoint does not exist', function(done) {
    request('http://localhost:3000')
      .post('/bla')
      .expect(404)
      .end(function(err, res) {
        if(err) return done(err);
        assert.equal(res.text, 'Cannot POST /bla\n');
        done();
      });
  });

});
