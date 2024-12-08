import { axiosChatInstance } from "../AxiosConfig";



export const createSingleChat = async (data: any) => {
    try {
        const response = await axiosChatInstance.post('/single', 
            { userId: data.userId }, 
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${data.token}`,
                }
            }
        );
        return response.data;
    } catch (error) {
        return (error as any).response.data;
    }
};

interface CreateGroupChatData {
  usersId: number[];
  chatName: string;
  token: string;
}

export const createGroupChat = async (data: CreateGroupChatData) => {
  try {
    const response = await axiosChatInstance.post('/group/data', 
      { usersId: data.usersId, chatName: data.chatName }, 
      {
        headers: {
          "Authorization": `Bearer ${data.token}`, 
          "Content-Type": "application/json",
        },
      });
    return response.data;
  } catch (error) {
    console.error("Error al crear el grupo:", error);
    return (error as any).response?.data;
  }
};

export const uploadGroupImage = async (file: File, chatId: number, token: string) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await axiosChatInstance.post(`/group/file/${chatId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`, 
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al subir la imagen del grupo:", error);
    return (error as any).response?.data;
  }
};


export const getChat = async (chatId: number, token: string) => {
  try {
    const response = await axiosChatInstance.get(`/${chatId}`, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener el chat:", error);
    return (error as any).response?.data;
  }
};

export const findAllChatsOfUser = async (token: string) => {
  try {
    const response = await axiosChatInstance.get('/user', {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener los chats del usuario:", error);
    return (error as any).response?.data;
  }
};

export const addToGroup = async (chatId: number, userId: number, token: string) => {
  try {
    const response = await axiosChatInstance.put(`/${chatId}/add/${userId}`, {}, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al añadir usuario al grupo:", error);
    return (error as any).response?.data;
  }
};

export const removeFromGroup = async (chatId: number, userId: number, token: string) => {
  try {
    const response = await axiosChatInstance.put(`/${chatId}/remove/${userId}`, {}, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error al remover usuario del grupo:", error);
    return (error as any).response?.data;
  }
};

export const deleteChat = async (chatId: number, token: string) => {
  try {
    const response = await axiosChatInstance.delete(`/delete/${chatId}`, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    }
  )     
  return response;
  ;
  } catch (error) {
    console.error("Error al eliminar el chat:", error);
  }
};

export const updateChat = async (chatId: number, data: { chatName: string }, token: string) => {
  try {
    const newName = encodeURIComponent(data.chatName);
    const response = await axiosChatInstance.patch(`/update/${chatId}`, null, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
      params: {
        newName: newName, 
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el nombre del chat:", error);
    return (error as any).response?.data;
  }
};




export const getAllChats = async (usuarioId: number) => {
  try {
    const response = await axiosChatInstance.get(`/all/${usuarioId}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener todos los chats:", error);
    return (error as any).response?.data;
  }
};

export const searchChatsByName = async (token: string, searchTerm: string) => {
  try {
    const response = await axiosChatInstance.get(`/search?query=${encodeURIComponent(searchTerm)}`, {
      headers: { "Authorization": `Bearer ${token}` }
    });
    return response.data;
  } catch (error: any) {
    console.error("Error al buscar chats:", error);
    return error.response?.data;
  }
};


export const getChatMembers = async (chatId: number, token:string) => {
  try {
    const response = await axiosChatInstance.get(`/${chatId}/members`,
      {
        headers: { 
          "Authorization": `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener los miembros del chat:", error);
    return (error as any).response?.data;
  }
};

export const updateChatImage = async (chatId: number, image: File, token: string) => {
  try {
    const formData = new FormData();
    formData.append('image', image);

    const response = await axiosChatInstance.patch(`/${chatId}/updateImage`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al actualizar la imagen del chat:", error);
    return (error as any).response?.data;
  }
};

export const leaveChat = async (chatId: number, token: string) => {
  try {
    const response = await axiosChatInstance.put(`/${chatId}/leave`, {}, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error al salir del chat:", error);
    return (error as any).response?.data;
  }
};
