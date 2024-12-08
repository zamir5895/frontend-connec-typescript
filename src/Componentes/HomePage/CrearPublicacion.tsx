import React, { useRef, useState } from "react";
import Card from "./Card";
import { CardHeader, CardContent, CardFooter } from "../Profile/Card";
import { Avatar, AvatarImage, AvatarFallback } from "../Navbar/Avatar";
import Textarea from "../Profile/TextArea";
import Button from "../Profile/Button";
import { ImageIcon, Smile, Send, X } from "lucide-react";
import { useAuth } from "../../Hooks/useAuth";
import { crearPublicacionInicio, subirArchivos } from "../../Services/Posts/Posts";

interface CrearPublicacionProps {
  showNewPost: boolean;
  newPostContent: string;
  setNewPostContent: React.Dispatch<React.SetStateAction<string>>;
  onPostCreated: (newPost: {
    id: number;
    contenido: string;
    autorId: number;
    autorNombre: string;
    autorFotoUrl: string;
    fechaPublicacion: string;
    cantidadComentarios: number;
    cantidadLikes: number;
    multimedia: MultimediaInicioDTO[];
  }) => void;
}
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

const CrearPublicacion: React.FC<CrearPublicacionProps> = ({
  showNewPost,
  newPostContent,
  setNewPostContent,
  onPostCreated,
}) => {
  if (!showNewPost) return null;

  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isPublishing, setIsPublishing] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const user = useAuth();

  const handleTextareaResize = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles([...files, ...Array.from(event.target.files)]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handlePublish = async () => {
    if (!newPostContent.trim() && files.length === 0) return;
  
    setIsPublishing(true);
  
    try {
      console.log("Creando publicación...");
      console.log("autorId:", user?.userId);
      const postInicioDTO: PostInicioDTO = { cuerpo: newPostContent, autorPId: user?.userId || 0 };
      const post = await crearPublicacionInicio(postInicioDTO);
      console.log("Publicación creada:", post);
  
      let multimedia: MultimediaInicioDTO[] = [];
      if (files.length > 0) {
        const response = await subirArchivos(post.id, files);
        console.log("Archivos subidos:", response);
        if (response && response.multimediaInicioDTO) {
          multimedia = response.multimediaInicioDTO.map((file: any) => ({
            id: file.id,
            contenidoUrl: file.contenidoUrl,
            tipo: file.tipo,
            fechaCreacion: file.fechaCreacion,
          })); // Map the response to MultimediaInicioDTO[]
        }
      }
  
      const newPost = {
        id: post.id,
        contenido: postInicioDTO.cuerpo,
        autorId: user?.userId || 0,
        autorNombre: user?.fullName || "Usuario",
        autorFotoUrl : user?.fotoPerfil || "/default-profile.png",
        fechaPublicacion: new Date(post.fechaPublicacion).toLocaleDateString(), // Convert to local date string
        cantidadComentarios: 0,
        cantidadLikes: 0,

        multimedia, // Set multimedia if files were uploaded
      };
      console.log("Nueva publicación en la creacion:", newPost);
      // Limpiar contenido y archivos seleccionados
      setNewPostContent("");
      setFiles([]);
  
      onPostCreated(newPost);
    } catch (error) {
      console.error("Error durante la publicación:", error);
    } finally {
      setIsPublishing(false);
    }
  };
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Card className="transition-all duration-300">
      <CardHeader>
        <h2 className="text-lg font-semibold">Crear publicación</h2>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <div className="flex items-start space-x-4">
            <Avatar>
              <AvatarImage
                src={user?.fotoPerfil || "/default-profile.png"}
                alt="foto de perfil"
              />
              <AvatarFallback>{user?.fullName}</AvatarFallback>
            </Avatar>
            <Textarea
              ref={textareaRef}
              placeholder="¿Qué estás pensando?"
              value={newPostContent}
              onChange={(e) => {
                setNewPostContent(e.target.value);
                handleTextareaResize();
              }}
              onInput={handleTextareaResize}
              className="flex-grow resize-none border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-shadow"
            />
          </div>
          <div className="flex space-x-2">
        <input
          type="file"
          multiple
          ref={fileInputRef}
          onChange={handleFileChange}
          id="file-upload"
          className="hidden"
        />
        <Button variant="ghost" size="sm" onClick={handleButtonClick}>
          <ImageIcon className="mr-2 h-4 w-4" />
          Foto/Video
        </Button>
        <Button variant="ghost" size="sm">
          <Smile className="mr-2 h-4 w-4" />
          Sentimiento
        </Button>
      </div>

          {/* Vista previa de archivos */}
          {files.length > 0 && (
            <div className="space-y-2">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 border rounded-md"
                >
                  <span className="text-sm truncate">{file.name}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div />
        <Button
          onClick={handlePublish}
          disabled={isPublishing || (!newPostContent.trim() && files.length === 0)}
        >
          {isPublishing ? "Publicando..." : <Send className="mr-2 h-4 w-4" />}
          Publicar
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CrearPublicacion;
  