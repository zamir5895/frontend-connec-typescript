'use client';

import { useState, useRef, useEffect } from 'react';
import Navbar from '../../Componentes/Navbar/Navbar';
import Sidebar from '../../Componentes/HomePage/SideBar';
import CrearPublicacion from '../../Componentes/HomePage/CrearPublicacion';
import PostList from '../../Componentes/HomePage/Posts';
import {  obtenerPublicacionesInicio } from '../../Services/Posts/Posts';

interface MultimediaInicioDTO {
  id:string,
  contenidoUrl: string;
  tipo: string;
  fechaCreacion: string;
  }

  interface Post {
    id: number;
    contenido: string;
    cantidadLikes: number;
    cantidadComentarios: number;
    fechaPublicacion: string;
    autorId: number;
    autorNombre: string;
    autorFotoUrl: string;
    multimedia: MultimediaInicioDTO[];
  }

export default function HomePage() {
  const [newPostContent, setNewPostContent] = useState(""); 
  const [showNewPost, setShowNewPost] = useState(true);

  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const lastPostRef = useRef<HTMLDivElement>(null);

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true); // Inicia la carga
      try {
        const response = await obtenerPublicacionesInicio(page, 10);
        const newPosts = response.content.map((post: any) => ({
          id: post.id,
          contenido: post.contenido,
          autorId: post.autorId,
          autorNombre: post.autorNombre,
          autorFotoUrl: post.autorFotoUrl,
          fechaPublicacion: new Date(post.fechaPublicacion).toLocaleDateString(),
          cantidadLikes: post.cantidadLikes,
          cantidadComentarios: post.cantidadComentarios,
          multimedia: post.multimediaInicioDTO.map((media: any) => ({
            id: media.id,
            contenidoUrl: media.contenidoUrl,
            tipo: media.tipo,
            fechaCreacion: media.fechaCreacion,
          })),
        }));
        setPosts((prevPosts) => [...prevPosts, ...newPosts]);
        setHasMore(!response.last);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false); // Finaliza la carga
      }
    };

    fetchPosts();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [page]);

  // Manejar el scroll para cargar más publicaciones
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      !hasMore
    )
      return;
    setPage((prevPage) => prevPage + 1);
  };
// Manejar nueva publicación
const handleNewPostCreated = (newPost: { id: number; contenido: string; autorId: number, autorNombre: string; autorFotoUrl:string, fechaPublicacion:string, cantidadComentarios: number; cantidadLikes: number; multimedia:MultimediaInicioDTO[] }) => {
    const completeNewPost = {
      id: newPost.id,
      contenido: newPost.contenido, // Adaptar al formato de tu estado
      fechaPublicacion: new Date(newPost.fechaPublicacion).toLocaleDateString(),
      cantidadLikes: newPost.cantidadLikes || 0,
      cantidadComentarios: newPost.cantidadComentarios || 0,
      autorNombre: newPost.autorNombre,
      autorFotoUrl: newPost.autorFotoUrl,
      autorId: newPost.autorId,
      multimedia: newPost.multimedia || [] as MultimediaInicioDTO[]
    };
    console.log("Nueva publicación:", completeNewPost);
    setPosts([completeNewPost, ...posts]);
  };
  

  return (
    <div className="w-full">
      <Navbar />
      <div className="flex w-full min-h-screen bg-gray-100 mt-20">
        {/* Sidebar */}
        <Sidebar />

        <main className="flex-grow p-4 w-full">
          <div className="max-w-2xl mx-auto space-y-6 w-full">
            {/* Crear Publicación */}
            <CrearPublicacion
              showNewPost={showNewPost}
              newPostContent={newPostContent}
              setNewPostContent={setNewPostContent}
                onPostCreated={(newPost) => handleNewPostCreated({
                id: newPost.id,
                contenido: newPost.contenido,
                autorId: newPost.autorId,
                autorNombre: newPost.autorNombre,
                autorFotoUrl: newPost.autorFotoUrl,
                fechaPublicacion: new Date(newPost.fechaPublicacion).toLocaleDateString(), // Convert to local date string
                cantidadComentarios: 0,
                cantidadLikes: 0,
                multimedia: newPost.multimedia, 
              })}
            />

              {/* Mostrar indicador de carga o la lista de publicaciones */}
              {loading ? (
                        <p className="text-center text-gray-500">Cargando publicaciones...</p>
                      ) : (
              <PostList posts={posts} lastPostRef={lastPostRef} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
