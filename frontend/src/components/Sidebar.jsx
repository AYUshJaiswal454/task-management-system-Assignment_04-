import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, CheckSquare, PlusCircle, LogOut, ShieldCheck, User as UserIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Sidebar = ({ isOpen, onClose }) => {
  const { user, isAdmin, logout } = useAuth();

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <div className="brand-logo">
          <div className="brand-icon-box">
            <CheckSquare size={20} />
          </div>
          <span>TaskFlow</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <span className="nav-section-title">Navigation</span>
        
        <NavLink
          to="/dashboard"
          onClick={onClose}
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
        >
          <LayoutDashboard size={18} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/tasks"
          onClick={onClose}
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
        >
          <CheckSquare size={18} />
          <span>All Tasks</span>
        </NavLink>

        {isAdmin && (
          <>
            <span className="nav-section-title">Admin Management</span>
            <NavLink
              to="/tasks/create"
              onClick={onClose}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              <PlusCircle size={18} />
              <span>Create Task</span>
            </NavLink>
          </>
        )}
      </nav>

      <div className="sidebar-footer">
        <div className="user-badge-card">
          <div className={`user-avatar ${isAdmin ? 'admin' : ''}`}>
            {isAdmin ? <ShieldCheck size={20} /> : <UserIcon size={20} />}
          </div>
          <div className="user-info">
            <div className="user-name" title={user?.name}>{user?.name || 'User'}</div>
            <span className={`user-role-tag ${isAdmin ? 'admin' : 'user'}`}>
              {user?.role || 'USER'}
            </span>
          </div>
          <button
            onClick={logout}
            className="btn btn-secondary btn-icon"
            title="Log Out"
            aria-label="Log Out"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
