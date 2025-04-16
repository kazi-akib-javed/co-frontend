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
  accessToken: string;
}

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  isMounted: boolean;
  login: (user: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  isMounted: false,
  login: () => {},
  logout: () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  useEffect(() => {
    const user = localStorage.getItem('user');
    if(user){
      setUser(JSON.parse(user));
    }
    setIsLoading(false);
    setIsMounted(true); // Only render once things are fully initialized
  }, []);

  return (
    <AuthContext.Provider value={{ user, isMounted,isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
