// src/components/ui/Dialog.tsx
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import React from 'react';

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;

export const DialogContent: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className="fixed inset-0 bg-black bg-opacity-50 z-40" />
    <DialogPrimitive.Content
      className="fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                 bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
    >
      {children}
      <DialogPrimitive.Close asChild>
        <button
          aria-label="Close"
          className="absolute top-2 right-2 p-2 text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
);

export const DialogHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <header className="mb-4">{children}</header>
);

export const DialogTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <DialogPrimitive.Title className="text-xl font-semibold text-gray-800">
    {children}
  </DialogPrimitive.Title>
);
