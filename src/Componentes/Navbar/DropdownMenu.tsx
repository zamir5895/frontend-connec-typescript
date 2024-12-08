import React, { useState } from 'react'

export function DropdownMenu({ children }: { children: React.ReactNode }) {
  return <div className="relative">{children}</div>
}

export function DropdownMenuTrigger({ children, asChild }: { children: React.ReactNode, asChild?: boolean }) {
  return asChild ? children : <button>{children}</button>
}

export function DropdownMenuContent({ align, onMouseLeave, children }: { align?: 'center' | 'end', onMouseLeave?: () => void, children: React.ReactNode }) {
  align = align || 'center';
    return (
      <div
        onMouseLeave={onMouseLeave}
        className={`absolute ${align === 'end' ? 'right-0' : 'left-0'} mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5`}
      >
        <div className="py-1">{children}</div>
      </div>
    );
  };

export function DropdownMenuLabel({ children }: { children: React.ReactNode }) {
  return <div className="px-4 py-2 text-gray-700 font-semibold">{children}</div>
}

export function DropdownMenuSeparator() {
  return <div className="border-t border-gray-200 my-1" />
}

export function DropdownMenuItem({ children, onClick }: { children: React.ReactNode, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center"
    >
      {children}
    </button>
  )
}
