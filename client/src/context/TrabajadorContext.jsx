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
  editarMiPerfilRequest,
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
  const [perfilUsuario, setPerfilUsuario] = useState(null); // Nuevo estado para el usuario autenticado

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
        return newProfile; // Devuelve el perfil para sincronización
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
  const editarMiPerfil = async (values, file, id_trabajador) => {
    // Recibe el archivo
    try {
      const formData = new FormData();
      // Asegúrate de que los campos coincidan con los permitidos en el backend para actualizarMiPerfil
      formData.append("nombre", values.nombre);
      formData.append("apellidos", values.apellidos);
      formData.append("ci", values.ci);
      formData.append("telefono", values.telefono);
      formData.append("direccion", values.direccion);

      // Solo añadir si existen y no están vacíos
      if (values.usuario) formData.append("usuario", values.usuario);
      if (values.password && values.password.trim() !== "") {
        formData.append("password", values.password);
      }
      if (file) {
        formData.append("imagenPerfil", file);
      }

      const res = await editarMiPerfilRequest(formData, id_trabajador);
      // Tras una edición exitosa, podrías recargar el perfil del usuario para asegurar que los datos estén actualizados
      await loadPerfilUsuario(id_trabajador); // Recarga el perfil de usuario
      return res;
    } catch (error) {
      console.error("Error en editarMiPerfil (Context):", error);
      throw error;
    }
  };
  const deleteTrabajador = async (id_trabajador) => {
    try {
      console.log("Eliminando trabajador (Context):", id_trabajador); // Debug
      await eliminarTrabajadorRequest(id_trabajador);
      setTrabajadores(
        trabajadores.filter(
          (trabajador) => trabajador.id_trabajador !== id_trabajador
        )
      );
    } catch (error) {
      console.error("Error al eliminar trabajador:", error);
      // throw error; // Propaga el error para manejarlo en el componente
    }
  };

  useEffect(() => {
    if (isAuthenticated && user && user.id_trabajador) {
      loadPerfilUsuario(user.id_trabajador);
    } else {
      setPerfilUsuario(null);
    }
  }, [isAuthenticated, user, loadPerfilUsuario]);

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
        editarMiPerfil,
      }}
    >
      {children}
    </TrabajadorContext.Provider>
  );
};
