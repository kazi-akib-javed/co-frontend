'use client';
import AxiosInstance from '@/axios/config';
import { RefreshTokenUrl } from '@/urls/allUrls';
import { createContext, useContext, useEffect, useState } from 'react';

interface User {
  id: number;
  userId: string;
  firstName: string;
  lastName: string;
  roles: string;
  email: string;
  isUser: boolean;
}

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (user: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  login: () => {},
  logout: () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = async () => {
    setUser(null);
  };

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const res = await AxiosInstance.post(RefreshTokenUrl, {});
        if (res?.data) {
          setUser(res?.data?.payload?.data);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    restoreSession();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
