const express = require('express');
const path = require('path');
const { emit } = require('process');

const app = express();
// Definindo protocolo http
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const port = 3000;

app.use(express.static(path.join(__dirname, 'frontend')));
app.set('views', path.join(__dirname, 'frontend'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// Renderização da página inicial.
app.use('/', (req,res)=> {
  res.render('index.html');
})

// Array das mensagens
let messages = [];

// Implementação dos Socket

// socket.emit = Enviar uma mensagem unicamente para um socket especifico.
// socket.on = Ouvir uma mensagem
// socket.broadcast.emit = Enviar uma mensagem para todos os socket conectados na aplicação.

// Sempre que um usuário conectar ao servidor ele vai receber um socket e realizar os procedimentos abaixo.
io.on('connection', socket =>{
  console.log(`Socket conectado: ${socket.id}`);
  // Envia todas mensagens já enviadas para um novo cliente que conectou.
  socket.emit('previousMessages', messages);
  // Recebe o messageObject do frontend e faz o tratamento das informações.
  socket.on('sendMessage', data => {
    messages.push(data);
    socket.broadcast.emit('receivedMessage',data);
  });
});


// Iniciando servidor.
server.listen(port, () => {
  console.log('Servidor Iniciado na Porta ', port)
})