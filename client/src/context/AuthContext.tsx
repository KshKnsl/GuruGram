import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type User = {
  email: string;
  token: string;
  _id: string;
  role: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (token: string, _id: string, email: string, role: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: () => {},
  logout: () => {},
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const _id = localStorage.getItem("_id");
        const email = localStorage.getItem("email");
        const role = localStorage.getItem("role");

        if (token && _id && email && role) {
          setUser({ token, _id, email, role: role});
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = (token: string, _id: string, email: string, role: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("_id", _id);
    localStorage.setItem("email", email);
    localStorage.setItem("role", role);
    setUser({ token, _id, email, role });
    navigate("/profile");
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("_id");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };