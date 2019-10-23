var c = require('./controller/Controller');
var http = require('http');

var server = http.createServer().listen(3000, '127.0.0.1');

server.on('request', function (req, res) {
    if (req.method == 'POST') {
        var body = '';
    }

    req.on('data', function (data) {
        body += data;
    });

    req.on('end', function () {
        console.log("Arrived Data:\n" + body)
        c.switchRequestsAndServe(body, res);
    });
});

console.log('Listening on http://localhost:3000');