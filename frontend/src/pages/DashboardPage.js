import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api, { setAuthToken } from '../services/api';
import TaskCard from '../components/TaskCard';
import TaskFilters from '../components/TaskFilters';
import TaskSummary from '../components/TaskSummary';
import './DashboardPage.css';

function DashboardPage() {
  const { user, logout, token } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({ search: '', status: '', priority: '', dueDate: '' });
  const [page, setPage] = useState(1);

  useEffect(() => {
    setAuthToken(token);
    fetchTasks();
  }, [token, page, filters]);

  async function fetchTasks() {
    const query = new URLSearchParams({
      page,
      limit: 10,
      search: filters.search,
      status: filters.status,
      priority: filters.priority,
      dueDate: filters.dueDate,
    });
    const response = await api.get(`/tasks?${query.toString()}`);
    setTasks(response.data);
  }

  async function handleDelete(id) {
    await api.delete(`/tasks/${id}`);
    fetchTasks();
  }

  function handleLogout() {
    logout();
    setAuthToken(null);
    window.location.href = '/login';
  }

  function updateFilter(key, value) {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  }

  function resetFilters() {
    setFilters({ search: '', status: '', priority: '', dueDate: '' });
    setPage(1);
  }

  return (
    <div className="page dashboard-page">
      <header className="header">
        <div>
          <h1>Tasks</h1>
          <p>Welcome back, {user?.name}</p>
        </div>
        <button className="btn" onClick={handleLogout}>Logout</button>
      </header>

      <TaskFilters filters={filters} onChange={updateFilter} onReset={resetFilters} />
      <TaskSummary tasks={tasks} />

      <section className="toolbar">
        <Link className="btn primary" to="/create">Create Task</Link>
      </section>

      <section className="task-grid">
        {tasks.length === 0 && <p className="empty-state">No tasks match your filters.</p>}
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onDelete={handleDelete} />
        ))}
      </section>

      <footer className="pagination">
        <button disabled={page <= 1} onClick={() => setPage((prev) => Math.max(prev - 1, 1))}>Previous</button>
        <span>Page {page}</span>
        <button onClick={() => setPage((prev) => prev + 1)}>Next</button>
      </footer>
    </div>
  );
}

export default DashboardPage;
