import React from 'react';
import { Clock, CheckCircle2, CircleDashed, AlertCircle, ArrowUp, ArrowDown, Minus } from 'lucide-react';

export const StatusBadge = ({ status }) => {
  const getBadgeConfig = () => {
    switch (status) {
      case 'TODO':
        return {
          label: 'To Do',
          className: 'badge-todo',
          icon: <CircleDashed size={13} />,
        };
      case 'IN_PROGRESS':
        return {
          label: 'In Progress',
          className: 'badge-in_progress',
          icon: <Clock size={13} />,
        };
      case 'COMPLETED':
        return {
          label: 'Completed',
          className: 'badge-completed',
          icon: <CheckCircle2 size={13} />,
        };
      default:
        return {
          label: status,
          className: 'badge-todo',
          icon: <CircleDashed size={13} />,
        };
    }
  };

  const { label, className, icon } = getBadgeConfig();

  return (
    <span className={`badge ${className}`}>
      {icon}
      <span>{label}</span>
    </span>
  );
};

export const PriorityBadge = ({ priority }) => {
  const getBadgeConfig = () => {
    switch (priority) {
      case 'HIGH':
        return {
          label: 'High',
          className: 'badge-high',
          icon: <ArrowUp size={13} />,
        };
      case 'MEDIUM':
        return {
          label: 'Medium',
          className: 'badge-medium',
          icon: <Minus size={13} />,
        };
      case 'LOW':
        return {
          label: 'Low',
          className: 'badge-low',
          icon: <ArrowDown size={13} />,
        };
      default:
        return {
          label: priority,
          className: 'badge-low',
          icon: <Minus size={13} />,
        };
    }
  };

  const { label, className, icon } = getBadgeConfig();

  return (
    <span className={`badge ${className}`}>
      {icon}
      <span>{label}</span>
    </span>
  );
};

export default { StatusBadge, PriorityBadge };
