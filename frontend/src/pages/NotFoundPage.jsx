import React from 'react';
import { Link } from 'react-router-dom';
import { FileQuestion, ArrowLeft } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div className="auth-page-container">
      <div className="auth-card" style={{ textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', padding: '1rem', background: 'var(--bg-subtle)', borderRadius: '50%', color: 'var(--text-muted)' }}>
          <FileQuestion size={48} />
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginTop: '1rem', color: 'var(--text-main)' }}>404</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
          The page you are looking for does not exist or has been moved.
        </p>
        <Link to="/dashboard" className="btn btn-primary" style={{ display: 'inline-flex', margin: '0 auto' }}>
          <ArrowLeft size={16} />
          <span>Back to Dashboard</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
