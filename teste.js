const blessed = require('blessed');

var screen = blessed.screen({
  smartCSR: true
});

screen.title = 'my window title';

var textInput = blessed.textarea({
  border: 'line',
  focused: true,
  label: ' Digite sua mensagem ',
  bottom: 0,
  focusable: true,
  parent: screen,
  clickable: true,
  height: '30%',
  input: true,
  inputOnFocus: true, //se deixar ele fica sempre no input, não consegue fazer rolagem
});

var boxArea = blessed.box({
  border: 'bg',
  top: 0,
  height: '65%',
  // content: 'Teste de box',
  scrollable: true,
  scrollbar: true,
  focusable: true,
  style: {
    fg: 'green', //Cor da letra
    bg: 'white', //cor de fundo
    border: {
      fg: 'blue',
      bg: 'green'
    },
    scrollbar: {
      bg: 'red',
      fg: 'blue'
    }
  },
  tags: true,
})
screen.append(boxArea);

screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});

textInput.key(['enter'], function(ch, key) {
  const texto = textInput.getText();
  textInput.clearValue();
  return textInput.emit('submit', texto);
});

// If our box is clicked, change the content.
boxArea.on('click', function(data) {
  textInput.inputOnFocus = false;
  boxArea.focus();
  screen.render();
});

textInput.on('submit', (text) => {
  // boxArea.setContent('{right}Even different {black-fg}content{/black-fg}.{/right}\n');
  // boxArea.setLine(1, 'bar');
  //da para mudar a cor dependendo de quem manda, otimo e tbm jogar para a direita :)
  boxArea.insertLine(1, `{right}{#ff0000-fg} ${text} {#ff0000-fg}{/right}`); 
  boxArea.insertLine(1, text); 
  // boxArea.inser
  screen.render();
});

textInput.on('click', (e) => {
  // textInput.enableInput();
  textInput.inputOnFocus = true;
  // screen.render();
})

screen.append(textInput);

screen.render();