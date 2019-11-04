const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:3000');

var message;
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})


ws.on('open', function open() {  
    readline.question(`What's your request?`, (message) => {
      ws.send(message);
      readline.close()
    })
  
});

ws.on('message', function incoming(data) {
  console.log(data);
  readline.question(`What's your request?`, (message) => {
    ws.send(message);
    readline.close()
  })
});