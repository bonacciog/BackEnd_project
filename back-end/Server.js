const c = require('./controller/Controller');
const http = require('http');
const WebSocket = require('ws');

const server = http.createServer().listen(3000, 'localhost');
const wss = new WebSocket.Server({ server });



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

wss.on('connection', function (ws) {
    ws.on('message', function (req, ws) {
        var request = JSON.parse(req);
        c.eventRequest.emit(request.request, ws);
    });
});

console.log('Listening on http://localhost:3000');