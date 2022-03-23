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
  try {
    const id = req.params.id;
    let { descricao, prazo, completa } = req.body
    if (descricao != null && prazo != null && completa != null) {
      const prazoSplit = prazo.split('/')
      prazo = prazoSplit[1] + '/' + prazoSplit[0] + '/' + prazoSplit[2]
      prazo = new Date(prazo).toISOString();

      const data = {
        descricao,
        prazo,
        completa
      }

      await Tarefa.findOneAndUpdate({ id: id }, data, { upsert: true, new: true }).then(res.status(201).send('Created'))
    }
  } catch (e) {
    return res.status(400).send('Falha ao atualizar tarefa.')
  }
})

app.post('/tarefas', async (req, res) => {
  try {
    let { id, descricao, prazo, completa } = req.body
    if (id != null && descricao != null && prazo != null && completa != null) {
      // Converte a data informada pelo usuario para formato aceito no Date() -  Inverte mes com dia para ser aceita
      const prazoSplit = prazo.split('/')
      prazo = prazoSplit[1] + '/' + prazoSplit[0] + '/' + prazoSplit[2]
      prazo = new Date(prazo).toISOString();

      const data = {
        id,
        descricao,
        prazo,
        completa
      }
      const tarefa = await Tarefa.create(data)
      return res.send(tarefa)
    }
    else {
      return res.status(400).send('Falha ao registrar tarefa. Falta coisa!')
    }
  } catch (e) {
    return res.status(400).send('Falha ao registrar tarefa.')
  }
})

app.get('/tarefas', async (req, res) => {
  try {
    const tarefas = await Tarefa.find()
    return res.status(200).json(tarefas)
  }
  catch (e) {
    return res.status(400).send('Falha ao retornar lista de tarefas.')
  }
})

app.use(() => {
  console.log('recebi');
})

app.listen(3000, () => {
  console.log('running on 3000')
})