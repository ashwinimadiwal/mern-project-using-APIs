import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import './TaskFormPage.css';

function TaskDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [task, setTask] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) return;
    api.get(`/tasks/${id}`)
      .then((response) => setTask(response.data))
      .catch(() => setError('Unable to load task details.'));
  }, [id, token]);

  if (error) {
    return (
      <div className="page task-form-page">
        <div className="panel">
          <p className="error">{error}</p>
          <button className="btn" onClick={() => navigate(-1)}>Go Back</button>
        </div>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="page task-form-page">
        <div className="panel">
          <p>Loading task...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page task-form-page">
      <div className="panel">
        <h2>{task.title}</h2>
        <p>{task.description}</p>
        <div className="meta" style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '1rem', color: '#94a3b8' }}>
          <span>Status: {task.status}</span>
          <span>Priority: {task.priority}</span>
          <span>Due: {task.due_date || 'Not set'}</span>
          <span>Created: {new Date(task.created_at).toLocaleDateString()}</span>
        </div>
        <div className="actions" style={{ marginTop: '1.5rem' }}>
          <Link className="btn" to="/">Back</Link>
          <Link className="btn primary" to={`/tasks/${task.id}/edit`}>Edit Task</Link>
        </div>
      </div>
    </div>
  );
}

export default TaskDetailsPage;
