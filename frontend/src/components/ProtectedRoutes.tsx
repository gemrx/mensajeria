import { useState, useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { checkLoginStatus } from '../api/session';

export default function ProtectedRoutes() {
  const [isLoading, setIsLoading] = useState(true); 
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    async function validateUser() {
      try {
        const response = await checkLoginStatus();
        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Error:', error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    }

    validateUser();
  }, []);

  // Mientras se valida al usuario, puedes mostrar un spinner de carga o un mensaje
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Si esta autenticado, renderiza los child routes, de lo contrario, redirigir al login
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />;
}
