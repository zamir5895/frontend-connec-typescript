import React, { InputHTMLAttributes, ReactNode } from 'react';

interface CustomInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'prefix'> {
  prefix?: ReactNode; 
}

const CustomInput: React.FC<CustomInputProps> = ({ prefix, className = '', ...props }) => {
  return (
    <div className="flex items-center bg-white border border-gray-300 rounded-md overflow-hidden">
      {prefix && (
        <span className="flex items-center pl-3 text-gray-400">
          {prefix}
        </span>
      )}
      <input
        className={`flex-1 px-3 py-2 text-gray-700 focus:outline-none focus:ring focus:ring-blue-200 ${className}`}
        {...props}
      />
    </div>
  );
};

export default CustomInput;
