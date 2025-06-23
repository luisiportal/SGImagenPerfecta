import React from "react";
import { useAuth } from "../context/AuthContext";
import Login from "../components/LoginForm";
import { useEffect } from "react";
import PerfilTrabajador from "../components/Trabajador/PerfilTrabajador";
const Trabajador = () => {
  const { isAuthenticated } = useAuth();
  useEffect(() => {}, [isAuthenticated]);

  return (
    <>
      {isAuthenticated ? (
        <PerfilTrabajador></PerfilTrabajador>
      ) : (
        <Login></Login>
      )}
    </>
  );
};

export default Trabajador;
