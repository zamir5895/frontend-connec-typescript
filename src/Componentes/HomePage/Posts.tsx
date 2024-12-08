import React, { useState } from 'react';
import Modal from './Modal'; // Componente Modal (explicado más adelante)
import Card from './Card';
import { CardHeader, CardContent, CardFooter } from '../Profile/Card';
import { Avatar, AvatarImage } from '../Navbar/Avatar';
import Button from '../Profile/Button';
import { ThumbsUp, MessageCircle } from 'lucide-react';
import Carousel from './CarruselImages';

interface MultimediaInicioDTO {
  id: string;
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

interface PostListProps {
  posts: Post[];
  lastPostRef: React.RefObject<HTMLDivElement>;
}

const PostList: React.FC<PostListProps> = ({ posts, lastPostRef }) => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const openModal = (post: Post) => {
    setSelectedPost(post);
  };

  const closeModal = () => {
    setSelectedPost(null);
  };

  return (
    <>
      {posts.map((post, index) => (
        <Card
          key={post.id}
          className="mb-6 cursor-pointer"
          ref={index === posts.length - 1 ? lastPostRef : null}
          onClick={() => openModal(post)}
        >
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage
                  src={post.autorFotoUrl || '/default-profile.png'}
                  alt={post.autorNombre}
                />
              </Avatar>
              <div>
                <p className="font-semibold">{post.autorNombre}</p>
                <p className="text-sm text-gray-500">{post.fechaPublicacion}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p>{post.contenido}</p>
            {post.multimedia.length > 0 && <Carousel multimedia={post.multimedia} />}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="ghost" size="sm">
              <ThumbsUp className="mr-2 h-4 w-4" />
              {post.cantidadLikes}
            </Button>
            <Button variant="ghost" size="sm">
              <MessageCircle className="mr-2 h-4 w-4" />
              {post.cantidadComentarios}
            </Button>
          </CardFooter>
        </Card>
      ))}

      {/* Modal */}
      {selectedPost && (
        <Modal onClose={closeModal}>
          <div className="p-6">
            <h2 className="text-xl font-bold">{selectedPost.autorNombre}</h2>
            <p className="text-sm text-gray-500">{selectedPost.fechaPublicacion}</p>
            <p className="mt-4">{selectedPost.contenido}</p>
            {selectedPost.multimedia.length > 0 && (
              <Carousel multimedia={selectedPost.multimedia} />
            )}
          </div>
        </Modal>
      )}
    </>
  );
};

export default PostList;
