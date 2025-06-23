import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback, // ¡Importa useCallback!
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
    // Este `perfil` parece ser un perfil por defecto/inicial.
    // Asegúrate de que `perfilUsuario` es el que realmente usas para los datos cargados.
    id_trabajador: "",
    usuario: "",
    password: "", // ¡Cuidado con almacenar contraseñas en el estado del frontend!
    nombre: "",
    apellidos: "",
    ci: "",
    telefono: "",
    puesto: "",
    direccion: "",
    salario: "",
    foto_perfil: "",
  });
  const [perfilUsuario, setPerfilUsuario] = useState(null); // Este debe ser el perfil real cargado

  const { isAuthenticated, user } = useAuth();

  // Envuelve loadTrabajadoresContext en useCallback
  const loadTrabajadoresContext = useCallback(async () => {
    try {
      const response = await listarTrabajadoresRequest();
      // Verifica la estructura de response
      console.log("Respuesta de API (Trabajadores):", response); // Log para depuración
      if (Array.isArray(response)) {
        setTrabajadores(response);
      } else {
        console.error("La respuesta no es un array:", response);
        setTrabajadores([]); // Asegúrate de que siempre sea un array
      }
    } catch (error) {
      console.error("Error al cargar trabajadores en el contexto:", error);
      setTrabajadores([]); // Limpia en caso de error
    }
  }, []); // Dependencias vacías: esta función solo se crea una vez

  // Envuelve loadPerfilUsuario en useCallback
  const loadPerfilUsuario = useCallback(async (id_trabajador) => {
    try {
      const trabajador = await listarunTrabajadorRequest(id_trabajador);
      console.log("Datos recibidos del backend:", trabajador);

      if (trabajador) {
        const newProfile = {
          id_trabajador: trabajador.id_trabajador || "",
          usuario: trabajador.usuario?.usuario || "", // Accede al usuario a través de la relación
          nombre: trabajador.nombre || "",
          apellidos: trabajador.apellidos || "",
          ci: trabajador.ci || "",
          telefono: trabajador.telefono || "",
          puesto: trabajador.puesto || "",
          direccion: trabajador.direccion || "",
          salario: trabajador.salario || "",
          foto_perfil: trabajador.foto_perfil || "default.jpg",
        };
        setPerfilUsuario(newProfile);
        return newProfile;
      }
      setPerfilUsuario(null);
      return null;
    } catch (error) {
      console.error("Error al cargar perfil:", error);
      setPerfilUsuario(null);
      return null;
    }
  }, []);

  // Envuelve deleteTrabajador en useCallback también, si es necesario
  const deleteTrabajador = useCallback(async (id_trabajador) => {
    try {
      await eliminarTrabajadorRequest(id_trabajador);
      setTrabajadores((prevTrabajadores) =>
        prevTrabajadores.filter(
          (trabajador) => trabajador.id_trabajador !== id_trabajador
        )
      );
    } catch (error) {
      console.error("Error al eliminar trabajador:", error);
    }
  }, []); // Dependencias vacías: esta función solo se crea una vez (o depende de otras funciones estables)

  // Consolidar los useEffect de carga inicial
  useEffect(() => {
    const loadInitialData = async () => {
      // Cargar trabajadores siempre al montar el componente
      await loadTrabajadoresContext();

      // Cargar perfil de usuario si está autenticado
      if (isAuthenticated && user?.id_trabajador) {
        await loadPerfilUsuario(user.id_trabajador);
      }
    };

    loadInitialData();
  }, [
    isAuthenticated,
    user?.id_trabajador,
    loadTrabajadoresContext,
    loadPerfilUsuario,
  ]);
  // Asegúrate de incluir loadTrabajadoresContext y loadPerfilUsuario en las dependencias
  // porque son funciones que (ahora) son estables gracias a useCallback.
  // Sin embargo, si otras dependencias de estas funciones (internas a useCallback) cambian,
  // useCallback las recrearía, y este useEffect se volvería a ejecutar.
  // Como actualmente tienen dependencias vacías en useCallback, esto funcionará bien.

  return (
    <TrabajadorContext.Provider
      value={{
        deleteTrabajador,
        loadTrabajadoresContext,
        trabajadores,
        perfil: perfilUsuario, // Asegúrate de exportar `perfilUsuario` para el perfil real
        loadPerfilUsuario,
        // ... otras funciones o estados que necesites
      }}
    >
      {children}
    </TrabajadorContext.Provider>
  );
};
