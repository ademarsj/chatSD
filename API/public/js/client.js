
const api = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 3000,
});


const addButton = document.querySelector('.addButton');

addButton.addEventListener('click', (event) => {
  event.preventDefault();
  //Logica para criar uma tarefa
})


function loadTasks() {

api.get('/tarefas').then(response => {
  tasks = response.data;
  const pendingList = document.querySelector('#pendingList');
  
  for(task of tasks) {
    let element = createTaskHtml(task.descricao,task.completa);
    pendingList.appendChild(element);
  }
}).catch(error => console.log(error)) 

}


function createTaskHtml(text, checked) {
  let element = document.createElement('li');
  let span = document.createElement('span');
  let checkbox = document.createElement('input');
  checkbox.type = "checkbox";
  let div = document.createElement('div');
  let deleteButton = createDeleteButton();
  
  if (checked) {
    checkbox.value = true;
    span.classList.add('done');
  }
  span.innerHTML = text;
  element.appendChild(span);
  div.appendChild(checkbox);
  div.appendChild(deleteButton);
  element.appendChild(div);

  return element;
}


function createDeleteButton() {
  let button = document.createElement('button');
  let icon = document.createElement('i');
  icon.classList.add('fa','fa-trash');
  button.classList.add("btnDel");

  button.appendChild(icon);
  
  return button;
}

loadTasks();

// api.get(`/tarefas/1`).then(response =>{
//   console.log('Metodo api.get(`/tarefas/1`)')
//   console.log(response.data)
// }).catch(error => console.log(error.response.data))

// api.delete(`/tarefas/2`).then(response =>{
//   console.log('Metodo api.delete(`/tarefas/2`)')
//   console.log(response.data)
// }).catch(error => console.log(error.response.data))

// api.put(`/tarefas/3`,{
//   descricao: 'Teste Axios.Put',
//   prazo: '25/03/2022',
//   completa: false,
// }).then(response =>{
//   console.log('Metodo api.put(`/tarefas/5`)')
//   console.log(response.data)
// }).catch(error => console.log(error.response.data))

// api.post('/tarefas', {
//   id: 5,
//   descricao: 'Teste Axios.Post',
//   prazo: '23/03/2022',
//   completa: false,
// }).then(response =>{
//   console.log('Metodo api.post(`/tarefas`)')
//   console.log(response.data)
// }).catch(error => console.log(error.response.data))
