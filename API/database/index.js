const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/api')
mongoose.Promise = global.Promise

module.exports = mongoose