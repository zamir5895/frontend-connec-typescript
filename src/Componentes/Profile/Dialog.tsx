import React from 'react';
import clsx from 'clsx';

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

interface DialogContentProps {
  className?: string;
  children: React.ReactNode;
}

interface DialogHeaderProps {
  children: React.ReactNode;
}

interface DialogTitleProps {
  children: React.ReactNode;
}

interface DialogDescriptionProps {
  children: React.ReactNode;
}

interface DialogFooterProps {
  className?: string;
  children: React.ReactNode;
}

export const Dialog: React.FC<DialogProps> = ({ open, onOpenChange, children }) => {
  return (
    <div className={clsx("fixed inset-0 z-50 flex items-center justify-center", { hidden: !open })}>
      <div className="fixed inset-0 bg-black opacity-50" onClick={() => onOpenChange(false)}></div>
      <div className="relative bg-white rounded-lg shadow-lg">{children}</div>
    </div>
  );
};

export const DialogContent: React.FC<DialogContentProps> = ({ className, children }) => {
  return <div className={clsx("p-6", className)}>{children}</div>;
};

export const DialogHeader: React.FC<DialogHeaderProps> = ({ children }) => {
  return <div className="mb-4">{children}</div>;
};

export const DialogTitle: React.FC<DialogTitleProps> = ({ children }) => {
  return <h2 className="text-lg font-semibold">{children}</h2>;
};

export const DialogDescription: React.FC<DialogDescriptionProps> = ({ children }) => {
  return <p className="text-sm text-gray-500">{children}</p>;
};

export const DialogFooter: React.FC<DialogFooterProps> = ({ className, children }) => {
  return <div className={clsx("mt-4 flex justify-end space-x-2", className)}>{children}</div>;
};