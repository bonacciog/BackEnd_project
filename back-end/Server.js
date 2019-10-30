var c = require('./controller/Controller');
var http = require('http');

var server = http.createServer().listen(3000, 'localhost');

server.on('request', function (req, res) {
    if (req.method == 'POST') {
        var body = '';
    }

    req.on('data', function (data) {
        body += data;
    });

    req.on('end', function () {
        console.log("Arrived Data:\n" + body)
        var req = JSON.parse(body);
        c.eventRequest.emit(req.request, req, res);
    });
});

console.log('Listening on http://localhost:3000');