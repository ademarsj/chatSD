const net = require('net');
const hostname = "localhost";
const PORT = 3333;

/**
 * Algumas informações sobre o net (lib oficial do nodeJS)
 * - O net por si só já é assincrono em termos de I/O (não é multi-thread por padrão)
 * - O net utiliza protocolos TCP ou ICP, isso já mostra nossa escolha (se fosse um UDP tem uma lib  chamada "dgram" no nodeJS)
 */

net.createServer((socket) => {
  //A cada requisição recebida essa função é executada e então é criado um socket,
  // e a esse socket é atribuido um "listener" para seu evento de recebimento de 
  //mensagem "data" após enviar uma resposta de que a conexão foi estabelecida. 
  console.log('** Nova conexão estabeleciada **' + '\n')
  socket.on('data', (message) => {
    const dateOfMessage = new Date().toLocaleString('pt-BR');
    console.log('\x1b[33m%s\x1b[0m',dateOfMessage + ': '+ message + '\n');
  });
  
  socket.on('close', () => {
    const dateOfMessage = new Date().toLocaleString('pt-BR');
    console.log('\x1b[31m%s\x1b[0m','Socket perdeu a conexão (' + dateOfMessage+ ')' + '\n');
  });
  
  process.stdin.on('data', (data) => {
    socket.write(data);
  })

}).listen(PORT, hostname);