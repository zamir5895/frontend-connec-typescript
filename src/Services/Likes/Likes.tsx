
import { axiosLikesInstance } from "../AxiosConfig";


interface LikeResponseDTO {
  id: number;
  usuarioLikeId: number;
  publicacionId: number;
  fechaLike: string;
}


export const postLike = async (publicacionInicioId: number, usuarioLikeId: number) => {
  const response = await axiosLikesInstance.post(`/${publicacionInicioId}/${usuarioLikeId}`);
  return response.data;
};

export const getLikeById = async (likeId: number) => {
  const response = await axiosLikesInstance.get(`/${likeId}`);
  return response.data;
};

export const deleteLike = async (likeId: number) => {
  const response = await axiosLikesInstance.delete(`/${likeId}`);
  return response.data;
};

export const getLikesByPublicacion = async (publicacionInicioId: number) => {
  const response = await axiosLikesInstance.get(`/publicacion/${publicacionInicioId}`);
  return response.data;
};

export const getLikesCountByPublicacion = async (publicacionInicioId: number) => {
  const response = await axiosLikesInstance.get(`/${publicacionInicioId}/cantidad`);
  return response.data;
};

export const getLikesByDateRange = async (inicio: string, fin: string) => {
  const response = await axiosLikesInstance.get('/fecha', {
    params: { inicio, fin },
  });
  return response.data;
};

export const totalLikes = async (publicacionId: number) => {
  const response = await axiosLikesInstance.get(`/${publicacionId}/likes`);
  return response.data;
};