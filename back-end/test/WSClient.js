const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:3000');

const message = JSON.stringify({ 
    request : "chooseRandomOpponent", 
    UserID: 1
})

ws.on('open', function open() {
  ws.send(message);
});

ws.on('message', function incoming(data) {
  console.log(data);
});