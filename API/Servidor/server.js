const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const Tarefa = require('../model/tarefas')

app.get('/tarefas/:id', async (req, res) => {
  const tarefa = await Tarefa.findOne({ id: req.params.id })
  if (tarefa) {
    return res.status(200).json(tarefa)
  }
  else {
    return res.status(400).send('Falha ao encontrar tarefa.')
  }

})

app.delete('/tarefas/:id', async (req, res) => {
  const tarefa = await Tarefa.findOneAndRemove({ id: req.params.id })
  if (tarefa) {
    return res.status(204).send('Tarefa excluida')
  }
  else {
    return res.status(400).send('Falha ao excluir tarefa.')
  }
})

app.put('/tarefas/:id', async (req, res) => {
  const { id } = req.params.id
  const { data } = req.body
  const tarefa = await Tarefa.findOneAndUpdate({
    id, data, new: true, upsert: true
  })
  if (tarefa) {
    return res.status(201).send('Created')
  }
  else {
    return res.status(400).send('Falha ao excluir tarefa.')
  }
})

app.post('/tarefas', async (req, res) => {
  try {
    const tarefa = await Tarefa.create(req.body)
    return res.send({ tarefa })
  } catch (e) {
    return res.status(400).send({ erro: 'Falha ao registrar tarefa.' })
  }
})

app.get('/tarefas', async (req, res) => {
  try {
    const tarefas = await Tarefa.find()
    return res.status(200).json(tarefas)
  }
  catch (e) {
    return res.status(400).send({ erro: 'Falha ao retornar lista de tarefas.' })
  }
})

app.use(() => {
  console.log('recebi');
})

app.listen(3000, () => {
  console.log('running on 3000')
})