import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import {
  eliminarTrabajadorRequest,
  listarTrabajadoresRequest,
  listarunTrabajadorRequest,
} from "../api/trabajador.api";
import { useAuth } from "./AuthContext";

export const TrabajadorContext = createContext();

export const useTrabajadores = () => {
  const context = useContext(TrabajadorContext);
  if (!context) {
    throw new Error(
      "useTrabajadores must be used within a TrabajadorContextProvider"
    );
  }
  return context;
};

export const TrabajadorContextProvider = ({ children }) => {
  const [trabajadores, setTrabajadores] = useState([]);
  const [perfil, setPerfil] = useState({
    id_trabajador: "",
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
  const [perfilUsuario, setPerfilUsuario] = useState(null);
  const [notificacion, setNotification] = useState({
    show: false,
    message: "",
    type: "success", // 'success' o 'error'
  });

  const { isAuthenticated, user } = useAuth();

  const loadTrabajadoresContext = useCallback(async () => {
    try {
      const response = await listarTrabajadoresRequest();
      setTrabajadores(response);
    } catch (error) {
      console.error("Error cargando trabajadores en el contexto:", error);
      setTrabajadores([]);
    }
  }, []);

  const loadTrabajador = useCallback(async (id_trabajador) => {
    if (!id_trabajador) {
      setPerfil({
        id_trabajador: "",
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
      return;
    }

    try {
      const trabajador = await listarunTrabajadorRequest(id_trabajador);
      if (trabajador) {
        setPerfil({
          id_trabajador: trabajador.id_trabajador,
          usuario: trabajador.usuario,
          password: "",
          nombre: trabajador.nombre,
          apellidos: trabajador.apellidos,
          ci: trabajador.ci,
          telefono: trabajador.telefono,
          puesto: trabajador.puesto,
          direccion: trabajador.direccion,
          salario: trabajador.salario,
          foto_perfil: trabajador.foto_perfil,
        });
      } else {
        console.warn(
          `Trabajador con ID ${id_trabajador} no encontrado o error en la API.`
        );
        setPerfil({
          id_trabajador: "",
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
      }
    } catch (error) {
      console.error("Error al cargar un trabajador específico:", error);
      setPerfil({
        id_trabajador: "",
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
    }
  }, []);

  const loadPerfilUsuario = useCallback(async (id_trabajador) => {
    try {
      const trabajador = await listarunTrabajadorRequest(id_trabajador);
      if (trabajador) {
        const newProfile = {
          id_trabajador: trabajador.id_trabajador,
          usuario: trabajador.usuario,
          nombre: trabajador.nombre,
          apellidos: trabajador.apellidos,
          ci: trabajador.ci,
          telefono: trabajador.telefono,
          puesto: trabajador.puesto,
          direccion: trabajador.direccion,
          salario: trabajador.salario,
          foto_perfil: trabajador.foto_perfil,
        };
        setPerfilUsuario(newProfile);
        return newProfile;
      }
      return null;
    } catch (error) {
      console.error(
        "Error al cargar el perfil del usuario autenticado:",
        error
      );
      setPerfilUsuario(null);
      return null;
    }
  }, []);

  const deleteTrabajador = async (id_trabajador) => {
    try {
      await eliminarTrabajadorRequest(id_trabajador);
      setTrabajadores(
        trabajadores.filter(
          (trabajador) => trabajador.id_trabajador !== id_trabajador
        )
      );
    } catch (error) {
      console.error("Error al eliminar trabajador:", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated && user && user.id_trabajador) {
      loadPerfilUsuario(user.id_trabajador);
    } else {
      setPerfilUsuario(null);
    }
  }, [isAuthenticated, user, loadPerfilUsuario]);

  const showNotification = (message, type = "success") => {
    setNotification({
      show: true,
      message,
      type,
    });
    setTimeout(() => {
      setNotification({
        show: false,
        message: "",
        type: "success",
      });
    }, 3000);
  };

  return (
    <TrabajadorContext.Provider
      value={{
        deleteTrabajador,
        loadTrabajadoresContext,
        trabajadores,
        perfil,
        loadTrabajador,
        perfilUsuario,
        loadPerfilUsuario,
        notificacion,
        showNotification,
      }}
    >
      {children}
    </TrabajadorContext.Provider>
  );
};
