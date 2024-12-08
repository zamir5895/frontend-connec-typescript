import React from 'react';
import clsx from 'clsx';

interface ButtonProps {
  variant?: 'ghost' | 'outlined' | 'solid';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  [key: string]: any;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'solid',
  size = 'md',
  children,
  className,
  onClick,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium focus:outline-none transition-colors duration-200';
  const variantClasses = {
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-700',
    outlined: 'border border-gray-300 text-gray-700 hover:bg-gray-100',
    solid: 'bg-blue-500 text-white hover:bg-blue-600',
  };
  const sizeClasses = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-4 py-2 text-md',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={clsx(baseClasses, variantClasses[variant], sizeClasses[size], className)}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;