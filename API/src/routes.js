const { Router } = require('express');

const router = Router();


const Tarefa = require('./model/tarefas')

router.get('/tarefas', async (req, res) => {
  try {
    console.log('pega no pai')
    const tarefas = await Tarefa.find()
    return res.status(200).json(tarefas)
  }
  catch (e) {
    return res.status(400).send('Falha ao retornar lista de tarefas.')
  }
})

router.get('/tarefas/:id', async (req, res) => {
  const tarefa = await Tarefa.findOne({ id: req.params.id })
  if (tarefa) {
    return res.status(200).json(tarefa)
  }
  else {
    return res.status(400).send('Falha ao encontrar tarefa.')
  }

})

router.post('/tarefas', async (req, res) => {
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

router.put('/tarefas/:id', async (req, res) => {
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

router.delete('/tarefas/:id', async (req, res) => {
  const tarefa = await Tarefa.findOneAndRemove({ id: req.params.id })
  if (tarefa) {
    return res.status(204).send('Tarefa excluida')
  }
  else {
    return res.status(400).send('Falha ao excluir tarefa.')
  }
})

module.exports = router;