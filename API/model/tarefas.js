const mongoose = require('../database')

const TarefaSchema = new mongoose.Schema({
  id: {
    type: Number,
    require: true
  },
  descricao: {
    type: String,
    require: true
  },
  prazo: {
    type: Date,
    require: true
  },
  completa: {
    type: Boolean,
    required: true
  }
})

const Tarefa = mongoose.model('Tarefa', TarefaSchema)
module.exports = Tarefa