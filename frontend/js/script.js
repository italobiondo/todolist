const tbody = document.querySelector('tbody');
const addForm = document.querySelector('.add-form');
const inputTasks = document.querySelector('.input-task');

const fetchTasks = async () => {
  const response = await fetch('http://localhost:3333/tasks');
  const tasks = await response.json();
  return tasks;
};


const addTask = async (e) => {
  e.preventDefault();

  const task = {title: inputTasks.value};
  
  await fetch('http://localhost:3333/tasks', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(task)
  })

  loadTasks();

  inputTasks.value = '';
};

const deleteTask = async (id) => {
  await fetch(`http://localhost:3333/tasks/${id}`, {
    method: 'delete'
  });
  loadTasks();
};

const updateTask = async ({ id, title, status }) => {
  await fetch(`http://localhost:3333/tasks/${id}`, {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({title,status})
  });

  loadTasks();
};



const formatDate = (dateUTC) => {
  const options = {dateStyle: 'long', timeStyle: 'short'};
  const date = new Date(dateUTC).toLocaleString('pt-br',options);
  return date;
};

const createElements = (tag,innerText = '', innerHTML = '') => {
  const element = document.createElement(tag);

  if(innerText) {
    element.innerText = innerText;
  }
  if(innerHTML) {
    element.innerHTML = innerHTML;
  }
  
  return element;
};

const createSelect = (value) => {
  const options = `
    <option value="pendente">pendente</option>
    <option value="em andamento">em andamento</option>
    <option value="concluido">concluído</option>
  `;
  const select = createElements('select', '', options);
  select.value = value;
  return select;
};

const createRow = (task) => {

  const { id, title, created_at, status } = task;

  const tr = createElements('tr');
  const tdTitle = createElements('td', title);
  const tdCreatedAt = createElements('td', formatDate(created_at));
  const tdStatus = createElements('td');
  const tdActions = createElements('td');

  const select = createSelect(status);

  select.addEventListener('change', ({ target }) => updateTask({ ... task, status: target.value }));
  
  const editButton = createElements('button','','<span class="material-symbols-outlined">edit</span>');
  const deleteButton = createElements('button','','<span class="material-symbols-outlined">delete</span>');

  const editForm = createElements('form');
  const editInput = createElements('input');

  editInput.value = title;
  editForm.appendChild(editInput);

  editForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    updateTask({ id, title: editInput.value, status });
  });

  editButton.addEventListener('click', () => {
    tdTitle.innerText = '';
    tdTitle.appendChild(editForm);
  });

  editButton.classList.add('btn-action');
  deleteButton.classList.add('btn-action');

  deleteButton.addEventListener('click', () => deleteTask(id));

  tdStatus.appendChild(select);

  tdActions.appendChild(editButton);
  tdActions.appendChild(deleteButton);

  tr.appendChild(tdTitle);
  tr.appendChild(tdCreatedAt);
  tr.appendChild(tdStatus);
  tr.appendChild(tdActions);

  return tr;
};

const loadTasks = async () => {
  const tasks = await fetchTasks();

  tbody.innerHTML = '';

  tasks.forEach((task) => {
    const tr = createRow(task);
    tbody.appendChild(tr);
  });
};

addForm.addEventListener('submit', addTask);

loadTasks();