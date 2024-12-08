import { axiosPublicacionesInstance } from '../AxiosConfig';

interface PostInicioDTO {
  cuerpo: string;
  autorPId: number;
}

interface MultimediaInicioDTO {
    id:string,
    contenidoUrl: string;
    tipo: string;
    fechaCreacion: string;
    }


interface PublicacionInicioResponseDTO {
  id: number;
  contenido: string;
  cantidadLikes: number;
  cantidadComentarios: number;
  fechaPublicacion: string;
  autorId: number;
  multimedia: MultimediaInicioDTO[];
}

interface AmigosDTO {
    usersId: number[];
}

export const crearPublicacionInicio = async (postInicioDTO: PostInicioDTO) => {
  try {
    console.log("Datos enviados:", postInicioDTO);

    const response = await axiosPublicacionesInstance.post('/', postInicioDTO, {
      headers: {
        'Content-Type': 'application/json', 
      },
    });
    return response.data; 
  } catch (error) {
    console.error('Error al crear la publicación:', error);
    throw error;
  }
};
export const subirArchivos = async (postId: number, multimedia: File[]) => {
  try {
    const formData = new FormData();
    multimedia.forEach((file) => {
      console.log("Adjuntando archivo:", file.name);
      formData.append('files', file);
    });

    const response = await axiosPublicacionesInstance.post(`/subir-archivos/${postId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log("Archivos subidos con éxito 2.", response);
    console.log("Archivos subidos con éxito  2 .", response.data);
    console.log("Archivos subidos con éxito 4.");
    return response.data;
  } catch (error) {
    console.error('Error al subir los archivos:', error);
    throw error;
  }
};


export const obtenerPublicacionInicio = async (publicacionId: number) => {
  const response = await axiosPublicacionesInstance.get(`/${publicacionId}`);
  return response.data;
};

export const eliminarPublicacion = async (publicacionId: number) => {
  const response = await axiosPublicacionesInstance.delete(`/${publicacionId}`);
  return response.data;
};

export const obtenerPublicacionesUsuario = async (usuarioId: number, page: number, size: number) => {
  const response = await axiosPublicacionesInstance.get(`/usuario/${usuarioId}`, {
    params: { page, size },
  });
  return response.data;
};

export const cambiarContenido = async (usuarioId: number, publicacionId: number, contenido: string) => {
  const response = await axiosPublicacionesInstance.patch(`/${usuarioId}/${publicacionId}/contenido`, null, {
    params: { contenido },
  });
  return response.data;
};

export const cambiarMultimedia = async (usuarioId: number, publicacionId: number, multimedia: File[]) => {
  const formData = new FormData();
  multimedia.forEach((file) => formData.append('file', file));

  const response = await axiosPublicacionesInstance.patch(`/${usuarioId}/${publicacionId}/multimedia`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const buscarPublicaciones = async (palabraClave: string, page: number, size: number) => {
  const response = await axiosPublicacionesInstance.get('/buscar', {
    params: { palabraClave, page, size },
  });
  return response.data;
};

export const obtenerPublicacionesInicio = async (page: number, size: number) => {
  const response = await axiosPublicacionesInstance.get('', {
    params: { page, size },
  });
  console.log("Publicaciones obtenidas con éxito:", response.data);
  return response.data;
};

export const obtenerPublicaciones = async (amigosDTO: AmigosDTO, page: number, size: number) => {
  const response = await axiosPublicacionesInstance.get('/feed/publicaciones/', {
    params: { ...amigosDTO, page, size },
  });
  return response.data;
};