const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const path = require('path');
const routes = require('./routes');


const publicDir = path.resolve(__dirname,'../','public');
const pagesDir = path.resolve(__dirname,'../','pages');


//Renderizando o HTML e seus JS,CSS (Cliente)
app.use(express.static(publicDir));
app.set('view engine', 'ejs');
app.get('/', function(req, res) {
  res.render(path.join(pagesDir,'index'));
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(routes);

app.listen(3000, () => {
  console.log('Server running on PORT 3000')
})