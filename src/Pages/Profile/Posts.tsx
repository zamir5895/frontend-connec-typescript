import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../Componentes/Profile/Card';
import Button from '../../Componentes/Profile/Button';
import { ThumbsUp, MessageCircle, Share2 } from 'lucide-react';

interface PostsContentProps {
  userInfo: {
    name: string;
    profilePicture: string;
  };
}

const PostsContent: React.FC<PostsContentProps> = ({ userInfo }) => {
  return (
    <div>
      {[...Array(20)].map((_, i) => (
        <Card key={i}>
          <CardHeader>
            <CardTitle>{userInfo.name}</CardTitle>
            <CardDescription>Hace {i + 1} horas</CardDescription>
          </CardHeader>
          <CardContent>Contenido de la publicación {i + 1}</CardContent>
          <CardFooter>
            <Button variant="ghost">
              <ThumbsUp className="mr-2 h-4 w-4" /> Me gusta
            </Button>
            <Button variant="ghost">
              <MessageCircle className="mr-2 h-4 w-4" /> Comentar
            </Button>
            <Button variant="ghost">
              <Share2 className="mr-2 h-4 w-4" /> Compartir
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default PostsContent;