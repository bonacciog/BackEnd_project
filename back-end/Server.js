const c = require('./controller/Controller');
const http = require('http');
const WebSocket = require('ws');

const ipAddress = '80.211.33.82';
const port = 3000;

const server = http.createServer().listen(port, ipAddress);
const wss = new WebSocket.Server({ server });


server.on('request', function (req, res) {

    if (req.method == 'POST') {
        var body = '';
    }

    req.on('data', function (data) {
        body += data;
    });

    req.on('end', function () {
        try {
            console.log("[" + Date(Date.now()).toString() + "] - " + "[Server]: Arrived request:\n" + body)
            var req = JSON.parse(body);
            c.eventRequest.emit(req.request, req, res);
        }
        catch (err) {
            console.log("[" + Date(Date.now()).toString() + "] - " + "[Server]: Error in trying to serve the request: \n" + err)
        }
    });
});

wss.on('connection', function (ws) {

    ws.on('message', function (req) {
        try {
            console.log("[" + Date(Date.now()).toString() + "] - " + "[Server]: Arrived request:\n" + req)
            var request = JSON.parse(req);
            c.eventRequest.emit(request.request, request, this);
        }
        catch (err) {
            console.log("[" + Date(Date.now()).toString() + "] - " + "[Server]: Error in trying to serve the request: \n" + err)
        }
    });
});

console.log("[" + Date(Date.now()).toString() + "] - " + '[Server]: Listening on http://' + ipAddress + ':' + port);
