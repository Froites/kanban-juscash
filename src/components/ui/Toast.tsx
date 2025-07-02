import React, { useEffect, useState } from 'react';
import { clsx } from '@/utils/helpers';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type,
  onClose,
  duration = 3000,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); 
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const typeClasses = {
    success: 'bg-success-500 border-success-600 text-white',
    error: 'bg-danger-500 border-danger-600 text-white',
    info: 'bg-primary-500 border-primary-600 text-white',
  };

  const Icon = {
    success: CheckCircle,
    error: XCircle,
    info: Info,
  }[type];

  if (!isVisible) return null;

  return (
    <div
      className={clsx(
        "fixed bottom-4 left-1/2 -translate-x-1/2 p-4 rounded-lg shadow-lg flex items-center space-x-3 transition-all duration-300 ease-out",
        typeClasses[type],
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      )}
      role="alert"
    >
      <Icon className="w-5 h-5 flex-shrink-0" />
      <span className="text-sm font-medium">{message}</span>
      <button onClick={() => { setIsVisible(false); setTimeout(onClose, 300); }} className="ml-auto p-1 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};