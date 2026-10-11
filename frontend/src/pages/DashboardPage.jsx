import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTasks } from '../hooks/useTasks';
import TaskTable from '../components/TaskTable';
import ConfirmModal from '../components/ConfirmModal';
import taskService from '../services/taskService';
import { CheckCircle2, Clock, CircleDashed, AlertTriangle, ArrowRight, GitPullRequest } from 'lucide-react';

export const DashboardPage = () => {
  const { user, isAdmin } = useAuth();
  const { tasks, loading, error, refreshTasks } = useTasks();

  const [deleteModal, setDeleteModal] = useState({ isOpen: false, taskId: null });

  const totalTasks = tasks.length;
  const inProgressCount = tasks.filter((t) => t.status === 'IN_PROGRESS').length;
  const completedCount = tasks.filter((t) => t.status === 'COMPLETED').length;
  const highPriorityCount = tasks.filter((t) => t.priority === 'HIGH').length;

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await taskService.updateStatus(taskId, newStatus);
      refreshTasks();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update status');
    }
  };

  const handleDeletePrompt = (taskId) => {
    setDeleteModal({ isOpen: true, taskId });
  };

  const handleConfirmDelete = async () => {
    if (!deleteModal.taskId) return;
    try {
      await taskService.deleteTask(deleteModal.taskId);
      setDeleteModal({ isOpen: false, taskId: null });
      refreshTasks();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete task');
    }
  };

  const recentTasks = tasks.slice(0, 5);

  return (
    <div className="page-container">
      {/* Contributor Notice Banner */}
      <div className="issue-banner">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <GitPullRequest size={18} />
          <span>
            <strong>Assignment 4 Open Issues:</strong> Exactly 6 features are documented for contributors to solve. Check GitHub Issues or <code>issues/</code> directory!
          </span>
        </div>
        <Link to="/tasks" style={{ textDecoration: 'underline', fontWeight: 600 }}>
          View Tasks
        </Link>
      </div>

      {/* Overview Metrics Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-info">
            <span className="stat-label">Total Permitted Tasks</span>
            <span className="stat-value">{totalTasks}</span>
          </div>
          <div className="stat-icon blue">
            <CircleDashed size={24} />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <span className="stat-label">In Progress</span>
            <span className="stat-value">{inProgressCount}</span>
          </div>
          <div className="stat-icon yellow">
            <Clock size={24} />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <span className="stat-label">Completed</span>
            <span className="stat-value">{completedCount}</span>
          </div>
          <div className="stat-icon green">
            <CheckCircle2 size={24} />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <span className="stat-label">High Priority</span>
            <span className="stat-value">{highPriorityCount}</span>
          </div>
          <div className="stat-icon purple">
            <AlertTriangle size={24} />
          </div>
        </div>
      </div>

      {/* Recent Tasks Section */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Recent Tasks</h2>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
            {isAdmin ? 'Showing latest tasks across team' : `Tasks assigned to ${user?.name}`}
          </p>
        </div>
        <Link to="/tasks" className="btn btn-secondary btn-sm">
          <span>View All Tasks</span>
          <ArrowRight size={14} />
        </Link>
      </div>

      {loading ? (
        <p style={{ color: 'var(--text-muted)', padding: '2rem 0' }}>Loading dashboard tasks...</p>
      ) : error ? (
        <div style={{ color: 'var(--danger-text)', padding: '1rem', backgroundColor: 'var(--danger-bg)', borderRadius: '8px' }}>
          {error}
        </div>
      ) : recentTasks.length === 0 ? (
        <div className="table-container empty-state">
          <h3>No tasks found</h3>
          <p>Get started by creating a new task.</p>
          {isAdmin && (
            <Link to="/tasks/create" className="btn btn-primary btn-sm" style={{ marginTop: '1rem' }}>
              Create Task
            </Link>
          )}
        </div>
      ) : (
        <TaskTable
          tasks={recentTasks}
          onStatusChange={handleStatusChange}
          onDeleteTask={handleDeletePrompt}
        />
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModal.isOpen}
        title="Delete Task"
        message="Are you sure you want to delete this task? This action cannot be undone."
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteModal({ isOpen: false, taskId: null })}
      />
    </div>
  );
};

export default DashboardPage;
