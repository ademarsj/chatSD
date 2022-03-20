const axios = require('axios');

const api = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 3000,
});


api.get('/tarefas').then((data) => {
  console.log(data.data);
});

api.post('/tarefas', {
  descricao: 'teste de tarefa',
  prazo: new Date(),
  completa: false,
});

api.delete(`/${id}`).then((data) => {
  console.log(data.data);
});

api.get(`/${id}`, {
  descricao: 'teste de tarefa (ALTERADO)',
});