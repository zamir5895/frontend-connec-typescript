import { useState } from 'react';
import Button from '../../Componentes/Messages/Utils/Button';
import { Users } from "lucide-react";
import Navbar from '../../Componentes/Navbar/Navbar';
import CreateGroupDialog from '../../Componentes/Messages/Group/CreateGroup';
import SearchUser from '../../Componentes/Messages/SearchUser/SearchUser';
import ChatsList from '../../Componentes/Messages/ChatsList/ChatsList';
import ChatContent from '../../Componentes/Messages/ChatContent/ChatContent';

export default function ChatPage() {
  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda
  const [selectedChat, setSelectedChat] = useState(null); // Estado para el chat seleccionado

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  const handleChatSelect = (chat: any) => {
    setSelectedChat(chat);
  };

  return (
    <div>
      <Navbar />
      <div className="sticky flex h-[84vh] w-[90vw] bg-gradient-to-br from-gray-100 to-white m-auto overflow-hidden">
        <div className="w-1/4 border-r border-gray-200">
          {/* Componente de búsqueda */}
          <SearchUser onSearchChange={handleSearchChange} />
          
          {/* Mostrar solo si no hay búsqueda activa */}
          {searchTerm.length === 0 && (
            <>
            <div className="fixed mt-20">
              <Button 
                className="justify-center w-full text-left px-4 py-2 ml-4 hover:bg-gray-100 bg-gray-600"
                onClick={() => setIsCreateGroupOpen(true)}
              >
                <Users className="w-5 h-6 inline-block mr-2" />
                Crear nuevo grupo
              </Button>
            </div>



              <ChatsList onChatSelect={handleChatSelect} /> {/* Pasar función de selección */}
            </>
          )}
        </div>

       {/* En ChatPage.jsx */}
        <div className="flex-1 flex-col">
          {selectedChat ? (
            <ChatContent chat={selectedChat} />
          ) : (
            <div className="flex items-center justify-center h-full bg-gradient-to-br from-gray-100 to-gray-300 text-gray-700">
              <div className="text-center">
                <p className="text-2xl font-bold mb-4">Conecta con tus amigos</p>
                <p className="text-base text-gray-600">Elige un chat de la lista para ver los mensajes</p>
              </div>
            </div>
          )}
        </div>


        {/* Componente para crear un grupo */}
        <div className='mt10'>
        <CreateGroupDialog
          open={isCreateGroupOpen}
          onOpenChange={setIsCreateGroupOpen}
        />
        </div>
      </div>
    </div>
  );
}
