import React, { useState, useEffect } from 'react';
import Input from '../Utils/Input';
import { Search } from 'lucide-react';
import { searchChatsByName } from '../../../Services/Chat/ChatService';
import { searchFriends } from '../../../Services/Friendship/FriendshipService';
import FriendResult from './FriendResult';
import ChatResult from './ChatResult';

const SearchUser: React.FC<{ onSearchChange: (term: string) => void }> = ({ onSearchChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [friendsResults, setFriendsResults] = useState<any[]>([]);
  const [chatsResults, setChatsResults] = useState<any[]>([]);

  useEffect(() => {
    onSearchChange(searchTerm);

    const fetchSearchResults = async () => {
      if (searchTerm.trim().length < 1) {
        setFriendsResults([]);
        setChatsResults([]);
        return;
      }

      try {
        const token = localStorage.getItem("authToken") || '';
        const [friends, chats] = await Promise.all([
          searchFriends(token, searchTerm),
          searchChatsByName(token, searchTerm),
        ]);
        setFriendsResults(friends);
        setChatsResults(chats);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    fetchSearchResults();
  }, [searchTerm, onSearchChange]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className=" fixed p-4 bg-gray-50">
      <Input
        type="text"
        placeholder="Buscar o empezar un nuevo chat"
        value={searchTerm}
        onChange={handleInputChange}
        className="w-full bg-white"
        prefix={<Search className="w-4 h-4 text-gray-400" />}
      />

      {searchTerm.trim().length > 0 && (
        <>
          <div className="mt-4">
            <h3 className="font-semibold">Amigos</h3>
            {friendsResults.length > 0 ? (
              friendsResults.map((friend) => (
                console.log('fotoUrl:', friend.fotoUrl),
                
                <FriendResult
                  key={friend.amigoId}
                  amigoId={friend.amigoId}
                  amigoName={friend.amigoName}
                  fotoUrl={friend.fotoUrl}
                />
              ))
            ) : (
              <p>No se encontraron amigos.</p>
            )}
          </div>

          <div className="mt-4">
            <h3 className="font-semibold">Chats</h3>
            {chatsResults.length > 0 ? (
              chatsResults.map((chat) => (
                console.log('chatImage:', chat.chatImage),
                <ChatResult
                  key={chat.chatId}
                  chatId={chat.chatId}
                  chatName={chat.chatName}
                  chatImage={chat.chatImage}
                  ultimoMensaje={chat.ultimoMensaje}
                />
              ))
            ) : (
              <p>No se encontraron chats.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default SearchUser;