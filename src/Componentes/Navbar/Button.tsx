// Button.jsx
import React from 'react';

interface ButtonProps {
  variant?: 'ghost' | 'default';
  size?: 'icon' | 'default';
  className?: string;
  onClick?: () => void;
  onMouseLeave?: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ variant = 'default', size = 'default', className, onClick, onMouseLeave, children }) => {
  return (
    <button
      onClick={onClick}
      onMouseLeave={onMouseLeave}
      className={`focus:outline-none ${variant === 'ghost' ? 'bg-transparent' : 'bg-blue-500 text-white'} 
        ${size === 'icon' ? 'p-2' : 'px-4 py-2'} rounded-full ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
