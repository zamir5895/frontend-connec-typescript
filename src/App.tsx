import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthPage from './Pages/AuthPage';
import ChatPage from './Pages/Chat/ChatPage';
import Profile from './Pages/Profile/Profile';
import HomePage from './Pages/HomePage/HomePage';

const Dashboard = lazy(() => import('./Pages/dashborad'));

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Suspense fallback={<div>Cargando...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<div>404 - Página no encontrada</div>} />
            <Route path="/mensajes" element={<ChatPage />} />
            <Route path="/profile/:usuarioId*" element={<Profile />} />
            <Route path='/home' element={<HomePage />} />
            </Routes>
        </Suspense>
      </div>
    </Router>
  );
};

const Home: React.FC = () => (
  <div className="text-center">
    <h1 className="text-4xl font-bold text-gray-800">Bienvenido a la App</h1>
    <p className="mt-2 text-gray-600">Navega a la página de registro para comenzar.</p>
  </div>
);

export default App;