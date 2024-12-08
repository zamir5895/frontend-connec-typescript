import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, MessageCircle, Search, LogOut, User, Plane } from 'lucide-react';
import Button from './Button';
import Input from './Input';
import { Avatar, AvatarFallback, AvatarImage } from './Avatar';
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from './DropdownMenu';
import { useAuth } from '../../Hooks/useAuth';

export default function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userImage, setUserImage] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('userData');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserImage(user.imageUrl || 'https://github.com/shadcn.png');
      setUserName(user.name || null);
    } else {
      setUserImage('https://github.com/shadcn.png');
      setUserName(null);
    }

    // Cierra el menú si se hace clic fuera de él
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Buscando:', searchQuery);
    }
  };

  const handleLogout = () => {
    console.log('Cerrando sesión');
    logout();
    navigate('/auth');
    setIsMenuOpen(false); // Cerrar el menú al hacer logout
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav className="bg-white border-b border-gray-300 fixed top-0 left-0 w-full z-10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
            <span className="text-xl font-bold text-gray-600">Living</span>
          </div>

          <div className="flex-1 flex items-center justify-center px-2 lg:ml-6 lg:justify-end">
            <form onSubmit={handleSearch} className="relative max-w-lg w-full lg:max-w-xs">
              <Input
                type="text"
                placeholder="Buscar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 border rounded-md"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
            </form>
          </div>

          <div className="flex items-center lg:ml-6 space-x-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notificaciones</span>
              <div className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></div>
            </Button>

            <Button variant="ghost" size="icon" className="relative">
              <MessageCircle className="h-5 w-5" />
              <span className="sr-only">Mensajes</span>
              <div className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></div>
            </Button>

            <div className="relative" ref={menuRef}>
              <Button variant="ghost" className="rounded-full" onClick={toggleMenu}>
                <Avatar>
                  <AvatarImage src={userImage || 'https://github.com/shadcn.png'} alt="Avatar" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </Button>
              {isMenuOpen && (
                <DropdownMenuContent align="end">
                  {userName && <DropdownMenuLabel>{userName}</DropdownMenuLabel>}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/perfil')}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Mi perfil</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/viajes')}>
                    <Plane className="mr-2 h-4 w-4" />
                    <span>Viajes</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Cerrar sesión</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
