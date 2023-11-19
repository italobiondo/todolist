const connection = require('./connection');

//Retorna as tasks do banco de dados
const getAll = async () => {
  const [tasks] = await connection.execute('SELECT * FROM tasks');
  return tasks;
};

//Insere uma nova task no banco de dados
const createTask = async (task) => {
  const { title } = task;

  const dateUTC = new Date(Date.now()).toUTCString();

  const query = 'INSERT INTO tasks (title, status, created_at) VALUES (?,?,?)';

  const [createdTask] = await connection.execute(query, [title,'pendente', dateUTC]);

  return {insertId: createdTask.insertId};
};

//Deleta uma task no banco de dados
const deleteTask = async (id) => {
  const query = 'DELETE FROM tasks WHERE id = ?';
  const removedTask = await connection.execute(query, [id]);
  return removedTask;
};



module.exports = {
  getAll,
  createTask,
  deleteTask
};