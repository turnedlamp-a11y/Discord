import { create } from 'zustand';
import axios from 'axios';

interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  banner?: string;
  status: 'online' | 'idle' | 'dnd' | 'offline';
  statusMessage?: string;
}

interface AuthStore {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  signup: (email: string, username: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  fetchCurrentUser: () => Promise<void>;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const axiosInstance = axios.create({
  baseURL: API_URL,
});

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  token: localStorage.getItem('token'),
  loading: false,
  error: null,

  signup: async (email, username, password) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.post('/api/auth/signup', {
        email,
        username,
        password,
      });
      set({ token: response.data.token, user: response.data.user });
      localStorage.setItem('token', response.data.token);
    } catch (error: any) {
      set({ error: error.response?.data?.error || 'Signup failed' });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.post('/api/auth/login', {
        email,
        password,
      });
      set({ token: response.data.token, user: response.data.user });
      localStorage.setItem('token', response.data.token);
    } catch (error: any) {
      set({ error: error.response?.data?.error || 'Login failed' });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  logout: () => {
    set({ user: null, token: null });
    localStorage.removeItem('token');
  },

  fetchCurrentUser: async () => {
    const token = get().token;
    if (!token) return;

    try {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const response = await axiosInstance.get('/api/auth/me');
      set({ user: response.data });
    } catch (error) {
      console.error('Failed to fetch user:', error);
      set({ user: null, token: null });
      localStorage.removeItem('token');
    }
  },
}));
