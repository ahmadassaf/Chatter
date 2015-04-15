var path     = require('path');
var rootPath = path.normalize(__dirname + '/..');

module.exports = {
  development: {
    db: 'mongodb://localhost:27017/chatter',
    port: 8080
  },
  test: {
    db: 'mongodb://localhost:27017/chatter',
    port: 8888
  }
}