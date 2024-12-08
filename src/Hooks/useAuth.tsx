import { useState, useEffect } from 'react';
import { autentificar } from '../Services/Auth/authservice';
import { logout as servicelogout } from '../Services/Auth/authservice';

const TOKEN_KEY = 'authToken';
const ROLE_KEY = 'userRole';
const USER_KEY = 'userData';

interface User {
  userId: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  role: string;
  fotoPerfil: string;
  userName: string;
}

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthAttempted, setIsAuthAttempted] = useState(false); // Control de autenticación única

  useEffect(() => {
    // Evita reintentos si ya se ha intentado autenticar
    if (isAuthAttempted) return;

    const token = getToken();
    const role = getRole();
    const storedUser = getUser();

    if (token && !storedUser) {
      setIsAuthAttempted(true); // Marcamos que se ha intentado la autenticación
      autentificar(token)
        .then((data) => {
          setUser(data);
          setIsAuthenticated(true);
          setUserRole(role);
          localStorage.setItem(USER_KEY, JSON.stringify(data));
          console.log('Usuario autentificado:', data);
        })
        .catch((error) => {
          console.error('Error al autentificar el usuario:', error);
          clearAuthData();
        });
    } else if (storedUser) {
      setUser(storedUser);
      setIsAuthenticated(true);
      setUserRole(role);
      setIsAuthAttempted(true); // Evita la autenticación adicional si el usuario ya está en localStorage
    }
  }, []); // Solo ejecuta el efecto una vez

  const clearAuthData = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ROLE_KEY);
    localStorage.removeItem(USER_KEY);
    setIsAuthenticated(false);
    setUserRole(null);
    setUser(null);
    setIsAuthAttempted(false);
  };

  const getToken = () => localStorage.getItem(TOKEN_KEY);
  const getRole = () => localStorage.getItem(ROLE_KEY);
  const getUser = () => {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  };

  const saveAuthData = (token: string, role: string) => {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(ROLE_KEY, role);
    setIsAuthenticated(true);
    setUserRole(role);

    autentificar(token)
      .then((data) => {
        setUser(data);
        localStorage.setItem(USER_KEY, JSON.stringify(data));
      })
      .catch((error) => {
        console.error('Error al guardar los datos de autenticación:', error);
        clearAuthData();
      });
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem(TOKEN_KEY);
      if (token) {
        await servicelogout(token);
      }
    } catch (error) {
      console.log("Error al cerrar sesión:", error);
    } finally {
      clearAuthData();
      console.log("Token después de logout:", localStorage.getItem(TOKEN_KEY));
    }
  };

  return {
    isAuthenticated,
    userRole,
    user,
    userId: user?.userId,
    fullName: user?.fullName,
    email: user?.email,
    phoneNumber: user?.phoneNumber,
    fotoPerfil: user?.fotoPerfil,
    userName: user?.userName,
    saveAuthData,
    getToken,
    getRole,
    getUser,
    logout,
  };
};
