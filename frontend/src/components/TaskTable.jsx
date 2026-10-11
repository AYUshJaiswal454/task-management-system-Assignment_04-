import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, Edit3, Trash2, Calendar, UserCheck } from 'lucide-react';
import { StatusBadge, PriorityBadge } from './Badge';
import { useAuth } from '../context/AuthContext';

export const TaskTable = ({ tasks, onStatusChange, onDeleteTask }) => {
  const { user, isAdmin } = useAuth();

  const formatDate = (dateStr) => {
    if (!dateStr) return 'No due date';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const canEditStatus = (task) => {
    if (isAdmin) return true;
    return task.assignedTo && task.assignedTo._id === user?.id;
  };

  return (
    <div className="table-container">
      <table className="task-table">
        <thead>
          <tr>
            <th>Task</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Assignee</th>
            <th>Due Date</th>
            <th style={{ textAlign: 'right' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => {
            const hasStatusPermission = canEditStatus(task);
            return (
              <tr key={task._id}>
                <td className="task-title-cell">
                  <Link to={`/tasks/${task._id}`}>{task.title}</Link>
                  {task.description && (
                    <div className="task-desc-excerpt">{task.description}</div>
                  )}
                </td>

                <td>
                  {hasStatusPermission ? (
                    <select
                      value={task.status}
                      onChange={(e) => onStatusChange(task._id, e.target.value)}
                      className="filter-select"
                      style={{ padding: '0.25rem 1.75rem 0.25rem 0.5rem', fontSize: '0.8rem' }}
                      title="Update status"
                    >
                      <option value="TODO">To Do</option>
                      <option value="IN_PROGRESS">In Progress</option>
                      <option value="COMPLETED">Completed</option>
                    </select>
                  ) : (
                    <StatusBadge status={task.status} />
                  )}
                </td>

                <td>
                  <PriorityBadge priority={task.priority} />
                </td>

                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8125rem' }}>
                    <UserCheck size={14} style={{ color: 'var(--text-subtle)' }} />
                    <span style={{ fontWeight: task.assignedTo ? '600' : '400', color: task.assignedTo ? 'var(--text-main)' : 'var(--text-subtle)' }}>
                      {task.assignedTo?.name || 'Unassigned'}
                    </span>
                  </div>
                </td>

                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                    <Calendar size={14} />
                    <span>{formatDate(task.dueDate)}</span>
                  </div>
                </td>

                <td>
                  <div className="table-actions" style={{ justifyContent: 'flex-end' }}>
                    <Link
                      to={`/tasks/${task._id}`}
                      className="btn btn-secondary btn-sm btn-icon"
                      title="View Task Details"
                    >
                      <Eye size={15} />
                    </Link>

                    {isAdmin && (
                      <>
                        <Link
                          to={`/tasks/edit/${task._id}`}
                          className="btn btn-secondary btn-sm btn-icon"
                          title="Edit Task"
                        >
                          <Edit3 size={15} />
                        </Link>
                        <button
                          onClick={() => onDeleteTask(task._id)}
                          className="btn btn-secondary btn-sm btn-icon"
                          style={{ color: 'var(--danger-text)' }}
                          title="Delete Task"
                        >
                          <Trash2 size={15} />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;
