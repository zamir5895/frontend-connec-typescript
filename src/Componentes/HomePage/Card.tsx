import React, { forwardRef } from 'react';
import clsx from 'clsx';

interface CardProps {
  key?: string | number;
  className?: string;
  children: React.ReactNode;
  [key: string]: any; // To accept any other props like ref
}

const Card = forwardRef<HTMLDivElement, CardProps>(({ key, className, children, ...props }, ref) => {
  return (
    <div key={key} className={clsx('bg-white shadow-sm rounded-lg p-4', className)} ref={ref} {...props}>
      {children}
    </div>
  );
});

Card.displayName = 'Card';

export default Card;