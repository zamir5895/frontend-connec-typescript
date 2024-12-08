// src/components/ui/CustomButton.tsx
import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'outlined';
  size?: 'small' | 'medium' | 'large' | 'icon';
  children: ReactNode;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  children,
  className = '',
  ...props
}) => {
  const buttonClass = clsx(
    'inline-flex items-center justify-center font-medium rounded focus:outline-none focus:ring-2 focus:ring-offset-2 transition',
    {
      // Variants
      'bg-blue-600 text-white hover:bg-gray-400': variant === 'primary',
      'bg-transparent text-gray-700 hover:bg-gray-100': variant === 'ghost',
      'border border-gray-300 text-gray-700 hover:bg-gray-100': variant === 'outlined',

      // Sizes
      'w-8 h-8': size === 'icon',
      'px-2 py-1 text-sm': size === 'small',
      'px-4 py-2': size === 'medium',
      'px-6 py-3 text-lg': size === 'large',
    },
    className
  );

  return (
    <button className={buttonClass} {...props}>
      {children}
    </button>
  );
};

export default CustomButton;
