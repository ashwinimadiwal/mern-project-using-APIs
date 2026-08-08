const { getPool } = require('./db');

async function createTask(task) {
  const [result] = await getPool().query(
    `INSERT INTO tasks (user_id, title, description, status, priority, due_date)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [task.user_id, task.title, task.description, task.status, task.priority, task.due_date]
  );
  return { id: result.insertId, ...task };
}

async function updateTask(id, userId, fields) {
  const setClauses = [];
  const params = [];

  Object.entries(fields).forEach(([key, value]) => {
    setClauses.push(`${key} = ?`);
    params.push(value);
  });

  params.push(id, userId);
  const [rows] = await getPool().query(
    `UPDATE tasks SET ${setClauses.join(', ')} WHERE id = ? AND user_id = ?`,
    params
  );
  return rows.affectedRows > 0;
}

async function deleteTask(id, userId) {
  const [rows] = await getPool().query('DELETE FROM tasks WHERE id = ? AND user_id = ?', [id, userId]);
  return rows.affectedRows > 0;
}

async function getTaskById(id, userId) {
  const [rows] = await getPool().query('SELECT * FROM tasks WHERE id = ? AND user_id = ?', [id, userId]);
  return rows[0];
}

async function findTasksByUser(userId, query = {}) {
  let sql = 'SELECT * FROM tasks WHERE user_id = ?';
  const params = [userId];

  if (query.search) {
    sql += ' AND (title LIKE ? OR description LIKE ?)';
    params.push(`%${query.search}%`, `%${query.search}%`);
  }

  if (query.status) {
    sql += ' AND status = ?';
    params.push(query.status);
  }

  if (query.priority) {
    sql += ' AND priority = ?';
    params.push(query.priority);
  }

  if (query.dueDate) {
    sql += ' AND due_date = ?';
    params.push(query.dueDate);
  }

  const limit = Number(query.limit) || 20;
  const page = Number(query.page) || 1;
  const offset = (page - 1) * limit;
  sql += ' ORDER BY updated_at DESC LIMIT ? OFFSET ?';
  params.push(limit, offset);

  const [rows] = await getPool().query(sql, params);
  return rows;
}

module.exports = { createTask, updateTask, deleteTask, getTaskById, findTasksByUser };
