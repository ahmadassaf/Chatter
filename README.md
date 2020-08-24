Chatter
===============

This is a simple chat application to try out several new technologies like Node.js/Express/Web Sockets and Angular.js.

The requirements are straightforward:

- Create a REST API to authenticate users
- Allow authenticated users to initiate a chat session and exchange messages

## Code Organizations

Following a set of best practices before, the folders are organized in the following fashion:

```
├── client
│   ├── components
│   ├── css
│   ├── img
│   ├── js
│   │   ├── controllers
│   │   ├── directives
│   │   ├── filters
│   │   └── services
│   ├── lib
│   ├── translate
│   └── views
│       └── partials
├── configs
└── server
    ├── controllers
    ├── models
    └── tests
        ├── integration
        └── unit
            └── controllers
```

We did not use any [Yeoman](http://yeoman.io) generators as what we want is a simple structure.

## Design Decisions:

To better organize the front-end code, we are using [Require.js](http://requirejs.org/): It is a JavaScript file and module loader. It is optimized for in-browser use, but it can be used in other JavaScript environments, like Rhino and Node. It brings many advantages:

- Better code organizations into **modules**
- Asynchronous JavaScript loading (AMD)
- Compile and minify JavaScript into a single file

The main folders are:
- **Directives**: Hold custom Angular.js directives like the directives to handle navigation and visibility of various UI elements
- **Filters**: Hold the Angular.js filters. For example, formatting certain input, adding links to URLs in text, etc.
- **Services**: Handle the communication with the server side
- **Controllers**: The main Angular.js controllers

## Running the application

After cloning the application locally, run two commands:

- `npm install` to install the node.js dependencies defined in `package.json`
- `bower install` to install client side dependencies defined in `bower.json`
- Make sure you have MongoDB installed and an instance running
- Start the server by running `node server.js`
- Navigate to the browser to the address `http://localhost:8080`

## Running Tests

[Mocha](mochajs.org) is used to run some unit tests. The test we apply are:

```
  chatterme
    Authentication
GET / 200 224ms - 849b
      ✓ should be running with status code 200 (243ms)
POST /register 200 72ms - 37b
      ✓ should return success trying to register a new user (82ms)
POST /register 409 6ms - 19b
      ✓ should return error trying to register an existing user 
POST /login 200 49ms - 37b
      ✓ should return success trying to login an existing user (50ms)
POST /login 401 2ms - 13b
      ✓ should return error trying to login non existing user 
    Chat
      ✓ Should broadcast new user once they connect 
      ✓ Should broadcast new messages betwen users 
      ✓ Should broadcast when a user leave the room 
```
to run the tests simply execute `mocha` on the root folder of the application

## User Interface

You can register and login from this page. Unauthorized people will be always redirected to this login page. User after being logged in, will have a cookie stored locally that is verified on each server request and will be always redirected to the chat screen.

Logged in users have a badge that shows in the top. Users can communicate with each other via the message box. For each session, the messages are persisted on the server (not on the DB at the moment) and new users will be able to have the whole chat history.

### References

- [Code Organization in Large AngularJS and JavaScript Applications](http://cliffmeyers.com/blog/2013/4/21/code-organization-angularjs-javascript)
- [Building Huuuuuge Apps with AngularJS](http://briantford.com/blog/huuuuuge-angular-apps)
- [AngularJS + RequireJS](https://www.startersquad.com/blog/angularjs-requirejs/)


