import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '../../Componentes/Profile/Tabs';
import { Avatar, AvatarImage, AvatarFallback } from '../../Componentes/Navbar/Avatar';
import PostsContent from './Posts';
import FriendsContent from './FriendsContent';
import RequestsContent from './RequestsContent';
import InfoContent from './InfoContent';
import { useAuth } from '../../Hooks/useAuth';
import { obtenerPequeñaInfo } from '../../Services/User/userService';
import { areFriends } from '../../Services/Friendship/FriendshipService';
import { sendFriendRequest } from '../../Services/FriendRequest/FriendRequestService';
import Navbar from '../../Componentes/Navbar/Navbar';

export default function Profile() {
  const navigate = useNavigate();
  const location = useLocation();
  const { usuarioId } = useParams<{ usuarioId: string }>();
  const { user } = useAuth();
  const authenticatedUserId = user?.userId;
  const [isFriend, setIsFriend] = useState(false);
  const [userInfo, setUserInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const numericUserId = parseInt(usuarioId || '0', 10);
  const activeTab = location.pathname.split('/').pop() || 'posts';

  if (isNaN(numericUserId) || numericUserId <= 0) {
    return <p>Error: Usuario no válido.</p>;
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(false);
      try {
        const info = await obtenerPequeñaInfo(numericUserId);
        if (!info) {
          setError(true);
        } else {
          setUserInfo(info);
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();

    const checkFriendship = async () => {
      if (!authenticatedUserId || isNaN(authenticatedUserId) || numericUserId === authenticatedUserId) {
        return;
      }
      try {
        const isFriendStatus = await areFriends(authenticatedUserId, localStorage.getItem('authToken') || '');
        setIsFriend(isFriendStatus);
      } catch (error) {
        console.error('Error checking friendship status:', error);
      }
    };

    checkFriendship();
  }, [authenticatedUserId, numericUserId]);

  const handleAddFriend = async () => {
    try {
      if (authenticatedUserId !== undefined) {
        await sendFriendRequest(authenticatedUserId, numericUserId);
        setIsFriend(true);
      } else {
        console.error('Authenticated user ID is undefined');
      }
    } catch (error) {
      console.error('Error sending friend request:', error);
    }
  };

  const handleTabChange = (tab: string) => {
    navigate(`/profile/${numericUserId}/${tab}`);
  };
  console.log("userInfo", userInfo);
  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return (
      <div className="text-center mt-10">
        <h1 className="text-3xl font-semibold text-red-600 mb-4">
          Ups, no se encontró a este usuario.
        </h1>
        <p className="text-gray-600 mb-6">
          El usuario que estás buscando no existe o no está disponible en este momento.
        </p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Volver al inicio
        </button>
      </div>
    );
  }

  return (
    <div className="w-full h-screen">
      <Navbar />
      <div className="min-h-screen bg-gray-100 w-full mt-12">
        <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            {/* Header */}
            <div className="p-6 flex items-center space-x-4">
              <Avatar className="h-24 w-24">
                {userInfo?.profilePicture ? (
                  <AvatarImage src={userInfo.profilePicture} alt={userInfo.name} />
                ) : (
                  <AvatarFallback>
                    {userInfo?.userFullName?.split(' ').map((n: string) => n[0]).join('')}
                  </AvatarFallback>
                )}
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold">{userInfo?.userFullName || 'Usuario'}</h1>
                <p className="text-gray-600">{userInfo?.email || 'Sin ocupación'}</p>
              </div>
              {!isFriend && authenticatedUserId !== numericUserId && (
                <button
                  onClick={handleAddFriend}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Agregar amigo
                </button>
              )}
            </div>

            {/* Tabs */}
            <Tabs className="w-full">
              <TabsList className="grid grid-cols-4">
                <TabsTrigger
                  value="posts"
                  activeTab={activeTab}
                  onClick={() => handleTabChange('posts')}
                >
                  Publicaciones
                </TabsTrigger>
                <TabsTrigger
                  value="friends"
                  activeTab={activeTab}
                  onClick={() => handleTabChange('friends')}
                >
                  Amigos
                </TabsTrigger>
                {authenticatedUserId === numericUserId && (
                  <TabsTrigger
                    value="requests"
                    activeTab={activeTab}
                    onClick={() => handleTabChange('requests')}
                  >
                    Solicitudes
                  </TabsTrigger>
                )}
                <TabsTrigger
                  value="info"
                  activeTab={activeTab}
                  onClick={() => handleTabChange('info')}
                >
                  Información
                </TabsTrigger>
              </TabsList>

              <TabsContent value="posts" activeTab={activeTab}>
                <PostsContent userInfo={userInfo} />
              </TabsContent>

              <TabsContent value="friends" activeTab={activeTab}>
                <FriendsContent id={numericUserId} />
              </TabsContent>

              {authenticatedUserId === numericUserId && (
                <TabsContent value="requests" activeTab={activeTab}>
                  <RequestsContent />
                </TabsContent>
              )}

              <TabsContent value="info" activeTab={activeTab}>
                <InfoContent bio={userInfo?.bio || ''} id={numericUserId} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
