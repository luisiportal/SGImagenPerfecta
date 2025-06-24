import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useTrabajadores } from "../../context/TrabajadorContext";

const PerfilTrabajador = () => {
  const { logout, user } = useAuth();
  const { loadPerfilUsuario, perfilUsuario } = useTrabajadores();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPerfil = async () => {
      if (user && user.id_trabajador) {
        setIsLoading(true);
        try {
          await loadPerfilUsuario(user.id_trabajador);
        } catch (error) {
          console.error("Error al cargar perfil:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        console.warn("Usuario no tiene id_trabajador");
        setIsLoading(false);
      }
    };
    fetchPerfil();
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-st_color"></div>
        <p className="ml-4 text-xl text-gray-700">Cargando perfil...</p>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen bg-gray-50 flex justify-center items-center">
      <div className="min-h-80 w-full max-w-sm bg-white shadow-xl rounded-xl text-gray-900 overflow-hidden transform transition-all duration-300 hover:scale-[1.01]">
        <div className="relative h-40 bg-gradient-to-r from-st_color to-blue-500 flex justify-center items-end p-4">
          <div className="absolute top-4 right-4 z-10">
            <span
              className={`text-white text-sm font-semibold px-3 py-1 rounded-full ${
                user?.rol === "administrador" ? "bg-green-600" : "bg-blue-600"
              }`}
            >
              {user?.rol === "administrador" ? "Administrador" : "Trabajador"}
            </span>
          </div>
          <div className="absolute -bottom-16">
            <img
              className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-lg"
              src={`../images/trabajadores/perfil/${perfilUsuario?.foto_perfil || "default.jpg"}`}
              alt="Foto de perfil"
            />
          </div>
        </div>

        <div className="text-center mt-20 px-6 pb-6">
          <h2 className="text-3xl font-extrabold text-gray-800 leading-tight">
            {`${perfilUsuario?.nombre || "N/A"} ${perfilUsuario?.apellidos || ""}`}
          </h2>
          <p className="text-xl text-gray-600 mt-2">
            {perfilUsuario?.puesto || "Puesto no especificado"}
          </p>

          <div className="mt-4">
            <button
              onClick={() =>
                perfilUsuario?.id_trabajador
                  ? navigate(
                      `../trabajador/profile/edit/${perfilUsuario.id_trabajador}`
                    )
                  : null
              }
              className="inline-flex items-center px-4 py-2 bg-blue-500 text-white text-md font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-colors duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
              Editar Perfil
            </button>
          </div>
        </div>

        <div className="bg-gray-100 px-6 py-6 border-t border-gray-200">
          <ul className="space-y-3 text-lg text-gray-700">
            <li>
              <span className="font-semibold text-gray-800">Móvil:</span>{" "}
              {perfilUsuario?.telefono || "N/A"}
            </li>
            <li>
              <span className="font-semibold text-gray-800">Dirección:</span>{" "}
              {perfilUsuario?.direccion || "N/A"}
            </li>
            <li>
              <span className="font-semibold text-gray-800">Salario:</span>{" "}
              {perfilUsuario?.salario ? `${perfilUsuario.salario} CUP` : "N/A"}
            </li>
          </ul>
        </div>

        <button
          className="w-full py-4 bg-st_color text-black text-xl font-bold hover:bg-st_color-dark transition-colors duration-200"
          onClick={logout}
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default PerfilTrabajador;
