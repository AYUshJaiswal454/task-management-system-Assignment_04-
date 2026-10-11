import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

export const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const getPageInfo = () => {
    const path = location.pathname;
    if (path === '/dashboard') {
      return { title: 'Dashboard', subtitle: 'Overview of project velocity and task progress' };
    }
    if (path === '/tasks') {
      return { title: 'Tasks', subtitle: 'Explore, filter, and manage team deliverables' };
    }
    if (path === '/tasks/create') {
      return { title: 'Create Task', subtitle: 'Assign new task to team members' };
    }
    if (path.startsWith('/tasks/edit')) {
      return { title: 'Edit Task', subtitle: 'Update task properties and assignments' };
    }
    if (path.startsWith('/tasks/')) {
      return { title: 'Task Details', subtitle: 'In-depth task specifications and status' };
    }
    return { title: 'TaskFlow', subtitle: 'Modern Task Management System' };
  };

  const { title, subtitle } = getPageInfo();

  return (
    <div className="app-container">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="main-wrapper">
        <Navbar
          title={title}
          subtitle={subtitle}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
