var http = require('http');




var server = http.createServer(function (req, res) {
  console.log("1 request arrived\ndata = \n" + req);
  var request = JSON.parse(req);
  /*if(request.request === "SaveUser"){
      console.log(request.user);
  }
  else
    console.log("Interaction error");
  */
})
server.listen(1337, '127.0.0.1');


console.log('Server running at http://127.0.0.1:1337/');