const  EventEmitter = require('events').EventEmitter;
var eventRequest = new EventEmitter();

eventRequest.on('saveUser', function(req,res){
    console.log("ciao");
})

eventRequest.emit("saveUser")