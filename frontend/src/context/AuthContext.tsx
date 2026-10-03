import type { LoginData, RegisterData, Pengguna } from "@/types/types";
import { createContext, useContext, useState } from "react";

interface AuthContextType {
  loggedIn: boolean;
  register: (data: RegisterData) => Promise<void>;
  login: (data: LoginData) => Promise<void>;
  logout: () => void;
  user: Pengguna | null;
  getCurrentUser: () => Promise<void>;
  updateProfile: (data: {
    nama: string;
    alamat: string;
    no_telepon: string;
    email: string;
  }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });

  const [user, setUser] = useState<Pengguna | null>(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = async (data: LoginData) => {
    const response = await fetch("http://127.0.0.1:8000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Login gagal");
    }

    localStorage.setItem("token", result.token);
    localStorage.setItem("user", JSON.stringify(result.data));

    localStorage.setItem("isLoggedIn", "true");
    setLoggedIn(true);
    setUser(result.data);
  };

  const register = async (data: RegisterData) => {
    const response = await fetch("http://127.0.0.1:8000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Registrasi gagal");
    }

    localStorage.setItem("isLoggedIn", "true");
    setLoggedIn(true);
    localStorage.setItem("user", JSON.stringify(result.data));
    setUser(result.data);
  };

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    setLoggedIn(false);
  };

  const getCurrentUser = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }

    const response = await fetch("http://127.0.0.1:8000/api/dashboard", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Gagal mengambil data user");
    }

    localStorage.setItem("user", JSON.stringify(result.data));
    setUser(result.data);
  };

  const updateProfile = async (data: {
    nama: string;
    alamat: string;
    no_telepon: string;
    email: string;
  }) => {
    if (!user) {
      throw new Error("Data pengguna tidak ditemukan");
    }

    const response = await fetch(
      `http://127.0.0.1:8000/api/pengguna/${user.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(data),
      },
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Gagal memperbarui profil");
    }

    localStorage.setItem("user", JSON.stringify(result.data));
    setUser(result.data);
  };

  return (
    <AuthContext.Provider
      value={{
        loggedIn,
        user,
        login,
        logout,
        register,
        getCurrentUser,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// The hook intentionally shares this context module with the provider.
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth harus dipakai di dalam AuthProvider");
  }
  return context;
};
