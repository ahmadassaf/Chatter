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

### References

- [Code Organization in Large AngularJS and JavaScript Applications](http://cliffmeyers.com/blog/2013/4/21/code-organization-angularjs-javascript)
- [Building Huuuuuge Apps with AngularJS](http://briantford.com/blog/huuuuuge-angular-apps)
- [AngularJS + RequireJS](https://www.startersquad.com/blog/angularjs-requirejs/)


