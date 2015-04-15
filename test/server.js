process.env.NODE_ENV = 'test';
process.env.TEST_ENV = 'test';

var expect   = require('chai').expect;
var http     = require('http');
var sinon    = require('sinon');
var mongoose = require('mongoose');
var request  = require('supertest');
var io       = require('socket.io-client')
var config   = require('../configs/config');
var model    = require('../server/models/user');

describe('chatterme', function () {

  var url           = "http://localhost:8888";
  var app           = require('../server');
  var socketOptions = {
    transports            : ['websocket'],
    'force new connection': true,
    'reconnection delay'  : 0,
    'reopen delay'        : 0
  };

  before(function(done) {
    if (mongoose.connection.db) return done();
    mongoose.connect(config.url, function(){
      server = http.createServer(app).listen(8080, done);
    });
  });


  describe('Authentication', function() {

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

  describe('Chat', function(){

    var client;
    var chatUser1 = {'username':'ahmad'};
    var chatUser2 = {'username':'assaf'};

    beforeEach(function(done) {

      client = io.connect(url, socketOptions);
      client.on('connect',function(){
        //console.log('WebSocket server connected !');
        client.emit('init',chatUser1, function(response){
          expect(response).to.have.property('connectedUsers');
        });
        done();
      });

      client.on('disconnect', function() {
        //console.log('WebSocket server disconnected...');
      });
    });

    it('Should broadcast new user once they connect',function(done){
      client.emit('init',chatUser2, function(response){
        expect(response).to.have.property('connectedUsers');
        expect(response.connectedUsers.ahmad).to.have.property('username').and.equal('ahmad');
        done();
      });
    });

    it('Should broadcast new messages betwen users',function(done){
      var template = 'Hello World';
      var guest    = io.connect(url, socketOptions);
      client.on('user:message', function(message) {
        expect(message).to.be.a('string').and.equal(template);
        done();
      });
      guest.emit('chat', template);

    });

    it('Should broadcast when a user leave the room',function(done){
      var guest    = io.connect(url, socketOptions);
      client.on('user:leave', function(user) {
        expect(user).to.have.property('username').and.equal('assaf');
        done();
      });
      guest.emit('user:leave', chatUser2);

    });

    afterEach(function(done) {
      if(client.connected) {
          //console.log('disconnecting...');
          client.disconnect();
      } else {
          // There will not be a connection unless you have done() in beforeEach, socket.on('connect'...)
          //console.log('no connection to break...');
      }
      done();
    });
  });

  after(function(done) {
    model.remove({email: 'ahmad.a.assaf@test.com'}, function(err){
      if (!err) done();
    });
  });

});