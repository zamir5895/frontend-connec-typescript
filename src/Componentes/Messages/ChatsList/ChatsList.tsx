import React, { useEffect, useState } from 'react';
import ScrollArea from '../Utils/ScrollArea';
import ChatItem from './ChatItem';
import { findAllChatsOfUser } from '../../../Services/Chat/ChatService';

interface Chat {
  chatId: number;
  chatName: string;
  chatImage: string;
  ultimoMensaje: string;
  isgroup: boolean;
}

interface ChatsListProps {
  onChatSelect: (chat: Chat) => void;
}

const ChatsList: React.FC<ChatsListProps> = ({ onChatSelect }) => {
  const [chats, setChats] = useState<Chat[]>([]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const userChats = await findAllChatsOfUser(localStorage.getItem('authToken') || '');
        setChats(userChats);
      } catch (error) {
        console.error('Error al obtener los chats:', error);
      }
    };

    fetchChats();
  }, []);

  return (
  <div className="fixed flex flex-col h-full mt-32">
    <ScrollArea className="h-[calc(100vh-120px)]">
      {chats.length > 0 ? (
        chats.map((chat) => (
          <ChatItem
            key={chat.chatId}
            chat={chat}
            onClick={() => onChatSelect(chat)} // Llama a la función cuando se selecciona un chat
          />
        ))
      ) : (
        <p className="text-center text-gray-500">No tienes chats disponibles</p>
      )}
    </ScrollArea>
    </div>
  );
};

export default ChatsList;
