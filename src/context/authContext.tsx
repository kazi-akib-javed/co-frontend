'use client'
import { cookies } from "next/headers";
import { createContext, useContext, useState, useEffect } from "react";

interface User {
    id: number;
    userId: string;
    firstName: string;
    lastName: string;
    roles: '';
    email: string;
    accessToken: string;
    isUser: boolean;
}

type AuthContextType = {
  user: User | null;
  login: (user: any) => void;
  logout: () => void;
};

const authContextDefaultValues: AuthContextType = {
  user: null,
  login: () => {},
  logout: () => {},
};

const AuthContext = createContext<AuthContextType>(authContextDefaultValues);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children } : Readonly<{
    children: React.ReactNode;
  }>) {
  const [user, setUser] = useState<User | any>(null);

  const login = (user: any) => {
    setUser(user);
    localStorage.setItem('access-token',user.accessToken);
  };

  const logout = () => {
    // Clear user data and session
    localStorage.removeItem('access-token');
    setUser(null);
  };

  useEffect(() => {
    // Check for existing user session on initial render
    const storedUser = localStorage.getItem('access-token');
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const value = {
    user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}