import React from 'react';
import { AlertCircle } from 'lucide-react';
import { clsx } from '@/utils/helpers';

interface ErrorMessageProps {
  message: string;
  className?: string;
  variant?: 'inline' | 'card';
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ 
  message, 
  className,
  variant = 'inline' 
}) => {
  if (variant === 'card') {
    return (
      <div className={clsx('bg-danger-50 border border-danger-200 rounded-lg p-4', className)}>
        <div className="flex">
          <AlertCircle className="h-5 w-5 text-danger-400" />
          <div className="ml-3">
            <p className="text-sm text-danger-800">{message}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={clsx('flex items-center text-danger-600 text-sm', className)}>
      <AlertCircle className="w-4 h-4 mr-1 flex-shrink-0" />
      <span>{message}</span>
    </div>
  );
};