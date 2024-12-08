import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../Utils/Dialog';
import Input from '../Utils/Input';
import ScrollArea from '../Utils/ScrollArea';
import Button from '../Utils/Button';
import { Avatar, AvatarFallback, AvatarImage } from '../../Navbar/Avatar';
import { createGroupChat, uploadGroupImage } from '../../../Services/Chat/ChatService';
import { useAuth } from '../../../Hooks/useAuth';
import { getFriends } from '../../../Services/Friendship/FriendshipService';

interface CreateGroupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreateGroupDialog: React.FC<CreateGroupDialogProps> = ({ open, onOpenChange }) => {
  const [step, setStep] = useState(1);
  const [groupName, setGroupName] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [friends, setFriends] = useState<any[]>([]);
  const { userId } = useAuth();
  const [chatId, setChatId] = useState<number | null>(null);

  useEffect(() => {
    const fetchFriendsList = async () => {
      if (userId) {
        try {
          const friendsList = await getFriends(userId);
          console.log('Lista de amigos:', friendsList);
          setFriends(friendsList);
        } catch (error) {
          console.error('Error al obtener la lista de amigos:', error);
        }
      }
    };
    fetchFriendsList();
  }, [userId]);

  const toggleUserSelection = (userId: number) => {
    setSelectedUsers((prevSelectedUsers) =>
      prevSelectedUsers.includes(userId)
        ? prevSelectedUsers.filter((id) => id !== userId)
        : [...prevSelectedUsers, userId]
    );
  };

  const handleCreateGroup = async () => {
    if (!groupName || selectedUsers.length === 0) {
      alert("Por favor, completa todos los pasos antes de crear el grupo.");
      return;
    }

    try {
      console.log('Creando grupo con:', groupName, selectedUsers);
      const response = await createGroupChat({
        usersId: selectedUsers,
        chatName: groupName,
        token: localStorage.getItem('authToken') || '',
      });
      console.log('Respuesta al crear el grupo:', response);
      setChatId(response.chatId); 
      setStep(3);
 
    } catch (error) {
      console.error('Error al crear el grupo:', error);
    }
  };

  const handleUploadImage = async () => {
    if (!file || !chatId) {
      alert('Por favor, selecciona una imagen antes de continuar.');
      return;
    }
    try {
      const response = await uploadGroupImage(file, chatId, localStorage.getItem('authToken') || '');
      console.log('Respuesta al subir la imagen:', response);
      onOpenChange(false); 
      resetForm();
      window.location.reload();

    } catch (error) {
      console.error('Error al subir la imagen:', error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setStep(1);
    setGroupName('');
    setSelectedUsers([]);
    setFile(null);
    setPreviewImage(null);
    setChatId(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear nuevo grupo</DialogTitle>
        </DialogHeader>

        <div className="text-center mb-4">{`Paso ${step} de 3`}</div>

        {step === 1 && (
          <>
            <Input
              type="text"
              placeholder="Nombre del grupo"
              value={groupName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGroupName(e.target.value)}
              className="mb-4"
            />
            <Button className="w-full mt-4 bg-gray-200" onClick={() => setStep(2)} disabled={!groupName}>
              Siguiente
            </Button>
          </>
        )}

        {step === 2 && (
          <>
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
            <Button
              className="w-full mt-4"
              onClick={handleCreateGroup}
              disabled={selectedUsers.length === 0}
            >
              Crear grupo
            </Button>
          </>
        )}

        {step === 3 && (
          <>
            <div className="flex flex-col items-center mb-4">
              <label htmlFor="groupImage" className="cursor-pointer mb-2">
                {previewImage ? (
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={previewImage} alt="Group preview" />
                  </Avatar>
                ) : (
                  <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                    Seleccionar imagen
                  </div>
                )}
              </label>
              <input
                id="groupImage"
                type="file"
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
              />
            </div>
            <Button className="w-full mt-4" onClick={handleUploadImage}>
              Subir Imagen
            </Button>
          </>
        )}

        {step > 1 && (
          <Button
            variant="outlined"
            className="w-full mt-2"
            onClick={() => setStep(step - 1)}
          >
            Volver
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CreateGroupDialog;
