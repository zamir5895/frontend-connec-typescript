import { axiosMensajesInstance } from "../AxiosConfig";

export const getAllMessages = async (chatId: number) => {
  try {
    const response = await axiosMensajesInstance.get(`/${chatId}`);
    return response;
  } catch (error) {
    console.error('Error fetching all messages:', error);
    throw error;
  }
};

export const sendMessage = async (messageData: any) => {
  try {
    const response = await axiosMensajesInstance.post('/create', messageData);
    return response;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

export const uploadFile = async (chatId: number, messageId: string, file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axiosMensajesInstance.post(`/${chatId}/${messageId}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

export const modifyMessage = async (chatId: number, messageData: any) => {
  try {
    const response = await axiosMensajesInstance.put(`/${chatId}/modificar`, messageData);
    return response.data;
  } catch (error) {
    console.error('Error modifying message:', error);
    throw error;
  }
};

export const deleteMessage = async (chatId: number, mensajeId: string) => {
  try {
    const response = await axiosMensajesInstance.delete(`/${chatId}/eliminar/${mensajeId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting message:', error);
    throw error;
  }
};

export const getMessage = async (chatId: number, mensajeId: string) => {
  try {
    const response = await axiosMensajesInstance.get(`/${chatId}/${mensajeId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching message:', error);
    throw error;
  }
};

export const readMessage = async (chatId: number, mensajeId: string) => {
  try {
    const response = await axiosMensajesInstance.put(`/${chatId}/${mensajeId}/read`);
    return response.data;
  } catch (error) {
    console.error('Error marking message as read:', error);
    throw error;
  }
};

export const unreadMessage = async (chatId: number, mensajeId: string) => {
  try {
    const response = await axiosMensajesInstance.put(`/${chatId}/${mensajeId}/unread`);
    return response.data;
  } catch (error) {
    console.error('Error marking message as unread:', error);
    throw error;
  }
};

export const likeMessage = async (chatId: number, mensajeId: string) => {
  try {
    const response = await axiosMensajesInstance.put(`/${chatId}/${mensajeId}/like`);
    return response.data;
  } catch (error) {
    console.error('Error liking message:', error);
    throw error;
  }
};

export const getLikes = async (chatId: number, mensajeId: string) => {
  try {
    const response = await axiosMensajesInstance.get(`/${chatId}/${mensajeId}/like`);
    return response.data;
  } catch (error) {
    console.error('Error fetching likes:', error);
    throw error;
  }
};

export const dislikeMessage = async (chatId: number, mensajeId: string) => {
  try {
    const response = await axiosMensajesInstance.put(`/${chatId}/${mensajeId}/dislike`);
    return response.data;
  } catch (error) {
    console.error('Error disliking message:', error);
    throw error;
  }
};

export const searchMessage = async (chatId: number, query: string) => {
  try {
    const response = await axiosMensajesInstance.get(`/${chatId}/search`, {
      params: { q: query },
    });
    return response.data;
  } catch (error) {
    console.error('Error searching messages:', error);
    throw error;
  }
};

export const deleteMultimedia = async (chatId: number, mensajeId: string, multimediaId: string) => {
  try {
    const response = await axiosMensajesInstance.delete(`/${chatId}/${mensajeId}/${multimediaId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting multimedia:', error);
    throw error;
  }
};

export const getMultimedia = async (chatId: number, mensajeId: string, multimediaId: string) => {
  try {
    const response = await axiosMensajesInstance.get(`/${chatId}/${mensajeId}/${multimediaId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching multimedia:', error);
    throw error;
  }
};

export const getAllMultimedias = async (chatId: number, mensajeId: string) => {
  try {
    const response = await axiosMensajesInstance.put(`/${chatId}/${mensajeId}/multimedias`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all multimedias:', error);
    throw error;
  }
};

export const deleteMessagesByChatId = async (chatId: number) => {
  try {
    const response = await axiosMensajesInstance.delete(`/${chatId}/allMensajes`);
    return response.data;
  } catch (error) {
    console.error('Error deleting messages by chat ID:', error);
    throw error;
  }
};

export const getLatestMessage = async (chatId: number) => {
  try {
    const response = await axiosMensajesInstance.get(`/${chatId}/latestMessage`);
    return response.data;
  } catch (error) {
    console.error('Error fetching latest message:', error);
    throw error;
  }
};