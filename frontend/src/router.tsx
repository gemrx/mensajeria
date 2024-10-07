import { createBrowserRouter } from 'react-router-dom';
import ProtectedRoutes from './components/ProtectedRoutes.tsx';
import Layout from './components/Layout/Layout.tsx';
import Login from './routes/Login/Login.tsx';
import NuevaCorrespondencia from './routes/NuevaCorrespondencia/NuevaCorrespondencia.tsx';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    element: <ProtectedRoutes/>,
    children: [
      {
        element: <Layout />,
        children: [
          {
            path: '/',
            element: <NuevaCorrespondencia />
          },
        ],
      },
    ],
  },
]);

export default router;