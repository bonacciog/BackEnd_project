var http = require('http');
var data = JSON.stringify({
  data: "OK"
});

var server = http.createServer().listen(3000, '127.0.0.1');

server.on('request', function (req, res) {
    if (req.method == 'POST') {
        var body = '';
    }

    req.on('data', function (data) {
        body += data;
    });

    req.on('end', function () {
        var post = JSON.parse(body);
        console.log(post);
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(data);
    });
});

console.log('Listening on http://127.0.0.1:3000');