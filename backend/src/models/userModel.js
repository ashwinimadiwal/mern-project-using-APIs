const { getPool } = require('./db');

async function findUserByEmail(email) {
  const [rows] = await getPool().query('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0];
}

async function findUserById(id) {
  const [rows] = await getPool().query('SELECT id, email, name, created_at FROM users WHERE id = ?', [id]);
  return rows[0];
}

async function createUser({ name, email, password }) {
  const [result] = await getPool().query(
    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
    [name, email, password]
  );
  return { id: result.insertId, name, email };
}

module.exports = { findUserByEmail, findUserById, createUser };
