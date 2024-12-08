import React, { useEffect, useState } from 'react';
import {
  getReceivedRequests,
  respondToFriendRequest,
  getSentRequests,
  cancelSentRequest,
  deleteReceivedRequest,
} from '../../Services/FriendRequest/FriendRequestService';
import Button from '../../Componentes/Profile/Button';
import { useAuth } from '../../Hooks/useAuth';

interface FriendRequest {
  friendshipRequestId: number;
  senderFullName: string;
  senderUsername: string;
  sendfotoUrl?: string;
  status: string;
}

const RequestsContent: React.FC = () => {
  const [receivedRequests, setReceivedRequests] = useState<FriendRequest[]>([]);
  const [sentRequests, setSentRequests] = useState<FriendRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const userId = user?.userId;

  console.log('userId', userId);

  useEffect(() => {
    if (!userId || isNaN(userId)) {
      console.warn('Invalid userId. Skipping fetch.');
      return;
    }

    const fetchRequests = async () => {
      setLoading(true);
      try {
        // Fetch received requests
        const received = await getReceivedRequests(userId);
        setReceivedRequests(received);

        // Fetch sent requests
        const sent = await getSentRequests(userId);
        setSentRequests(sent);
      } catch (error) {
        console.error('Error fetching requests:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [userId]);

  const handleRequestAction = async (friendshipRequestId: number, accept: boolean) => {
    try {
      await respondToFriendRequest(friendshipRequestId, accept);
      setReceivedRequests((prev) =>
        prev.filter((request) => request.friendshipRequestId !== friendshipRequestId)
      );
    } catch (error) {
      console.error('Error handling friend request action:', error);
    }
  };

  const handleCancelRequest = async (friendshipRequestId: number) => {
    try {
      await cancelSentRequest(friendshipRequestId);
      setSentRequests((prev) =>
        prev.filter((request) => request.friendshipRequestId !== friendshipRequestId)
      );
    } catch (error) {
      console.error('Error cancelling sent request:', error);
    }
  };

  const handleDeleteRequest = async (friendshipRequestId: number) => {
    try {
      await deleteReceivedRequest(friendshipRequestId);
      setReceivedRequests((prev) =>
        prev.filter((request) => request.friendshipRequestId !== friendshipRequestId)
      );
    } catch (error) {
      console.error('Error deleting received request:', error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Solicitudes de Amistad</h1>

      {/* Received Requests */}
      <h2 className="text-lg font-bold mt-6">Solicitudes Recibidas</h2>
      {receivedRequests.length > 0 ? (
        <ul className="space-y-4">
          {receivedRequests.map((request) => (
            <li
              key={request.friendshipRequestId}
              className="p-4 border rounded-md shadow-sm flex items-center bg-white"
            >
              <div className="flex items-center space-x-4">
                {request.sendfotoUrl ? (
                  <img
                    src={request.sendfotoUrl}
                    alt={request.senderFullName}
                    className="w-12 h-12 rounded-full"
                  />
                ) : (
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">
                      {request.senderFullName.split(' ').map((n) => n[0]).join('')}
                    </span>
                  </div>
                )}
                <div>
                  <p className="font-bold text-lg">{request.senderFullName}</p>
                  <p className="text-sm text-gray-500">{request.senderUsername}</p>
                </div>
              </div>
              <div className="ml-auto flex space-x-10">
               
                <Button
                  variant="solid"
                  size="sm"
                  className="bg-blue-500 text-white"
                  onClick={() => handleRequestAction(request.friendshipRequestId, true)}
                >
                  Aceptar
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="bg-gray-200 text-gray-700"
                  onClick={() => handleRequestAction(request.friendshipRequestId, false)}
                >
                  Rechazar
                </Button>
                <Button
                  variant="solid"
                  size="sm"
                  className="bg-red-500 text-white"
                  onClick={() => handleDeleteRequest(request.friendshipRequestId)}
                >
                  Eliminar
                </Button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tienes solicitudes de amistad recibidas.</p>
      )}

      {/* Sent Requests */}
      <h2 className="text-lg font-bold mt-6">Solicitudes Enviadas</h2>
      {sentRequests.length > 0 ? (
        <ul className="space-y-4">
          {sentRequests.map((request) => (
            <li
              key={request.friendshipRequestId}
              className="p-4 border rounded-md shadow-sm flex items-center bg-white"
            >
              <div className="flex items-center space-x-4">
                {request.sendfotoUrl ? (
                  <img
                    src={request.sendfotoUrl}
                    alt={request.senderFullName}
                    className="w-12 h-12 rounded-full"
                  />
                ) : (
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">
                      {request.senderFullName.split(' ').map((n) => n[0]).join('')}
                    </span>
                  </div>
                )}
                <div>
                  <p className="font-bold text-lg">{request.senderFullName}</p>
                  <p className="text-sm text-gray-500">{request.senderUsername}</p>
                </div>
              </div>
              <div className="ml-auto flex space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="bg-red-500 text-white"
                  onClick={() => handleCancelRequest(request.friendshipRequestId)}
                >
                  Cancelar
                </Button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tienes solicitudes de amistad enviadas.</p>
      )}
    </div>
  );
};

export default RequestsContent;