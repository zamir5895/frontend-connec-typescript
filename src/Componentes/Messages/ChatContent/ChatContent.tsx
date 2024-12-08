import React, { useState, useEffect } from 'react';
import ScrollArea from '../Utils/ScrollArea';
import Input from '../Utils/Input';
import { Smile, Paperclip, Mic, Send, User } from 'lucide-react';
import Button from '../Utils/Button';
import Header from './Header';
import InfoChat from './InfoChat';
import { useAuth } from '../../../Hooks/useAuth';
import { sendMessage, getAllMessages } from '../../../Services/Mensajes/Mensajes';
import ScrollMessages from './ScrollMessages';
import io, { Socket } from 'socket.io-client';
import { getChatMembers } from '../../../Services/Chat/ChatService';

let socket: Socket;



interface ChatContentProps {
  chat: {
    chatId: number;
    chatName: string;
    chatImage: string;
  };
}

interface Message {
  mensajeId: string;
  contenido: string;
  fecha: string;
  userId: number;
  fullName: string;
  leido: boolean;
  likeCount: number;
  fechaMensaje: string;
  multimediaUrl: multimediaMensaje[];
}

interface multimediaMensaje {
  mensajeId: number;
  url: string;
}

interface NewMessage {
  content: string;
  chatId: number;
  userId: number;
  fullName: string;
  userFoto: string;
}

interface User {
  userId: number;
  fullName: string;
  fotoPerfil: string;
}

interface chatUsers {
  users: User[];
}

interface socketMessage {
  chat:{
    chatId: number;
    chatName: string;
    chatImage: string;
    sender: User;
  }
  content: string;
  fechaMensaje: string;
  messageId: string;
  status: string;
  likesCount: number;
  multimedia: multimediaMensaje[];
  users: User[];
}

const ENDPOINT = "http://localhost:2500";


const ChatContent: React.FC<ChatContentProps> = ({ chat }) => {
  const [infoChatOpen, setInfoChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const [socketConnected, setSocketConnected] = useState(false);
  const [chatUsers, setChatUsers] = useState<chatUsers>({  users: [] });
  
  
  const [newMessage, setNewMessage] = useState<NewMessage>({
    content: '',
    chatId: chat.chatId,
    userId: 0,
    fullName: '',
    userFoto: '',
  });

 

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connection", () => setSocketConnected(true));
  })

  
  const [socketMessage, setSocketMessage] = useState<socketMessage>({
    chat:{
      chatId: chat.chatId,
      chatName: '',
      chatImage: '',
      sender: {
        userId: 0,
        fullName: '',
        fotoPerfil: '',
      }
    },
    content: '',
    fechaMensaje: '',
    messageId: '',
    status: '',
    likesCount: 0,
    multimedia: [],
    users: [],
  });

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => console.log("Socket conectado"));

    socket.on("new message", (messageReceived: socketMessage) => {
      console.log('Mensaje recibido:', messageReceived);

      if (chat.chatId !== messageReceived.chat.chatId) return;

      const newMessage: Message = {
        mensajeId: messageReceived.messageId,
        contenido: messageReceived.content,
        fecha: new Date(messageReceived.fechaMensaje).toLocaleString(),
        userId: messageReceived.chat.sender.userId,
        fullName: messageReceived.chat.sender.fullName,
        leido: messageReceived.status === 'LEIDO',
        likeCount: messageReceived.likesCount,
        fechaMensaje: messageReceived.fechaMensaje,
        multimediaUrl: messageReceived.multimedia,
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off("new message");
      socket.disconnect();
    };
  }, [chat.chatId, user]);


  useEffect(() => {
    if (user) {
      setNewMessage((prevMessage) => ({
        ...prevMessage,
        userId: user.userId,
        fullName: user.fullName,
        userFoto: user.fotoPerfil,
        
      }));
    }
  }, [user, chat.chatId]);
  useEffect(() => {
    setLoading(true);
    handleGetMessages();
  }, [chat.chatId]);

  const handleGetMessages = async () => {
    if (!chat.chatId) return;

    try {
      const response = await getAllMessages(chat.chatId);

      if (response.status !== 200) {
        console.error('Error al obtener los mensajes:', response);
        return;
      }
      socket.emit("join chat", chat.chatId);
      const messagesData = response.data.map((msg: any) => ({
        mensajeId: msg.messageId,
        contenido: msg.content,
        fecha: new Date(msg.fechaMensaje).toLocaleString(),
        username: msg.sender.fullName || '',
        userId: msg.sender.userId,
        fullName: msg.sender.fullName || '',
        leido: msg.status === 'LEIDO',
        likeCount: msg.likesCount || 0,
        fechaMensaje: msg.fechaMensaje,
        multimediaUrl: msg.multimedia || [],
      }));
        setMessages(messagesData); 
        console.log('Mensajes obtenidos:', messagesData);
        setLoading(false);
            const membersData = await getChatMembers(chat.chatId, localStorage.getItem('authToken') || '');
            const filteredMembers = membersData.map((member: any) => ({
              userId: member.userId,
              fullName: member.fullName,
              fotoPerfil: member.fotoPerfil,
            }));
    
            setChatUsers({  users: filteredMembers });
            
            console.log('Usuarios del chat:', { chatId: chat.chatId, users: filteredMembers });
    
      
    } catch (error) {
      console.error('Error al obtener los mensajes:', error);
    }
  };

 

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage({ ...newMessage, content: e.target.value });
  };

  const handleSendMessage = async () => {
    if (newMessage.content.trim() !== '') {
      try {
        console.log('Enviando mensaje:', newMessage);
        const response = await sendMessage(newMessage);
  
        if (!response.data) {
          console.error('Error al enviar el mensaje:', response);
          return;
        }
  
        const newMessageData: Message = {
          mensajeId: response.data._id,
          contenido: response.data.content,
          fecha: new Date(response.data.fechaMensaje).toLocaleString(),
          userId: response.data.sender.userId,
          fullName: response.data.sender.fullName || '',
          leido: response.data.status === 'LEIDO',
          likeCount: response.data.likesCount || 0,
          fechaMensaje: response.data.fechaMensaje,
          multimediaUrl: response.data.multimedia || [],
        };
  
        const socketMessageToSend: socketMessage = {
          chat: {
            chatId: chat.chatId,
            chatName: chat.chatName,
            chatImage: chat.chatImage,
            sender: {
              userId: newMessage.userId,
              fullName: newMessage.fullName,
              fotoPerfil: newMessage.userFoto,
            },
          },
          content: newMessage.content,
          fechaMensaje: newMessageData.fecha,
          messageId: newMessageData.mensajeId,
          status: 'ENVIADO',
          likesCount: newMessageData.likeCount,
          multimedia: newMessageData.multimediaUrl,
          users: chatUsers.users,
        };
  
        socket.emit("new message", socketMessageToSend);
        console.log('Mensaje emitido al servidor:', socketMessageToSend);
        console.log("sender", socketMessageToSend.chat.sender);
  
        setMessages((prevMessages) => [...prevMessages, newMessageData]);
  
        setNewMessage({ ...newMessage, content: '' });
      } catch (error) {
        console.error('Error al enviar el mensaje:', error);
      }
    }
  };
  



  return (
      <div className="flex flex-col h-screen relative">
        {/* Encabezado fijo */}
        <Header
          chatId={chat.chatId}
          chatName={chat.chatName}
          chatImage={chat.chatImage}
          onToggleInfo={() => setInfoChatOpen(!infoChatOpen)}
        />
  
        {/* Contenedor de mensajes con scroll independiente */}
        <div className="flex flex-col overflow-y-scroll">
          <div className="flex-1 flex flex-col overflow-y-scroll">
            {loading ? (
              <p className="text-center">Cargando los mensajes...</p>
            ) : (
              <ScrollMessages messages={messages} />
            )}
          </div>
  
          {/* Información del chat (fijo en el lado derecho) */}
          {infoChatOpen && (
            <div className="w-1/3 h-full border-l border-gray-200">
              <InfoChat
                chatId={chat.chatId}
                chatName={chat.chatName}
                chatImage={chat.chatImage}
                onClose={() => setInfoChatOpen(false)}
              />
            </div>
          )}
        </div>
    
          {/* Barra de entrada de mensajes (fija en la parte inferior) */}
          <div className="fixed bottom-0 left-0 right-0 flex items-center h-16 p-4 bg-gray-50 border-t border-gray-200 w-full">
            <Button variant="ghost" size="icon">
              <Smile className="w-6 h-6 text-gray-500" />
            </Button>
            <Button variant="ghost" size="icon">
              <Paperclip className="w-6 h-6 text-gray-500" />
            </Button>
            <div className="flex-grow mx-4">
              <Input
                type="text"
                placeholder="Escribe un mensaje"
                className="w-full rounded-full bg-gray-100 px-4 py-2 focus:outline-none"
                value={newMessage.content}
                onChange={handleInputChange}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
            </div>
            <Button variant="ghost" size="icon">
              <Mic className="w-6 h-6 text-gray-500" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleSendMessage}>
              <Send className="w-6 h-6 text-blue-500" />
            </Button>
          </div>
          </div>
    );
  };
  
  export default ChatContent;