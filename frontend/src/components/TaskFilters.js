import React from 'react';

export default function TaskFilters({ filters, onChange, onReset }) {
  return (
    <div className="filters-panel">
      <div className="filter-group">
        <label>
          Search
          <input
            value={filters.search}
            onChange={(e) => onChange('search', e.target.value)}
            placeholder="Task title or description"
          />
        </label>
      </div>
      <div className="filter-group">
        <label>
          Status
          <select value={filters.status} onChange={(e) => onChange('status', e.target.value)}>
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </label>
      </div>
      <div className="filter-group">
        <label>
          Priority
          <select value={filters.priority} onChange={(e) => onChange('priority', e.target.value)}>
            <option value="">All</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>
      </div>
      <div className="filter-group">
        <label>
          Due date
          <input type="date" value={filters.dueDate} onChange={(e) => onChange('dueDate', e.target.value)} />
        </label>
      </div>
      <button className="btn" type="button" onClick={onReset}>Reset filters</button>
    </div>
  );
}
