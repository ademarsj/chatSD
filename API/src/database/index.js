const mongoose = require('mongoose')
  mongoose.connect('mongodb://root:wADgFe8F7DRa8TkKgBmgtdW6wE7wQTMGHMRu2@localhost:27117/api?authSource=admin').catch(e => {
    console.log('Error at connecting to database');

  })
//?retryWrites=true&authSource=admin
mongoose.Promise = global.Promise

module.exports = mongoose