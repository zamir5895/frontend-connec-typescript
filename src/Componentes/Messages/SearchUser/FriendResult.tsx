import React from 'react';

interface FriendResultProps {
  amigoId: number;
  amigoName: string;
  fotoUrl: string;
}

const FriendResult: React.FC<FriendResultProps> = ({ amigoId, amigoName, fotoUrl }) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://via.placeholder.com/150'; // Fallback image URL
    console.error(`Error loading image: ${fotoUrl}`);
  };

  console.log('Amigo:', amigoName);
  console.log('Foto:', fotoUrl);

  return (
    <div className="flex items-center p-2 border-b border-gray-200 hover:bg-gray-100 cursor-pointer">
      <img
        src={fotoUrl}
        alt={amigoName}
        className="w-10 h-10 rounded-full mr-3"
        onError={handleImageError}
        onLoad={() => console.log(`Image loaded successfully: ${fotoUrl}`)}

      />
      <div>
        <p className="text-sm font-semibold">{amigoName}</p>
      </div>
    </div>
  );
};

export default FriendResult;