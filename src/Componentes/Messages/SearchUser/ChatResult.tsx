    import React from 'react';

    interface ChatResultProps {
    chatId: number;
    chatName: string;
    chatImage: string;
    ultimoMensaje: string; 
    }

    const ChatResult: React.FC<ChatResultProps> = ({ chatId, chatName, chatImage, ultimoMensaje }) => {
    const formattedDate = new Date(ultimoMensaje).toLocaleString('es-ES', {
        dateStyle: 'short',
        timeStyle: 'short',
    });

    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.src = 'https://via.placeholder.com/150'; // Fallback image URL
        console.error(`Error loading image: ${chatImage}`);
    };

    console.log("ChatResult - chatImage:", chatImage); // Log the chatImage URL

    return (
        <div className="flex items-center p-2 border-b border-gray-200 hover:bg-gray-100 cursor-pointer">
        <img
            src={chatImage}
            alt={chatName}
            className="w-16 h-18 rounded-full mr-3 object-cover"
            onError={handleImageError}
            onLoad={() => console.log(`Image loaded successfully: ${chatImage}`)}
            />

        <div className="flex-grow">
            <p className="text-sm font-semibold">{chatName}</p>
            <p className="text-xs text-gray-500">{formattedDate}</p>
        </div>
        </div>
    );
    };

    export default ChatResult;