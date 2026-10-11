import React from 'react';
import { Menu, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Navbar = ({ onToggleSidebar, title, subtitle }) => {
  const { isAdmin } = useAuth();

  return (
    <header className="top-navbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button
          className="mobile-menu-btn"
          onClick={onToggleSidebar}
          aria-label="Toggle navigation menu"
        >
          <Menu size={22} />
        </button>
        <div className="page-title-area">
          <h1 className="page-title">{title || 'Dashboard'}</h1>
          {subtitle && <p className="page-subtitle">{subtitle}</p>}
        </div>
      </div>

      <div className="navbar-actions">
        {isAdmin && (
          <Link to="/tasks/create" className="btn btn-primary btn-sm">
            <Plus size={16} />
            <span>New Task</span>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Navbar;
