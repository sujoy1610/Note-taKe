import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import axios from "axios";

interface User {
  name: string;
  email: string;
  dob: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  signUp: (userData: { name: string; dob: string; email: string; otp: string }) => Promise<{ success: boolean; message?: string }>;
  signIn: (email: string, otp: string) => Promise<{ success: boolean; message?: string }>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("hd-user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem("hd-authenticated") === "true";
  });

  useEffect(() => {
    localStorage.setItem("hd-user", JSON.stringify(user));
    localStorage.setItem("hd-authenticated", JSON.stringify(isAuthenticated));
  }, [user, isAuthenticated]);

  const signUp = async (userData: { name: string; dob: string; email: string; otp: string }) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`, userData);
      if (res.data?.user) {
        setUser(res.data.user);
        setIsAuthenticated(true);
        return { success: true };
      }
      return { success: false, message: res.data?.error || "Unknown error" };
    } catch (err: any) {
      return { success: false, message: err.response?.data?.error || err.message };
    }
  };

  const signIn = async (email: string, otp: string) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/signin`, { email, otp });
      if (res.data?.user) {
        setUser(res.data.user);
        setIsAuthenticated(true);
        return { success: true };
      }
      return { success: false, message: res.data?.error || "Unknown error" };
    } catch (err: any) {
      return { success: false, message: err.response?.data?.error || err.message };
    }
  };

  const signOut = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("hd-user");
    localStorage.removeItem("hd-authenticated");
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
