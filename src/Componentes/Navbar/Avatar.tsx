import React, { ReactNode } from 'react';

interface AvatarProps {
  children: ReactNode;
  size?: string; // Tamaño opcional, puedes usar w-10 h-10 como valor por defecto
  className?: string; // Añade className como opcional
}

export function Avatar({ children, size = 'w-10 h-10', className = '' }: AvatarProps) {
  return (
    <div className={`relative inline-flex items-center justify-center ${size} rounded-full overflow-hidden ${className}`}>
      {children}
    </div>
  );
}

interface AvatarImageProps {
  src: string;
  alt?: string; // alt es opcional para evitar errores si no se proporciona
  className?: string; // Añade className para AvatarImage
}

export function AvatarImage({ src, alt = 'Avatar', className = '' }: AvatarImageProps) {
  return <img src={src} alt={alt} className={`w-full h-full object-cover ${className}`} />;
}

interface AvatarFallbackProps {
  children: ReactNode;
  className?: string; // Añade className para AvatarFallback
}

export function AvatarFallback({ children, className = '' }: AvatarFallbackProps) {
  return (
    <div className={`bg-gray-500 text-white flex items-center justify-center w-full h-full ${className}`}>
      {children}
    </div>
  );
}
