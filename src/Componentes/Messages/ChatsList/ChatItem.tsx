import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../../Navbar/Avatar';

interface ChatItemProps {
  chat: {
    chatId: number;
    chatName: string;
    chatImage: string;
    ultimoMensaje: string;
    isgroup: boolean;
  };
  onClick: () => void;
}

const ChatItem: React.FC<ChatItemProps> = ({ chat, onClick }) => {
  const { chatName, chatImage, ultimoMensaje, isgroup } = chat;
  const formattedDate = new Date(ultimoMensaje).toLocaleString('es-ES', {
    dateStyle: 'short',
    timeStyle: 'short',
  });

  return (
    <div className="flex items-center p-4 hover:bg-gray-100 cursor-pointer" onClick={onClick}>
      <Avatar className="w-12 h-12">
        <AvatarImage src={chatImage} alt={chatName} />
        <AvatarFallback>{chatName.charAt(0).toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="ml-4">
        <p className="font-semibold flex items-center">
          {chatName}
          {isgroup && <span className="ml-2 text-xs text-gray-500 bg-gray-200 rounded-full px-2 py-1">Grupo</span>}
        </p>
        <p className="text-xs text-gray-500">{formattedDate}</p>
      </div>
    </div>
  );
};

export default ChatItem;
