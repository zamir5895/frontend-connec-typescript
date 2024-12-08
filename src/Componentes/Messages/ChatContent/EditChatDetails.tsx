import React, { useState, useRef } from 'react';
import Input from '../Utils/Input';
import AvatarEditor from 'react-avatar-editor';
import { updateChat, updateChatImage } from '../../../Services/Chat/ChatService';

interface EditChatDetailsProps {
  currentChatName: string;
  isAdmin: boolean;
  imageUrl: string;
  chatId: number;
}

const EditChatDetails: React.FC<EditChatDetailsProps> = ({
  currentChatName,
  isAdmin,
  imageUrl,
    chatId,
}) => {
  const [previewImage, setPreviewImage] = useState<string | null>(imageUrl);
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingImage, setIsEditingImage] = useState(false);
  const [newChatName, setNewChatName] = useState(currentChatName);
  const editorRef = useRef<AvatarEditor>(null);
  

  const handleImagePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
        setIsEditingImage(true);
      };
      reader.onerror = () => {
        setPreviewImage('https://via.placeholder.com/128'); 
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      try {
        const token = localStorage.getItem('authToken') || '';
        const response = await updateChatImage(1, e.target.files[0], token);
        console.log('Imagen del chat actualizada:', response);
      } catch (error) {
        console.error('Error al actualizar la imagen del chat:', error);
      }
    }
  }

  const handleCropImage = () => {
    if (editorRef.current) {
      const canvas = editorRef.current.getImageScaledToCanvas();
      setPreviewImage(canvas.toDataURL());
      setIsEditingImage(false);
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], "croppedImage.png", { type: "image/png" });
          const syntheticEvent = { target: { files: [file] } } as unknown as React.ChangeEvent<HTMLInputElement>;
          handleImageChange(syntheticEvent);
        }
      });
    }
  };

  const handleConfirmNameChange = async () => {
    try {
      const token = localStorage.getItem('authToken') || '';
      const response = await updateChat(chatId, { chatName: newChatName }, token);
      console.log('Nombre del chat actualizado:', response);
      setIsEditingName(false);
      window.location.reload();
    } catch (error) {
      console.error('Error al actualizar el nombre del chat:', error);
    }
  };

  return (
    <div className="text-center p-6 bg-gray-50 rounded-lg shadow-md">
      <div className="relative w-32 h-32 mx-auto mb-4 group">
        {isEditingImage ? (
          <div className="flex flex-col items-center">
            <AvatarEditor
              ref={editorRef}
              image={previewImage || ''}
              width={128}
              height={128}
              border={20}
              borderRadius={64}
              scale={1.2}
              className="rounded-full"
            />
            <button
              onClick={handleCropImage}
              className="mt-3 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
            >
              Recortar y guardar
            </button>
          </div>
        ) : (
          <>
            <input
              type="file"
              onChange={handleImagePreview}
              className="hidden"
              id="chatImageUpload"
              accept="image/*"
            />
            <label htmlFor="chatImageUpload" className="cursor-pointer">
              <div className="w-full h-full rounded-full bg-gray-200 overflow-hidden flex items-center justify-center relative">
                <img
                  src={previewImage || 'https://via.placeholder.com/128'}
                  alt="Chat Preview"
                  className="object-cover w-full h-full rounded-full"
                  onError={() => setPreviewImage('https://via.placeholder.com/128')}
                />
                {isAdmin && (
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-70 flex items-center justify-center text-white font-medium text-sm transition-opacity">
                    Editar
                  </div>
                )}
              </div>
            </label>
          </>
        )}
      </div>

      <div className="flex flex-col items-center">
        {isEditingName ? (
          <div className="flex flex-col items-center w-full">
            <Input
              type="text"
              value={newChatName}
              onChange={(e) => setNewChatName(e.target.value)}
              placeholder="Nombre del chat"
              className="mt-2 text-center bg-gray-100 border border-gray-300 rounded-lg p-2"
              autoFocus
            />
            <div className="flex space-x-2 mt-2">
              <button
                onClick={handleConfirmNameChange}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Confirmar
              </button>
              <button
                onClick={() => setIsEditingName(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                Cancelar
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <div className="text-lg font-semibold text-gray-700">{currentChatName}</div>
            {isAdmin && (
              <button
                onClick={() => setIsEditingName(true)}
                className="text-gray-500 hover:text-gray-700 underline"
              >
                Editar
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EditChatDetails;