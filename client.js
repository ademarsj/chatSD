const net = require('net');
const hostname = "localhost";
const PORT = 3000;
const socket = net.connect(PORT,hostname);


process.stdin.on('data', (data) => {
  socket.write(data);
})


socket.on('data', (name) => {
  console.log('Me respondeu:' + name);
});
