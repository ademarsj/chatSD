const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://usuario:senha@api-sistemas-distribuid.0mtvy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})
mongoose.Promise = global.Promise

try {
  let db = mongoose.connection
  db.on('errr', console.error.bind(console, 'erro de conexao no banco'))
} catch (e) {
  console.log(e)
}

module.exports = mongoose 