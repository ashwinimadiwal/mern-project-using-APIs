import React from 'react';
import { Link } from 'react-router-dom';

export default function TaskCard({ task, onDelete }) {
  return (
    <article className="task-card">
      <div className="task-card-header">
        <h3>{task.title}</h3>
        <span className={`status-chip status-${task.status}`}>{task.status}</span>
      </div>
      <p>{task.description || 'No description provided.'}</p>
      <div className="meta">
        <span>{task.priority}</span>
        <span>{task.due_date ? `Due ${task.due_date}` : 'No due date'}</span>
      </div>
      <div className="actions">
        <Link className="btn small primary" to={`/tasks/${task.id}`}>Details</Link>
        <Link className="btn small" to={`/tasks/${task.id}/edit`}>Edit</Link>
        <button className="btn small danger" onClick={() => onDelete(task.id)}>Delete</button>
      </div>
    </article>
  );
}
