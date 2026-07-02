import axios from 'axios';
import { getToken, clearToken } from '../utils/storage';

const baseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080';

const api = axios.create({ baseURL });

//adjunta el JWT en cada request si existe
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

//si token expira/inválido (401), limpia la sesión y manda al login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      clearToken();
      //no loops si ya estamos en /login
      if (!window.location.pathname.startsWith('/login')) {
        window.location.assign('/login');
      }
    }
    return Promise.reject(error);
  },
);

export default api;
