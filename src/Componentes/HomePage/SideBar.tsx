import React from 'react';
import { Home, Users, Bell, Bookmark, Settings, HelpCircle } from 'lucide-react';
import Button from '../../Componentes/Profile/Button';
import Separator from '../../Componentes/Profile/Separator';

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-white shadow-md p-4 md:block sticky top-0 h-screen">
      <nav className="space-y-2">
        <Button variant="ghost" className="w-full justify-start">
          <Home className="mr-2 h-5 w-5" />
          Inicio
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          <Users className="mr-2 h-5 w-5" />
          Amigos
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          <Bell className="mr-2 h-5 w-5" />
          Notificaciones
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          <Bookmark className="mr-2 h-5 w-5" />
          Guardados
        </Button>
        <Separator />
        <Button variant="ghost" className="w-full justify-start">
          <Settings className="mr-2 h-5 w-5" />
          Configuración
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          <HelpCircle className="mr-2 h-5 w-5" />
          Ayuda
        </Button>
      </nav>
    </aside>
  );
};

export default Sidebar;