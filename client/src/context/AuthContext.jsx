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
  if (!context) {
    console.error("useAuth debe usarse dentro de AuthProvider"); // [1] Error si no hay contexto
    throw new Error("useAuth debe ser utilizado dentro de un AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("Estado de autenticación actualizado:", {
      isAuthenticated,
      user,
    }); // [2] Log estado global
  }, [isAuthenticated, user]);

  useEffect(() => {
    if (errors.length > 0) {
      console.log("Errores de autenticación:", errors); // [3] Log de errores
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  const login = async (userCredentials) => {
    console.log("Iniciando login con credenciales:", {
      usuario: userCredentials.usuario,
    }); // [4] Log credenciales (sin password)
    setLoading(true);
    setErrors([]);
    try {
      const data = await loginRequest(userCredentials);
      console.log("Respuesta del backend (login):", data); // [5] Log respuesta del backend

      setIsAuthenticated(true);
      const userData = {
        id_usuario: data.id_usuario,
        id_trabajador: data.id_trabajador,
        usuario: data.usuario,
        foto_perfil: data.foto_perfil,
        ...(data.nombre && { nombre: data.nombre }),
      };
      setUser(userData);

      console.log("Usuario establecido en contexto:", userData); // [6] Log datos del usuario
      setLoading(false);
      return { success: true };
    } catch (error) {
      console.error("Error en login:", error); // [7] Log de error detallado
      setLoading(false);
      const errorMessage = error?.message || "Ocurrió un error inesperado";
      setErrors([errorMessage]);
      return { success: false, message: errorMessage };
    }
  };

  const updateUserProfile = (newProfileData) => {
    console.log("Actualizando perfil del usuario:", newProfileData); // [8] Log de actualización
    setUser((prev) => ({
      ...prev,
      ...newProfileData,
    }));
  };

  const logout = async () => {
    console.log("Ejecutando logout..."); // [9] Log inicio de logout
    setLoading(true);
    try {
      await logoutRequest();
      console.log("Logout exitoso, limpiando estado"); // [10] Log confirmación
      setUser(null);
      setIsAuthenticated(false);
      setErrors([]);
    } catch (error) {
      console.error("Error en logout:", error); // [11] Log error en logout
      setErrors(["Error al cerrar sesión."]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    async function checkLogin() {
      console.log("Verificando autenticación al montar el componente..."); // [12] Log inicial
      setLoading(true);
      const cookies = Cookies.get();
      console.log("Cookies encontradas:", Object.keys(cookies)); // [13] Log cookies (sin token)

      if (!cookies.token) {
        console.log("No hay token en cookies, usuario no autenticado"); // [14] Log sin token
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        console.log("Verificando token con el backend..."); // [15] Log antes de verifyToken
        const data = await verifyTokenRequest();
        console.log("Token verificado, datos recibidos:", data); // [16] Log respuesta verifyToken

        setIsAuthenticated(true);
        const userData = {
          id_usuario: data.id_usuario,
          id_trabajador: data.id_trabajador,
          usuario: data.usuario,
          foto_perfil: data.foto_perfil,
        };
        setUser(userData);
        console.log("Usuario reautenticado desde token:", userData); // [17] Log datos reautenticados
      } catch (error) {
        console.error("Error al verificar token:", error); // [18] Log error verifyToken
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setLoading(false);
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
        user,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
