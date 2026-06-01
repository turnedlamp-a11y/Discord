import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/auth';
import { useChatStore } from './store/chat';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ChatPage from './pages/ChatPage';
import ProfilePage from './pages/ProfilePage';
import NitroPage from './pages/NitroPage';
import Loader from './components/Loader';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, token } = useAuthStore();
  return user && token ? <>{children}</> : <Navigate to="/login" replace />;
};

function App() {
  const { token, fetchCurrentUser, user } = useAuthStore();
  const { initializeSocket } = useChatStore();

  useEffect(() => {
    if (token) {
      fetchCurrentUser();
    }
  }, [token, fetchCurrentUser]);

  useEffect(() => {
    if (user) {
      initializeSocket(user.id);
    }
  }, [user, initializeSocket]);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route
        path="/chat"
        element={
          <ProtectedRoute>
            <ChatPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/nitro"
        element={
          <ProtectedRoute>
            <NitroPage />
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Navigate to={user ? '/chat' : '/login'} replace />} />
    </Routes>
  );
}

export default App;
