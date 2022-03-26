const { Router } = require('express');

const router = Router();


const Tarefa = require('./model/tarefas')

router.get('/tarefas', async (req, res) => {
  try {
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
    let {descricao, prazo, completa } = req.body
    if (descricao != null && prazo != null) {
      prazo = new Date(prazo).toISOString();
    
      await Tarefa.findOne().sort('-id')
      .exec(async function(err, item) {
        let id = Number(item?.id || 0) + 1;
        const data = {
          id,
          descricao,
          prazo,
          completa
        }
        const tarefa = await Tarefa.create(data);
        res.send(tarefa)
      });

      return;
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
    let { descricao, prazo, completa } = req.body;
    if (descricao != null && prazo != null && completa != null) {
      prazo = new Date(prazo).toISOString();

      const data = {
        descricao,
        prazo,
        completa
      }

      await Tarefa.findOneAndUpdate({ id: id }, data)
        .then(res.sendStatus(200))
        .catch(e => {
          console.log(e);
        });
    }
  } catch (e) {
    console.log(e);
    return res.status(400).send('Falha ao atualizar tarefa.')
  }
})

router.delete('/tarefas/:id', async (req, res) => {
  const tarefa = await Tarefa.findOneAndRemove({ id: req.params.id  })
  if (tarefa) {
    return res.status(204).send('Tarefa excluida')
  }
  else {
    return res.status(400).send('Falha ao excluir tarefa.')
  }
})

module.exports = router;