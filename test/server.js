process.env.NODE_ENV = process.env.NODE_ENV || 'test';
process.env.TEST_ENV = process.env.TEST_ENV || 'test';

var expect   = require('chai').expect;
var http     = require('http');
var sinon    = require('sinon');
var mongoose = require('mongoose');
var request  = require('supertest');
var config   = require('../configs/config');
var model    = require('../server/models/user');

describe('chatterme', function () {

    var url = "localhost:8080";
    var app = require('../server');

    before(function(done) {
      if (mongoose.connection.db) return done();
      mongoose.connect(config.url, function(){
        server = http.createServer(app).listen(8080, done);
      });
    });


    describe('Account', function() {

        var profile            = { email   : 'ahmad.a.assaf@test.com', password: '111111' };
        var nonExistingProfile = { email   : 'ahmad.a.assaf@idontexist.com', password: '111111' };

        it('should be running with status code 200', function(done) {
          request(app).get('/').expect(200, done);
        });

        it('should return success trying to register a new user', function(done) {
          request(url)
          .post('/register')
            .send(profile)
            .expect(200, done);
        });

        it('should return error trying to register an existing user', function(done) {
          request(url)
          .post('/register')
            .send(profile)
            .expect(409, done);
        });

        it('should return success trying to login an existing user', function(done) {
          request(url)
          .post('/login')
            .send(profile)
            .expect(200, done);
        });

        it('should return error trying to login non existing user', function(done) {
          request(url)
          .post('/login')
            .send(nonExistingProfile)
            .expect(401, done);
        });
    });

    after(function(done) {
      model.remove({email: 'ahmad.a.assaf@test.com'}, function(err){
        if (!err) done();
      });
    });

});