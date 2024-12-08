import React, { useEffect, useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '../../Navbar/Avatar';
import { Video, Phone, MoreVertical } from 'lucide-react';
import Button from '../Utils/Button';
import { getChatMembers } from '../../../Services/Chat/ChatService';

interface HeaderProps {
  chatId: number;
  chatName: string;
  chatImage: string;
  onToggleInfo: () => void;
}

const Header: React.FC<HeaderProps> = ({ chatId, chatName, chatImage, onToggleInfo }) => {
  const [members, setMembers] = useState<any[]>([]);

  useEffect(() => {
    getChatMembers(chatId, localStorage.getItem('authToken') || '')
      .then((members) => {
        console.log('Miembros del chat:', members);
        setMembers(members);
      })
      .catch((error) => console.error('Error al obtener los miembros del chat:', error));
  }, [chatId]);

  return (
    <div className="sticky top-0 z-10 flex items-center justify-between p-6 bg-gray-50 border-b border-gray-200 h-20">
      <div className="flex items-center">
        <Avatar className="w-12 h-12">
          <AvatarImage src={chatImage} alt={chatName} />
          <AvatarFallback>{chatName.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="ml-4">
          <p className="font-semibold text-lg">{chatName}</p>
          {members.length > 1 ? (
            <p className="text-sm text-gray-500">
              Participantes: {members.map((member) => member.userFullName || 'Usuario desconocido').join(', ')}
            </p>
          ) : (
            <p className="text-sm text-gray-500">Un participante</p>
          )}
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <Button variant="outlined" size="small"><Video className="w-6 h-6" /></Button>
        <Button variant="outlined" size="small"><Phone className="w-6 h-6" /></Button>
        <Button variant="outlined" size="small" onClick={onToggleInfo}><MoreVertical className="w-6 h-6" /></Button>
      </div>
    </div>
  );
};

export default Header;