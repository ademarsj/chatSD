const net = require('net');
const hostname = "localhost";
const PORT = 3000;
net.createServer((socket) => {
  console.log('Client connected');
  socket.write('Seu socket é:' + Math.random());
  socket.on('data', (message) => {
    const dateOfMessage = new Date().toLocaleString('pt-BR');
    console.log(dateOfMessage + ': '+ message);
  });

  process.stdin.on('data', (data) => {
    console.log('You: ' + data);
    socket.write(data);
  })

}).listen(PORT, hostname)