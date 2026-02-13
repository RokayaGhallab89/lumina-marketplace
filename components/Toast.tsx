import React, { useEffect } from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  isVisible: boolean;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const bgColors = {
    success: 'bg-gray-800 text-white',
    error: 'bg-red-600 text-white',
    info: 'bg-blue-600 text-white'
  };

  const icons = {
    success: 'fa-circle-check',
    error: 'fa-circle-exclamation',
    info: 'fa-circle-info'
  };

  return (
    <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-[100] animate-fade-in-down">
      <div className={`${bgColors[type]} px-6 py-3 rounded-full shadow-lg flex items-center gap-3 min-w-[300px] justify-center`}>
        <i className={`fa-solid ${icons[type]}`}></i>
        <span className="font-medium text-sm">{message}</span>
      </div>
    </div>
  );
};

export default Toast;