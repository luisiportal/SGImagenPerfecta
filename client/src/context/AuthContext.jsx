import React, { createContext, useEffect } from "react";
import { useState, useContext } from "react";

import Cookies from "js-cookie";
import {
  loginRequest,
  logoutRequest,
  verifyTokenRequest,
} from "../api/login.api";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth debe ser utilizado dentro de un AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState(null);
  const [loading] = useState(false);

  const login = async (user) => {
    try {
      const { data } = await loginRequest(user);
      setIsAuthenticated(true);
      setUser({
        id_trabajador: data.id_trabajador,
        usuario: data.usuario,
        foto_perfil: data.foto_perfil,
        rol: data.rol,
      });
      return data;
    } catch (error) {
      return error;
    }
  };

  const updateUserProfile = (newProfileData, showNotification) => {
    setUser((prev) => ({
      ...prev,
      ...newProfileData,
    }));
    if (showNotification) {
      showNotification("Perfil actualizado correctamente");
    }
  };

  const logout = async (user) => {
    try {
      const res = await logoutRequest();
      setUser(res.data);
      setIsAuthenticated(false);
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  useEffect(() => {
    async function checkLogin() {
      const cookies = Cookies.get();

      if (cookies.token) {
        const { data } = await verifyTokenRequest(cookies.token);
        setIsAuthenticated(true);
        setUser({
          ...data,
          rol: data.rol,
        });
      }
    }
    checkLogin();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        logout,
        errors,
        login,
        loading,
        setIsAuthenticated,
        user,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
