const tbody = document.querySelector('tbody');

const fetchTasks = async () => {
  const response = await fetch('http://localhost:3333/tasks');
  const tasks = await response.json();
  return tasks;
};

const createElements = (tag,innerText = '') => {
  const element = document.createElement(tag);
  element.innerText = innerText;
  return element;
};

const tasks = {
  id: 1,
  title: 'Criar um projeto',
  created_at: '2021-07-06T00:00:00.000Z',
  status: 'pendente'
};

const createRow = (task) => {

  const { id, title, created_at, status } = task;

  const tr = createElements('tr');
  const tdTitle = createElements('td', title);
  
};

createRow(tasks);