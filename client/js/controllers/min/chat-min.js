define(["./module","underscore"],function(e,s){"use strict";var n,o;e.controller("chat",["$scope","authentication","socket",function(e,s,u){e.messages=[],e.users=[],n=u,o=s.user,u.emit("init",o,function(s){e.users=s}),u.on("user:join",function(s){console.log(s),console.log(s.username+" has just joined"),e.users.push(s)}),u.on("user:message",function(s){e.messages.push(s)}),e.sendMessage=function(){var s={sender:o.username,initials:o.username.replace(/\W*(\w)\w*/g,"$1").toUpperCase(),message:e.message};n.emit("chat",s),e.messages.push(s),e.message=""}}])});