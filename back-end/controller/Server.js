var socket = require('socket.io-client')('http://localhost:1337');
socket.on('connect', function(){
  console.log("1 client connected");
});
socket.on('saveUser', function(data){
  var obj = JSON.parse(data);
  console.log(obj);
});
socket.on('disconnect', function(){
  console.log("1 client connected");
});
