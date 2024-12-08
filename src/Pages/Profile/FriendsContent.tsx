import React, { useState, useEffect } from 'react';
import {
  blockearAmigo,
  unblockAmigo,
  mostraramigosNoblockeados,
  mostraramigosBlockeados,
  getTotalFriends,
  getTotalBlockedFriends,
  getTotalNonBlockedFriends,
  getAllFriendships,
  deleteFriendship,
} from '../../Services/Friendship/FriendshipService';
import { useAuth } from '../../Hooks/useAuth';
import { useNavigate } from 'react-router-dom';



interface Friend {
  amigoId: number;
  nombreCompleto: string;
  apellidoCompleto: string;
  fotoPerfilUrl?: string;
  userName: string;
  fechaAmistad: string;
  amistadId: number;
}

interface FriendsContentProps {
  id: number;
}

const FriendsContent: React.FC<FriendsContentProps> = ({ id }) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'nonBlocked' | 'blocked'>('nonBlocked');
  const [friends, setFriends] = useState<Friend[]>([]);
  const [filteredFriends, setFilteredFriends] = useState<Friend[]>([]);
  const [totalBlocked, setTotalBlocked] = useState(0);
  const [totalNonBlocked, setTotalNonBlocked] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const size = 10;
  const navigate = useNavigate();
  const isSameUser = user?.userId === id;
  const [totalAmigos, setTotalAmigos] = useState(0);
  // Fetch total friends count
  useEffect(() => {
    const fetchTotals = async () => {
      try {
        const totalBlockedCount = await getTotalBlockedFriends(id);
        const totalNonBlockedCount = await getTotalNonBlockedFriends(id);
        const totalFriendsCount = await getTotalFriends(id);
        setTotalAmigos(totalFriendsCount || 0);
        setTotalBlocked(totalBlockedCount || 0);
        setTotalNonBlocked(totalNonBlockedCount || 0);
      } catch (error) {
        console.error('Error fetching totals:', error);
      }
    };

    fetchTotals();
  }, [id]);

  // Fetch friends based on tab (nonBlocked/blocked)
  const fetchFriends = async (type: 'nonBlocked' | 'blocked') => {
    setLoading(true);
    try {
      const data =
        type === 'nonBlocked'
          ? await mostraramigosNoblockeados(id, page, size)
          : await mostraramigosBlockeados(id, page, size);

      if (data && Array.isArray(data.content)) {
        const newFriends = page === 0 ? data.content : [...friends, ...data.content];
        setFriends(newFriends);
        setFilteredFriends(newFriends);
      }
    } catch (error) {
      console.error(`Error fetching ${type} friends:`, error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFriends(activeTab);
  }, [activeTab, page]);

  useEffect(() => {
    if (search) {
      const lowercasedSearch = search.toLowerCase();
      setFilteredFriends(
        friends.filter(
          (f) =>
            f.nombreCompleto.toLowerCase().includes(lowercasedSearch) ||
            f.userName.toLowerCase().includes(lowercasedSearch)
        )
      );
    } else {
      setFilteredFriends(friends);
    }
  }, [search, friends]);

  const handleBlock = async (amistadId: number, amigoId: number) => {
    try {
      await blockearAmigo(amistadId, id, amigoId);
      setFriends((prevFriends) => prevFriends.filter((f) => f.amistadId !== amistadId));
    } catch (error) {
      console.error('Error blocking friend:', error);
    }
  };

  const handleUnblock = async (amistadId: number, amigoId: number) => {
    try {
      await unblockAmigo(amistadId, id, amigoId);
      setFriends((prevFriends) => prevFriends.filter((f) => f.amistadId !== amistadId));
    } catch (error) {
      console.error('Error unblocking friend:', error);
    }
  };
  const handleDeleteFriendship = async (amistadId: number) => {
    try {
      await deleteFriendship(amistadId);
      setFriends((prevFriends) => prevFriends.filter((f) => f.amistadId !== amistadId));
    } catch (error) {
      console.error('Error deleting friendship:', error);
    }
  }

  const navigateToProfile = (amigoId: number) => {
    navigate(`/profile/${amigoId}`);
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        {isSameUser ? `Mis Amigos` : `Amigos ${totalAmigos} `}
      </h2>
      {/* Barra de búsqueda */}
      <input
        type="text"
        placeholder="Buscar amigos por nombre o usuario..."
        className="w-full p-3 mb-6 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Tabs */}
      {isSameUser && (
        <div className="flex justify-center space-x-4 mb-6">
          <button
            className={`px-6 py-2 rounded-lg ${
              activeTab === 'nonBlocked' ? 'bg-gray-400 text-white' : 'bg-gray-200'
            }`}
            onClick={() => {
              setActiveTab('nonBlocked');
              setPage(0);
            }}
          >
            Amigos No Bloqueados ({totalNonBlocked})
          </button>
          <button
            className={`px-6 py-2 rounded-lg ${
              activeTab === 'blocked' ? 'bg-gray-400 text-white' : 'bg-gray-200'
            }`}
            onClick={() => {
              setActiveTab('blocked');
              setPage(0);
            }}
          >
            Amigos Bloqueados ({totalBlocked})
          </button>
        </div>
      )}

      {/* Lista de amigos */}
      {loading && <p className="text-center text-gray-500">Cargando amigos...</p>}

      <ul className="space-y-4">
        {filteredFriends.length > 0 ? (
          filteredFriends.map((friend) => (
            <li
              key={friend.amistadId}
              className="p-4 border rounded-lg shadow-sm flex items-center justify-between bg-white"
              onClick={() => navigateToProfile(friend.amigoId)}

            >
              <div className="flex items-center space-x-4">
                {friend.fotoPerfilUrl ? (
                  <img
                    src={friend.fotoPerfilUrl}
                    alt={friend.nombreCompleto}
                    className="w-12 h-12 rounded-full"
                  />
                ) : (
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-gray-700 font103-bold">
                      {friend.nombreCompleto.split(' ').map((n) => n[0]).join('')}
                    </span>
                  </div>
                )}
                <div>
                  <p className="font-bold text-gray-800">{`${friend.nombreCompleto} ${friend.apellidoCompleto}`}</p>
                  <p className="text-sm text-gray-500">{friend.userName}</p>
                  <p className="text-sm text-gray-400">
                    {new Date(friend.fechaAmistad).toLocaleDateString()}
                  </p>
                </div>
              </div>
              {isSameUser && (
                <div className="ml-auto flex space-x-2">
                  {activeTab === 'nonBlocked' && (
                    <button
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                      onClick={() => handleBlock(friend.amistadId, friend.amigoId)}
                    >
                      Bloquear
                    </button>
                    
                  )}
                  {activeTab === 'blocked' && (
                    <button
                      className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                      onClick={() => handleUnblock(friend.amistadId, friend.amigoId)}
                    >
                      Desbloquear
                    </button>
                  )}
                  <button
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                      onClick={() => handleDeleteFriendship(friend.amistadId)}
                    >
                      Eliminar
                    </button>
                </div>
              )}
            </li>
          ))
        ) : (
          <p className="text-center text-gray-500">No hay amigos disponibles en esta categoría.</p>
        )}
      </ul>

      {!loading && friends.length >= size && (
        <button
          className="mt-6 w-full px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
          onClick={() => setPage((prev) => prev + 1)}
        >
          Cargar más
        </button>
      )}
    </div>
  );
};

export default FriendsContent;
