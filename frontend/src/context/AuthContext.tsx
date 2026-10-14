import type {
  LoginData,
  RegisterData,
  Pengguna,
  DashboardData,
  LanggananData,
  UpdateProfile,
} from "@/types/types";
import { createContext, useContext, useState } from "react";

interface AuthContextType {
  loggedIn: boolean;
  register: (data: RegisterData) => Promise<void>;
  login: (data: LoginData) => Promise<void>;
  logout: () => void;
  user: Pengguna | null;
  dashboard: DashboardData | null;
  langganan: LanggananData[];
  getCurrentUser: () => Promise<void>;
  getLangganan: () => Promise<void>;
  updateProfile: (data: UpdateProfile) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });

  const [dashboard, setDashboard] = useState<DashboardData | null>(null);

  const [langganan, setLangganan] = useState<LanggananData[]>([]);

  const [user, setUser] = useState<Pengguna | null>(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = async (data: LoginData) => {
    const response = await fetch(`${import.meta.env.VITE_REACT_API_URL}/login`, {
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
    const response = await fetch(`${import.meta.env.VITE_REACT_API_URL}/register`, {
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

    const response = await fetch(`${import.meta.env.VITE_REACT_API_URL}/dashboard`, {
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

    const dashboardData = result.data;

    localStorage.setItem("user", JSON.stringify(dashboardData.pengguna));

    setUser(dashboardData.pengguna);
    setDashboard(dashboardData);
  };

  const updateProfile = async (data: UpdateProfile) => {
    if (!user) {
      throw new Error("Data pengguna tidak ditemukan");
    }

    const response = await fetch(
      `${import.meta.env.VITE_REACT_API_URL}/pengguna/${user.id}`,
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

  const getLangganan = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }

    const response = await fetch(`${import.meta.env.VITE_REACT_API_URL}/me/langganan`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Gagal mengambil data langganan");
    }

    setLangganan(result.data.langganan ?? []);
  };

  return (
    <AuthContext.Provider
      value={{
        loggedIn,
        user,
        login,
        logout,
        register,
        dashboard,
        getCurrentUser,
        updateProfile,
        langganan,
        getLangganan,
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
