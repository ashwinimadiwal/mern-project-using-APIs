const { createTask, updateTask, deleteTask, getTaskById, findTasksByUser } = require('../models/taskModel');

async function create(req, res) {
  const { title, description, status, priority, due_date } = req.body;
  if (!title) {
    return res.status(400).json({ message: 'Task title is required.' });
  }

  const task = await createTask({
    user_id: req.user.id,
    title,
    description: description || '',
    status: status || 'pending',
    priority: priority || 'medium',
    due_date: due_date || null,
  });
  res.status(201).json(task);
}

async function list(req, res) {
  const tasks = await findTasksByUser(req.user.id, req.query);
  res.json(tasks);
}

async function getOne(req, res) {
  const task = await getTaskById(req.params.id, req.user.id);
  if (!task) {
    return res.status(404).json({ message: 'Task not found.' });
  }
  res.json(task);
}

async function update(req, res) {
  const fields = {};
  ['title', 'description', 'status', 'priority', 'due_date'].forEach((field) => {
    if (req.body[field] !== undefined) {
      fields[field] = req.body[field];
    }
  });

  if (Object.keys(fields).length === 0) {
    return res.status(400).json({ message: 'No task fields provided to update.' });
  }

  const updated = await updateTask(req.params.id, req.user.id, fields);
  if (!updated) {
    return res.status(404).json({ message: 'Task not found or not owned by user.' });
  }
  res.json({ message: 'Task updated successfully.' });
}

async function remove(req, res) {
  const deleted = await deleteTask(req.params.id, req.user.id);
  if (!deleted) {
    return res.status(404).json({ message: 'Task not found or not owned by user.' });
  }
  res.json({ message: 'Task deleted successfully.' });
}

module.exports = { create, list, getOne, update, remove };
