import { createContext, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import {
  eliminarTrabajadorRequest,
  listarTrabajadoresRequest,
  listarunTrabajadorRequest,
} from "../api/trabajador.api";

export const TrabajadorContext = createContext();

export const useTrabajadores = () => {
  const context = useContext(TrabajadorContext);
  if (!context === undefined) {
    throw new Error("No hay contexto provider");
  }
  return context;
};

export const TrabajadorContextProvider = ({ children }) => {
  const [trabajadores, setTrabajadores] = useState([]);
  const [perfil, setPerfil] = useState({
    usuario: "",
    password: "",
    nombre: "",
    apellidos: "",
    ci: "",
    telefono: "",
    puesto: "",
    direccion: "",
    salario: "",
    foto_perfil: "",
  });

  const params = useParams();

  const loadTrabajadoresContext = async () => {
    try {
      const response = await listarTrabajadoresRequest();

      setTrabajadores(response);
    } catch (error) {}
  };

  const loadTrabajador = async (id_trabajador) => {
    const trabajador = await listarunTrabajadorRequest(id_trabajador);
   
    setPerfil({
      usuario: trabajador.usuario,
      password: trabajador.passwordHash,
      nombre: trabajador.nombre,
      apellidos: trabajador.apellidos,
      ci: trabajador.ci,
      telefono: trabajador.telefono,
      puesto: trabajador.puesto,
      direccion: trabajador.direccion,
      salario: trabajador.salario,
      foto_perfil: trabajador.foto_perfil,
    });
    (e) => {
      setFile(e.target.files[0]);
    };
  };

  const deleteTrabajador = async (id_trabajador) => {
    try {
      eliminarTrabajadorRequest(id_trabajador);
      setTrabajadores(
        trabajadores.filter(
          (trabajador) => trabajador.id_trabajador !== id_trabajador
        )
      );
      alert("Se ha eliminado el trabajador correctamente");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <TrabajadorContext.Provider
      value={{
        deleteTrabajador,
        loadTrabajadoresContext,
        trabajadores,
        perfil,
        loadTrabajador,
      }}
    >
      {children}
    </TrabajadorContext.Provider>
  );
};
