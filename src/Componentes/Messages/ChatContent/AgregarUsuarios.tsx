import React, { useState, useEffect } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '../../Navbar/Avatar';
import ScrollArea from '../Utils/ScrollArea';
import Button from '../Utils/Button';
import { getFriends } from '../../../Services/Friendship/FriendshipService';
import { addToGroup } from '../../../Services/Chat/ChatService';
import { useAuth } from '../../../Hooks/useAuth';

interface AgregarUsuariosProps {
  chatId: number;
  onClose: () => void;
}

const AgregarUsuarios: React.FC<AgregarUsuariosProps> = ({ chatId, onClose }) => {
  const [friends, setFriends] = useState<any[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchFriendsList = async () => {
      if (user && user.userId) {
        try {
          const friendsList = await getFriends(user.userId);
          setFriends(friendsList);
        } catch (error) {
          console.error('Error al obtener la lista de amigos:', error);
        }
      }
    };
    fetchFriendsList();
  }, [user?.userId]);

  const toggleUserSelection = (userId: number) => {
    setSelectedUsers((prevSelectedUsers) =>
      prevSelectedUsers.includes(userId)
        ? prevSelectedUsers.filter((id) => id !== userId)
        : [...prevSelectedUsers, userId]
    );
  };

  const handleAddUsers = async () => {
    try {
      const token = localStorage.getItem('authToken') || '';
      const promises = selectedUsers.map((userId) => addToGroup(chatId, userId, token));
      await Promise.all(promises);
      console.log('Usuarios añadidos al grupo:', selectedUsers);
      onClose();
      window.location.reload(); 
    } catch (error) {
      console.error('Error al añadir usuarios al grupo:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg w-1/2">
        <h2 className="text-lg font-semibold mb-4">Agregar Usuarios al Chat</h2>
        <div className="flex items-center overflow-x-auto gap-2 mb-4 p-2 border rounded">
          {friends
            .filter((friend) => selectedUsers.includes(friend.amigoId))
            .map((friend) => (
              <div key={friend.amigoId} className="flex flex-col items-center">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={friend.fotoUrl || 'https://via.placeholder.com/150'} alt={friend.fullName} />
                  <AvatarFallback>{friend.fullName ? friend.fullName.charAt(0) : '?'}</AvatarFallback>
                </Avatar>
                <span className="text-xs truncate max-w-[50px]">{friend.fullName}</span>
              </div>
            ))}
        </div>

        <ScrollArea className="h-64 border rounded">
          {friends.map((friend) => (
            <div key={friend.amigoId} className="flex items-center justify-between p-2 hover:bg-gray-100">
              <div className="flex items-center">
                <Avatar className="w-8 h-8 mr-2">
                  <AvatarImage src={friend.fotoUrl || 'https://via.placeholder.com/150'} alt={friend.fullName} />
                  <AvatarFallback>{friend.fullName ? friend.fullName.charAt(0) : '?'}</AvatarFallback>
                </Avatar>
                <span>{friend.fullName}</span>
              </div>
              <Button
                variant="outlined"
                size="small"
                onClick={() => toggleUserSelection(friend.amigoId)}
              >
                {selectedUsers.includes(friend.amigoId) ? 'Quitar' : 'Añadir'}
              </Button>
            </div>
          ))}
        </ScrollArea>
        <div className="flex justify-between mt-4">
          <Button
            className="w-1/2 mr-2"
            onClick={handleAddUsers}
            disabled={selectedUsers.length === 0}
          >
            Finalizar
          </Button>
          <Button
            className="w-1/2 ml-2"
            onClick={() => setSelectedUsers([])}
          >
            Seguir Agregando
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AgregarUsuarios;