import React, { useEffect } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../Componentes/Profile/Card';
import { MapPin, Briefcase, Mail, Phone, MoreHorizontal } from 'lucide-react';
import Button from '../../Componentes/Navbar/Button';
import { useAuth } from '../../Hooks/useAuth';
import { getDireccionInformation, getUserById } from '../../Services/User/userService';

interface InfoContentProps {
  bio?: string;
  id: number;
}

const InfoContent: React.FC<InfoContentProps> = ({ id }) => {
  console.log("infoContent", id);
  const [isEditing, setIsEditing] = React.useState(false);
  const [editMode, setEditMode] = React.useState<'all' | 'partial'>('all');
  const [edit, setEdit] = React.useState(false);
  const [userProfile, setUserProfile] = React.useState<any>(null);
  const [direccionInfo, setDireccionInfo] = React.useState<any>(null);
  const [isSameUser, setIsSameUser] = React.useState(false);
  const usuario = useAuth();

  useEffect(() => {
    if (id !== undefined) {
      getUserById(id).then((res) => {
        setUserProfile(res);
      });
      getDireccionInformation(id).then((res) => {
        setDireccionInfo(res);
      });
    
    }
  }, [id]);
  useEffect(() => {
    if (usuario.userId && userProfile?.id) {
      setIsSameUser(usuario.userId === userProfile.id);
    }
  }, [id, userProfile]);

  if (!userProfile) {
    return (
      <Card>
        <CardContent>
          <p className="text-center text-gray-500">No se pudo cargar la información del usuario.</p>
        </CardContent>
      </Card>
    );
  }
  
  console.log("userProfile", userProfile);

  return (
    <Card>
     <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl font-semibold">Información Personal</CardTitle>
          {isSameUser && (
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setEdit((prev) => !prev)}
              >
                <MoreHorizontal className="h-5 w-5" />
              </Button>
              {edit && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md z-10">
                  <div
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setIsEditing(true);
                      setEditMode('all');
                      setEdit(false); // Cerrar menú
                    }}
                  >
                    Editar todo
                  </div>
                  <div
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setIsEditing(true);
                      setEditMode('partial');
                      setEdit(false); // Cerrar menú
                    }}
                  >
                    Editar parcialmente
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <div>
            {editMode === 'all' && (
              <div className="space-y-4">
                {/* Formulario para editar toda la información */}
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-gray-500 mr-2" />
                  <input
                    type="text"
                    defaultValue={userProfile?.pais || ''}
                    className="border rounded p-1"
                  />
                </div>
                <div className="flex items-center">
                  <Briefcase className="h-5 w-5 text-gray-500 mr-2" />
                  <input
                    type="text"
                    defaultValue={userProfile?.descripcion || ''}
                    className="border rounded p-1"
                  />
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-gray-500 mr-2" />
                  <input
                    type="text"
                    defaultValue={userProfile?.email || ''}
                    className="border rounded p-1"
                  />
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-gray-500 mr-2" />
                  <input
                    type="text"
                    defaultValue={userProfile?.telefono || ''}
                    className="border rounded p-1"
                  />
                </div>
              </div>
            )}
            {editMode === 'partial' && (
              <div className="space-y-4">
                {/* Formulario para editar parcialmente */}
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-gray-500 mr-2" />
                  <input
                    type="text"
                    defaultValue={userProfile?.pais || ''}
                    className="border rounded p-1"
                  />
                </div>
              </div>
            )}
            <Button variant="ghost" onClick={() => setIsEditing(false)}>
              Guardar
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {userProfile?.pnombre && (
              <div className="flex items-center">
                <span>{userProfile.pnombre}</span>
              </div>
            )}
            {userProfile?.snombre && (
              <div className="flex items-center">
                <span>{userProfile.snombre}</span>
              </div>
            )}
            {userProfile?.papellido && (
              <div className="flex items-center">
                 <span>{userProfile.papellido}</span>
              </div>
            )}
            {userProfile?.sapellido && (
              <div className="flex items-center">
                <span>{userProfile.sapellido}</span>
              </div>
            )}
             {userProfile?.telefono && (
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-gray-500 mr-2" />
                <span>{userProfile.telefono}</span>
              </div>
            )}
             {userProfile?.mail && (
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-gray-500 mr-2" />
                <span>{userProfile.email}</span>
              </div>
            )}
             {userProfile?.genero && (
              <div className="flex items-center">
                <span>{userProfile.genero}</span>
              </div>
            )}
             {userProfile?.pais && (
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-gray-500 mr-2" />
                <span>{userProfile.pais}</span>
              </div>
            )}
              {userProfile?.ciudad && (
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-gray-500 mr-2" />
                <span>{userProfile.ciudad}</span>
              </div>
            )}
              {userProfile?.direccion && (
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-gray-500 mr-2" />
                <span>{userProfile.direccion}</span>
              </div>
            )}
             {userProfile?.fechaNacimiento && (
              <div className="flex items-center">
                <span>{userProfile.fechaNacimiento}</span>
              </div>
            )}
            
            
          </div>
        )}
      </CardContent>
      <CardFooter>
        {userProfile?.descripcion && <p className="text-sm text-gray-600">{userProfile.descripcion}</p>}
      </CardFooter>
    </Card>
  );
};

export default InfoContent;
