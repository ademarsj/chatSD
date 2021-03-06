
const api = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 3000,
});

const addButton = document.querySelector('.addButton');
const btnSearch = document.querySelector('.btnSearch');
const dateInput = document.querySelector('#date');
const descriptionInput = document.querySelector('#description');
const radioButtons = document.querySelectorAll('input[name="status"]');

appendAddEvent(addButton);
appendReadEvent(btnSearch);
loadTasks();

async function loadTasks() {
  const taskList = document.querySelector('#taskList');
  const tasks = await readTask();

  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  for (let item of tasks) {
    let element = getTaskHtml(item);
    taskList.appendChild(element);
  }
}

////////////////////////// HTML COMPONENTS /////////////////////////////


function getTaskHtml(task) {
  let div = document.createElement('div');
  div.task = task;
  let element = document.createElement('li');
  let spanID = document.createElement('span');
  spanID.innerHTML = `(${task.id})`;
  let span = document.createElement('span');
  span.innerHTML = task.descricao;
  let spanDate = document.createElement('span');
  spanDate.innerHTML = new Date(task.prazo).toLocaleDateString('pt-BR');
  let checkbox = document.createElement('input');
  checkbox.type = "checkbox";
  let deleteButton = createDeleteButton();
  let editButton = createEditButton();

  appendCheckBoxEvent(checkbox);

  if (task.completa) {
    checkbox.checked = true;
    span.classList.add('done');
  }

  element.appendChild(spanID);
  element.appendChild(span);
  element.appendChild(spanDate);
  div.appendChild(checkbox);
  div.appendChild(editButton);
  div.appendChild(deleteButton);
  element.appendChild(div);

  return element;
}

function createDeleteButton() {
  let button = document.createElement('button');
  let icon = document.createElement('i');

  icon.classList.add('fa', 'fa-trash');
  button.classList.add("btnDel");
  button.appendChild(icon);
  appendDeleteEvent(button);

  return button;
}

function createEditButton() {
  let button = document.createElement('button');
  let icon = document.createElement('i');

  icon.classList.add('fa', 'fa-edit');
  button.classList.add("btnEdit");
  button.appendChild(icon);
  appendEditEvent(button);

  return button;
}

////////////////////////// Events //////////////////////////////////

function appendAddEvent(component) {
  component.addEventListener('click', async (event) => {
    event.preventDefault();

    if (!descriptionInput.value) {
      alert('Preencha uma descri????o.')
      return;
    }

    if (!dateInput.value) {
      alert('Preencha uma data de prazo.')
      return;
    }

    let isDone = radioButtons[1].checked;

    if (addButton.classList.contains('edit')) {
      addButton.classList.remove('edit');
      addButton.innerHTML = 'Adicionar Tarefa';
      const updateTaskResponse = await updateTask(addButton.id, descriptionInput.value, dateInput.value, isDone);
      if (updateTaskResponse == 'Falha ao atualizar tarefa. Data inv??lida!') {
        alert('Preencha uma data v??lida.')
      }
      addButton.id = null;
    } else {
      const createTaskResponse = await createTask(descriptionInput.value, dateInput.value, isDone);
      if (createTaskResponse == 'Falha ao registrar tarefa. Data inv??lida!') {
        alert('Preencha uma data v??lida.')
      }
    }

    await loadTasks();
  })
}

function appendDeleteEvent(component) {
  component.addEventListener('click', async (e) => {
    e.preventDefault();
    await deleteTask(e.target.parentElement.parentElement.task.id);
    await loadTasks();
  });
}

function appendCheckBoxEvent(component) {
  component.addEventListener('click', async (e) => {
    let task = e.target.parentElement.task;
    await updateTask(task.id, task.descricao, task.prazo, e.target.checked);
    await loadTasks();
  });
}

function appendEditEvent(component) {
  component.addEventListener('click', async (e) => {
    let task = e.target.parentElement.parentElement.task;
    dateInput.value = formatDate(new Date(task.prazo));
    descriptionInput.value = task.descricao;
    radioButtons[task.completa ? 1 : 0].checked = true;

    addButton.id = task.id;
    addButton.innerHTML = 'Salvar Altera????es (' + task.id + ')';
    addButton.classList.add('edit');

    await loadTasks();
  });
}

function appendReadEvent(component) {
  component.addEventListener('click', async (e) => {

    const inputSearch = document.querySelector('#idSearch');
    const readSpan = document.querySelector('#readDescription');
    const readDate = document.querySelector('#readDate');
    const readChecked = document.querySelector('#readChecked');

    readSpan.innerHTML = '';
    readDate.innerHTML = '';
    readChecked.innerHTML = '';

    if (!inputSearch.value) {
      alert('Digite um ID v??lido.')
      return;
    }

    const taskResponse = await readTask(inputSearch.value);
    if (taskResponse == 'Falha ao encontrar tarefa.') {
      readSpan.innerHTML = 'Tarefa n??o encontrada';
    } else {
      readSpan.innerHTML = taskResponse.descricao;
      readDate.innerHTML = new Date(taskResponse.prazo).toDateString();
      readChecked.innerHTML = taskResponse.completa ? 'Completa' : 'Pendente';
    }


  });
}


////////////////////////// UTILS /////////////////////////////////
function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

function formatDate(date) {
  return [
    date.getFullYear(),
    padTo2Digits(date.getMonth() + 1),
    padTo2Digits(date.getDate()),
  ].join('-');
}

/////////////////////// Request functions //////////////////////////


async function createTask(descricao, prazo, completa) {
  try {
    const newTask = await api.post('/tarefas', {
      descricao,
      prazo,
      completa,
    });
  } catch (err) {
    return err.response.data
  }
}

async function readTask(id) {
  let url = '/tarefas';
  if (id) {
    url += `/${id}`;
  }

  try {
    const tasks = await api.get(url);
    return tasks.data;
  } catch (err) {
    return err.response.data;
  }
}

async function updateTask(id, descricao, prazo, completa) {
  try {
    const newTask = await api.put(`/tarefas/${id}`, {
      descricao,
      prazo,
      completa,
    });
  } catch (err) {
    return err.response.data
  }
}

async function deleteTask(id) {
  try {
    await api.delete(`/tarefas/${id}`);
  } catch (err) {
    return err.response.data
  }
}
