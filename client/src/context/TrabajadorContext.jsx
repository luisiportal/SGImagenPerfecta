// TrabajadorContext.jsx
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react"; // Importar useCallback
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
    id_trabajador: "", // Añadir id_trabajador aquí
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

  const { isAuthenticated, user } = useAuth();

  const loadTrabajadoresContext = async () => {
    try {
      const response = await listarTrabajadoresRequest();
      setTrabajadores(response);
    } catch (error) {
      console.error("Error cargando trabajadores en el contexto:", error);
      setTrabajadores([]);
    }
  };

  // *** CORRECCIÓN: Envolver loadTrabajador con useCallback ***
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
          password: "", // No cargar passwordHash por seguridad
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
  }, []); // Dependencias vacías porque setPerfil y listarunTrabajadorRequest son estables

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
    loadTrabajadoresContext();
  }, []);

  useEffect(() => {
    // Al añadir loadTrabajador a las dependencias, React se asegura de que este efecto se ejecute
    // solo cuando 'loadTrabajador' (que ahora es estable gracias a useCallback), 'isAuthenticated' o 'user' cambien.
    if (isAuthenticated && user && user.id_trabajador) {
      loadTrabajador(user.id_trabajador);
    } else {
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
  }, [isAuthenticated, user, loadTrabajador]); // loadTrabajador como dependencia (ahora es estable)

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
