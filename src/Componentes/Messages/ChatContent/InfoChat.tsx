import React, { useEffect, useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '../../Navbar/Avatar';
import Button from '../Utils/Button';
import { X } from 'lucide-react';
import { getChatMembers, removeFromGroup, deleteChat, leaveChat } from '../../../Services/Chat/ChatService';
import { useAuth } from '../../../Hooks/useAuth';
import ConfirmRemoveUserDialog from './ConfirmRemoveUserDialog';
import ConfirmDeleteChatDialog from './ConfirmDeleteChatDialog';
import { useNavigate } from 'react-router-dom';
import AgregarUsuarios from './AgregarUsuarios';
import ConfirmLeaveChatDialog from './ConfirmLeaveChatDialog';
import EditChatDetails from './EditChatDetails';

interface InfoChatProps {
  chatId: number;
  chatName: string;
  chatImage: string;
  onClose: () => void;
}

const InfoChat: React.FC<InfoChatProps> = ({ chatId, chatName, chatImage, onClose }) => {
  const [members, setMembers] = useState<any[]>([]);
  const { user } = useAuth();
  const navigate = useNavigate();
  const isAdmin = members.some((member) => member.userId === user?.userId && member.admin);
  const isCreator = members.some((member) => member.userId === user?.userId && member.creator);
  console.log('isCreator', isCreator);

  const [showRemoveUserDialog, setShowRemoveUserDialog] = useState(false);
  const [showDeleteChatDialog, setShowDeleteChatDialog] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [showAgregarUsuarios, setShowAgregarUsuarios] = useState(false);
  const [showLeaveChatDialog, setShowLeaveChatDialog] = useState(false);

  useEffect(() => {
    getChatMembers(chatId, localStorage.getItem('authToken') || '')
      .then((members) => setMembers(members))
      .catch((error) => console.error('Error al obtener los miembros del chat:', error));
  }, [chatId]);

  

  const handleRemoveUser = async () => {
    if (selectedUserId !== null) {
      try {
        const response = await removeFromGroup(chatId, selectedUserId, localStorage.getItem('authToken') || '');
        console.log('Respuesta al eliminar usuario del grupo:', response);
        setMembers((prev) => prev.filter((member) => member.userId !== selectedUserId));
        setShowRemoveUserDialog(false);
        if(response.status === 200){
            navigate('/mensajes');
            window.location.reload(); 

            console.log('Usuario eliminado del grupo:', selectedUserId);
        }else{
            alert('No se pudo eliminar el usuario del grupo');

        }
      } catch (error) {
        console.error('Error al eliminar usuario del grupo:', error);
      }
    }
  };

  const handleDeleteChat = async () => {
    try {
      const respuesta = await deleteChat(chatId, localStorage.getItem('authToken') || '');
      console.log('Respuesta al eliminar el chat:', respuesta);
      setShowDeleteChatDialog(false);
      if (respuesta && respuesta.status === 204) {
        console.log('Chat eliminado:', chatId);
        navigate('/mensajes');
        window.location.reload(); 
      } else {
        alert('No se pudo eliminar el chat');
      }
    } catch (error) {
      console.error('Error al eliminar el chat:', error);
      alert('Ups, no se pudo eliminar el chat. Inténtalo más tarde.');
    } finally {
      onClose();
    }
  };

  const [currentChatName, setCurrentChatName] = useState(chatName);



  const handleLeaveChat = async () => {
    try {
      await leaveChat(chatId, localStorage.getItem('authToken') || '');
      console.log('Chat abandonado:', chatId);
      navigate('/mensajes');
      onClose();
      window.location.reload();
    } catch (error) {
      console.error('Error al abandonar el chat:', error);
    }
  };

  
  return (
    <div className="fixed top-0 right-0 w-1/4 h-full border-l border-gray-200 p-4 bg-white z-50 overflow-y-auto">
      <div className="flex justify-between items-center mb-4 mt-20">
        <h2 className="text-lg font-semibold">Información del chat</h2>
        <Button variant="ghost" size="icon" onClick={onClose} className="mt-2">
          <X className="w-5 h-5" />
        </Button>
      </div>
      
      <EditChatDetails
        currentChatName={currentChatName}
        isAdmin={isAdmin}
        imageUrl={chatImage}
        chatId={chatId}
      />
     
      {isCreator && (
        <div className="space-y-2 mt-4">
          <Button variant="outlined" className="w-full bg-gray-400" onClick={() => setShowDeleteChatDialog(true)}>
            Eliminar Chat
          </Button>
          <Button variant="outlined" className="w-full bg-gray-400" onClick={() => setShowAgregarUsuarios(true)}>
            Agregar miembros
          </Button>
        </div>
      )}
  
      <div className="space-y-2 mt-4">
        <h4 className="font-semibold">Miembros del chat</h4>
        <div className="space-y-2">
          {members.map((member) => (
            <div key={member.userId} className="flex items-center space-x-2">
              <Avatar className="w-10 h-10">
                <AvatarImage src={member.userPhoto} alt={member.userFullName} />
                <AvatarFallback>{member.userFullName.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <p className="text-sm font-semibold">{member.userFullName}</p>
              {member.isAdmin && <span className="text-xs text-blue-500 ml-2">(Admin)</span>}
              {isAdmin && member.userId !== user?.userId && (
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => {
                    setSelectedUserId(member.userId);
                    setShowRemoveUserDialog(true);
                  }}
                >
                  Eliminar
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-2 mt-4">
        <Button variant="outlined" className="w-full" onClick={() => setShowLeaveChatDialog(true)}>
          Salir del Chat
        </Button>
      </div>
      <div className="space-y-2 mt-4">
        <h4 className="font-semibold">Archivos compartidos</h4>
        <p className="text-gray-500">No hay archivos compartidos</p>
      </div>
  
      {/* Diálogo de confirmación para eliminar usuario */}
      {showRemoveUserDialog && (
        <ConfirmRemoveUserDialog
          onConfirm={handleRemoveUser}
          onCancel={() => setShowRemoveUserDialog(false)}
        />
      )}
  
      {/* Diálogo de confirmación para eliminar chat */}
      {showDeleteChatDialog && (
        <ConfirmDeleteChatDialog
          onConfirm={handleDeleteChat}
          onCancel={() => setShowDeleteChatDialog(false)}
        />
      )}
      {/* Confirm Leave Chat Dialog */}
      {showLeaveChatDialog && (
        <ConfirmLeaveChatDialog
          onConfirm={handleLeaveChat}
          onCancel={() => setShowLeaveChatDialog(false)}
        />
      )}
          
      {/* Diálogo para agregar miembros */}
      {showAgregarUsuarios && (
        <AgregarUsuarios chatId={chatId} onClose={() => setShowAgregarUsuarios(false)} />
      )}
    </div>
  );
}
export default InfoChat;