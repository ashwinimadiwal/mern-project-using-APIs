import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api, { setAuthToken } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import './TaskFormPage.css';

function TaskFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setAuthToken(token);
    if (id) {
      api.get(`/tasks/${id}`)
        .then((response) => {
          const task = response.data;
          setTitle(task.title);
          setDescription(task.description);
          setStatus(task.status);
          setPriority(task.priority);
          setDueDate(task.due_date || '');
        })
        .catch(() => {
          setError('Unable to load task.');
        });
    }
  }, [id, token]);

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    try {
      const payload = { title, description, status, priority, due_date: dueDate || null };
      if (id) {
        await api.put(`/tasks/${id}`, payload);
      } else {
        await api.post('/tasks', payload);
      }
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to save task.');
    }
  }

  return (
    <div className="page task-form-page">
      <form className="panel" onSubmit={handleSubmit}>
        <h2>{id ? 'Edit Task' : 'Create Task'}</h2>
        <label>
          Title
          <input value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>
        <label>
          Description
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <label>
          Status
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </label>
        <label>
          Priority
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>
        <label>
          Due Date
          <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        </label>
        {error && <p className="error">{error}</p>}
        <div className="actions">
          <button type="submit">Save</button>
          <button type="button" onClick={() => navigate('/')}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default TaskFormPage;
