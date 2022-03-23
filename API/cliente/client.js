const axios = require('axios');

const api = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 3000,
});

api.get(`/tarefas/1`).then(response =>{
  console.log('Metodo api.get(`/tarefas/1`)')
  console.log(response.data)
}).catch(error => console.log(error.response.data))

api.delete(`/tarefas/2`).then(response =>{
  console.log('Metodo api.delete(`/tarefas/2`)')
  console.log(response.data)
}).catch(error => console.log(error.response.data))

api.put(`/tarefas/3`,{
  descricao: 'Teste Axios.Put',
  prazo: '25/03/2022',
  completa: false,
}).then(response =>{
  console.log('Metodo api.put(`/tarefas/5`)')
  console.log(response.data)
}).catch(error => console.log(error.response.data))

api.post('/tarefas', {
  id: 5,
  descricao: 'Teste Axios.Post',
  prazo: '23/03/2022',
  completa: false,
}).then(response =>{
  console.log('Metodo api.post(`/tarefas`)')
  console.log(response.data)
}).catch(error => console.log(error.response.data))

api.get('/tarefas').then(response => {
  console.log('Metodo api.get(`/tarefas`)')
  console.log(response.data)
}).catch(error => console.log(error)) 
