import axios from 'axios';


import { axiosComentariosInstance } from '../AxiosConfig';
// DTO Interfaces
interface ComentarioDto {
  message: string;
  autorId: number;
}

interface CambioContenidoDTO {
  contenido: string;
}
interface ComentarioRespuestaDTO {
    id: number;
    message: string;
    likes: number;
    urlMulimedia: string;
    fechaCreacion: string; 
    multimediaId: string;
    autorId: number;
  }
  

interface ResponseComMultimediaDTO {
  id: number;
  url_contenido: string;
  tipo:string
}

// Fetch Functions
export const agregarComentario = async (publicacionId: number, comentarioDTO: ComentarioDto, multimedia: File) => {
  const formData = new FormData();
  formData.append('comentarioDTO', JSON.stringify(comentarioDTO));
  formData.append('multimedia', multimedia);

  const response = await axiosComentariosInstance.post(`/${publicacionId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const agregarRespuesta = async (publicacionId: number, parentId: number, comentarioDTO: ComentarioDto, multimedia?: File) => {
  const formData = new FormData();
  formData.append('data', JSON.stringify(comentarioDTO));
  if (multimedia) {
    formData.append('file', multimedia);
  }

  const response = await axiosComentariosInstance.post(`/${publicacionId}/commentario/${parentId}/respuestas`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const getComentario = async (publicacionId: number, page: number, size: number) => {
  const response = await axiosComentariosInstance.get(`/${publicacionId}/comentario`, {
    params: { page, size },
  });
  return response.data;
};

export const getRespuestas = async (publicacionId: number, parentId: number, page: number, size: number) => {
  const response = await axiosComentariosInstance.get(`/${publicacionId}/comentario/${parentId}/respuestas`, {
    params: { page, size },
  });
  return response.data;
};

export const eliminarComentario = async (publicacionID: number, comentarioId: number) => {
  const response = await axiosComentariosInstance.delete(`/${publicacionID}/comentario/${comentarioId}`);
  return response.data;
};

export const eliminarRespuesta = async (publicacionID: number, parentID: number, comentarioId: number) => {
  const response = await axiosComentariosInstance.delete(`/${publicacionID}/comentario/${parentID}/respuestas/${comentarioId}`);
  return response.data;
};

export const actualizarComentario = async (publicacionId: number, comentarioId: number, cambioContenidoDTO: CambioContenidoDTO) => {
  const response = await axiosComentariosInstance.patch(`/${publicacionId}/comentario/${comentarioId}`, cambioContenidoDTO);
  return response.data;
};

export const actualizarComentarioRespuesta = async (publicacionId: number, parentID: number, comentarioId: number, cambioContenidoDTO: CambioContenidoDTO) => {
  const response = await axiosComentariosInstance.patch(`/${publicacionId}/comentario/${parentID}/respuestas/${comentarioId}`, cambioContenidoDTO);
  return response.data;
};

export const actualizarComentarioLikes = async (publicacionId: number, comentarioId: number) => {
  const response = await axiosComentariosInstance.patch(`/${publicacionId}/comentario/likes/${comentarioId}`);
  return response.data;
};

export const actualizarComentarioRespuestaLikes = async (publicacionId: number, parentID: number, comentarioId: number) => {
  const response = await axiosComentariosInstance.patch(`/${publicacionId}/comentario/${parentID}/respuestas/likes/${comentarioId}`);
  return response.data;
};

export const actualizarComentarioDislikes = async (publicacionId: number, comentarioId: number) => {
  const response = await axiosComentariosInstance.patch(`/${publicacionId}/comentario/dislikes/${comentarioId}`);
  return response.data;
};

export const actualizarComentarioRespuestaDislikes = async (publicacionId: number, parentID: number, comentarioId: number) => {
  const response = await axiosComentariosInstance.patch(`/${publicacionId}/comentario/${parentID}/respuestas/dislikes/${comentarioId}`);
  return response.data;
};

export const eliminarComentarioMultimedia = async (comentarioId: number, multimediaId: string) => {
  const response = await axiosComentariosInstance.delete(`/${comentarioId}/multimedia/${multimediaId}`);
  return response.data;
};

export const obtenerMultimedia = async (comentarioId: number, multimediaId: string) => {
  const response = await axiosComentariosInstance.get(`/${comentarioId}/multimedia/${multimediaId}`);
  return response.data;
};

export const modificarArchivo = async (comentarioId: number, multimediaId: string, multimediaDTO: File) => {
  const formData = new FormData();
  formData.append('multimediaDTO', multimediaDTO);

  const response = await axiosComentariosInstance.patch(`/${comentarioId}/multimedia/${multimediaId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};