import { createContext, useCallback, useEffect, useState, type ReactNode } from 'react';
import { login as loginRequest } from '../api/authApi';
import { getCurrentUser } from '../api/userApi';
import { getToken, setToken, clearToken } from '../utils/storage';
import type { CurrentUser } from '../types/user';

interface AuthContextValue {
  token: string | null;
  user: CurrentUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setTokenState] = useState<string | null>(() => getToken());
  const [user, setUser] = useState<CurrentUser | null>(null);

  //cargar perfil si hay token guardado
  useEffect(() => {
    let active = true;
    if (token) {
      getCurrentUser()
        .then((u) => {
          if (active) setUser(u);
        })
        .catch(() => {
          //token inválido/expirado, limpiar sesión
          if (active) {
            clearToken();
            setTokenState(null);
            setUser(null);
          }
        });
    } else {
      setUser(null);
    }
    return () => {
      active = false;
    };
  }, [token]);

  const login = useCallback(async (email: string, password: string) => {
    const { token: newToken } = await loginRequest({ email, password });
    setToken(newToken);
    setTokenState(newToken);
    //perfil se carga al cambiar el token
  }, []);

  const logout = useCallback(() => {
    clearToken();
    setTokenState(null);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{ token, user, isAuthenticated: !!token, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
