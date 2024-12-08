


  import {axiosFriendRequestInstance} from '../AxiosConfig';

  export const sendFriendRequest = async (senderId: number, receiverId: number) => {
    try {
      console.log("sender", senderId)
      const response = await axiosFriendRequestInstance.post(`/${senderId}/${receiverId}`);
      return response.data;
    } catch (error: any) {
      console.error("Error al enviar solicitud de amistad:", error);
      return error.response?.data;
    }
  };
  
  export const respondToFriendRequest = async (requestId: number, accept: boolean) => {
    try {
      console.log("requestId", requestId);
      const response = await axiosFriendRequestInstance.put(`/${requestId}/respond`, null, {
        params: { accept }, 
      });
      return response.data;
    } catch (error: any) {
      console.error("Error al responder la solicitud de amistad:", error);
      return error.response?.data;
    }
  };
  
  
  export const getReceivedRequests = async (receiverId: number)=> {
    try {
      console.log("receiver obteniendo", receiverId)
      const response = await axiosFriendRequestInstance.get(`/received/${receiverId}`);
      return response.data;
    } catch (error: any) {
      console.error("Error al obtener las solicitudes de amistad recibidas:", error);
      return error.response?.data;
    }
  };
  
  export const getSentRequests = async (senderId: number) => {
    try {
      console.log("sender", senderId)
      const response  = await axiosFriendRequestInstance.get(`/send/${senderId}`);
      return response.data;
    } catch (error: any) {
      console.error("Error al obtener las solicitudes de amistad enviadas:", error);
      return error.response?.data;
    }
  };
  
  export const cancelSentRequest = async (requestId: number) => {
    try {
      console.log("requestId", requestId)
      const response = await axiosFriendRequestInstance.delete(`/cancel/${requestId}`);
      return response.data;
    } catch (error: any) {
      console.error("Error al cancelar la solicitud de amistad enviada:", error);
      return error.response?.data;
    }
  };
  
  export const deleteReceivedRequest = async (requestId: number) => {
    try {
      console.log("requestId", requestId)
      const response = await axiosFriendRequestInstance.delete(`/delete/${requestId}`);
      return response.data;
    } catch (error: any) {
      console.error("Error al eliminar la solicitud de amistad recibida:", error);
      return error.response?.data;
    }
  };
  
  export const getRequestStatus = async (senderId: number, receiverId: number)  => {
    try {
      console.log("sender", senderId)
      const response  = await axiosFriendRequestInstance.get(`/status/${senderId}/${receiverId}`);
      return response.data;
    } catch (error: any) {
      console.error("Error al obtener el estado de la solicitud de amistad:", error);
      return error.response?.data;
    }
  };
  
