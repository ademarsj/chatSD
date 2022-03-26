
const api = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 3000,
});

const addButton = document.querySelector('.addButton');
const dateInput = document.querySelector('#date');
const descriptionInput = document.querySelector('#description');

appendAddEvent(addButton);

loadTasks();

async function loadTasks() {
  const pendingList = document.querySelector('#pendingList');
  const doneList = document.querySelector('#doneList');
  const tasks = await readTask();

  while (pendingList.firstChild) {
    pendingList.removeChild(pendingList.firstChild);
  }

  while (doneList.firstChild) {
    doneList.removeChild(doneList.firstChild);
  }

  for(let item of tasks) {
    let element = getTaskHtml(item);
    if (item.completa) {
      doneList.appendChild(element);
    } else {
      pendingList.appendChild(element);
    }
  }
}

////////////////////////// HTML COMPONENTS /////////////////////////////


function getTaskHtml(task) {
  let div = document.createElement('div');
  div.task = task;
  let element = document.createElement('li');
  let span = document.createElement('span');
  span.innerHTML = task.descricao;
  let checkbox = document.createElement('input');
  checkbox.type = "checkbox";
  let deleteButton = createDeleteButton();
  let editButton = createEditButton();

  appendCheckBoxEvent(checkbox);

  if (task.completa) {
    checkbox.checked = true;
    span.classList.add('done');
  }

  element.appendChild(span);
  div.appendChild(checkbox);
  div.appendChild(editButton);
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
  appendDeleteEvent(button);
  
  return button;
}

function createEditButton() {
  let button = document.createElement('button');
  let icon = document.createElement('i');

  icon.classList.add('fa','fa-edit');
  button.classList.add("btnEdit");
  button.appendChild(icon);
  // appendEditEvent(button);
  
  return button;
}

////////////////////////// Events //////////////////////////////////

function appendAddEvent(component) {
  component.addEventListener('click', async (event) => {
    event.preventDefault();
    
    if (!descriptionInput.value) {
      alert('Preencha uma descrição.')
      return;
    }
  
    if(!dateInput.value) {
      alert('Preencha uma data de prazo.')
      return;
    }
  
    await createTask(descriptionInput.value,dateInput.value,false)
    await loadTasks();
  })
}

function appendDeleteEvent(component) {
  component.addEventListener('click', async (e) => {
    e.preventDefault();
    
    await deleteTask(e.target.parentElement.id);
    await loadTasks();
  });
}

function appendCheckBoxEvent(component) {
  component.addEventListener('click', async (e) => {
    let task = e.target.parentElement.task;
    await updateTask(task.id,task.descricao,task.prazo,e.target.checked)
    await loadTasks();
  });  
}


/////////////////////// Request functions //////////////////////////


async function createTask(descricao,prazo,completa) {
  try {
    const newTask = await api.post('/tarefas', {
      descricao,
      prazo,
      completa,
    });
  } catch (err) {
    console.log('Error creating task', error.response.data);
  }
}

async function readTask(id) {
  let url = '/tarefas';
  if(id) {
    url += `/${id}`;
  }

  try {
    const tasks = await api.get(url);
    return tasks.data;
  } catch (err) {
    console.log('Error reading tasks', error.response.data);
  }
}

async function updateTask(id,descricao,prazo,completa) {
  try {
    const newTask = await api.put(`/tarefas/${id}`,{
      descricao,
      prazo,
      completa,
    });
  } catch (err) {
    console.log('Error updating task', error.response.data);
  }
}

async function deleteTask(id) {
  try {
    await api.delete(`/tarefas/${id}`);
  } catch (err) {
    console.log('Error updating task', error.response.data);
  }
}
