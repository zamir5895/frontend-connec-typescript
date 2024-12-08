import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input: React.FC<InputProps> = ({ className, ...props }) => {
  return (
    <input
      className={`border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 ${className}`}
      {...props}
    />
  )
}

export default Input
