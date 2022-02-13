const net = require('net');
const hostname = "localhost";
const PORT = 3333;

const socket = new net.Socket();
socket.connect(PORT,hostname);
//O método abaixo faz exatamente a mesma coisa, ele cria um socket TCP e 
//já realiza a conexão
// const socket = net.connect(PORT,hostname);

process.stdin.on('data', (data) => {
  socket.write(data);
});

socket.on('error', () => {
  console.log('A conexão com o servidor foi interrompida, não será possível enviar a mensagem.' + '\n');
  process.exit(0);
})

socket.on('connect', () => {
  const dateOfMessage = new Date().toLocaleString('pt-BR');
  console.log('Conectado em ' + dateOfMessage + '\n');
});

socket.on('close', () => {
  const dateOfMessage = new Date().toLocaleString('pt-BR');
  console.log('\x1b[31m%s\x1b[0m','Socket perdeu a conexão (' + dateOfMessage+ ')' + '\n');
});


socket.on('data', (message) => {
  const dateOfMessage = new Date().toLocaleString('pt-BR');
  console.log('\x1b[32m%s\x1b[0m',dateOfMessage + ': ' + message + '\n');
});
