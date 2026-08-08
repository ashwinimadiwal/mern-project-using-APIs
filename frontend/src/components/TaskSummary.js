import React from 'react';

export default function TaskSummary({ tasks }) {
  const counts = tasks.reduce(
    (acc, task) => {
      acc[task.status] = (acc[task.status] || 0) + 1;
      acc[task.priority] = (acc[task.priority] || 0) + 1;
      return acc;
    },
    { pending: 0, 'in-progress': 0, done: 0, low: 0, medium: 0, high: 0 }
  );

  return (
    <section className="task-summary">
      <div>
        <h4>Status</h4>
        <p>Pending: {counts.pending}</p>
        <p>In Progress: {counts['in-progress']}</p>
        <p>Done: {counts.done}</p>
      </div>
      <div>
        <h4>Priority</h4>
        <p>Low: {counts.low}</p>
        <p>Medium: {counts.medium}</p>
        <p>High: {counts.high}</p>
      </div>
      <div>
        <h4>Total</h4>
        <p>{tasks.length} tasks</p>
      </div>
    </section>
  );
}
