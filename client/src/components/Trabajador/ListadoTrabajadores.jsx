// src/components/Trabajador/ListadoTrabajadores.jsx
import { useEffect, useState } from "react";
import TrabajadorCard from "./TrabajadorCard";
import { useTrabajadores } from "../../context/TrabajadorContext";
import { useAuth } from "../../context/AuthContext"; // Importa useAuth para obtener el usuario autenticado
import { Link } from "react-router-dom";
import AgregarSVG from "../SVG/AgregarSVG";
import ConfirmModal from "../ConfirmModal";

const ListadoTrabajadores = () => {
  const { trabajadores, loadTrabajadoresContext, deleteTrabajador } =
    useTrabajadores();
  const { user } = useAuth(); // Obtiene el objeto 'user' del contexto de autenticación
  // Asumo que 'user' contiene el 'id_trabajador' del usuario logeado.
  // Si tu contexto de autenticación lo llama 'perfil', usa 'perfil' en su lugar.
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [trabajadorToDelete, setTrabajadorToDelete] = useState(null);

  useEffect(() => {
    const fetchTrabajadores = async () => {
      try {
        await loadTrabajadoresContext();
      } catch (error) {
        console.error("Error loading trabajadores:", error);
      }
    };
    fetchTrabajadores();
  }, [loadTrabajadoresContext]);

  const handleDeleteClick = (id) => {
    setTrabajadorToDelete(id);
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = async () => {
    if (trabajadorToDelete) {
      await deleteTrabajador(trabajadorToDelete);
      setShowConfirmModal(false);
      setTrabajadorToDelete(null);
    }
  };

  const handleCloseConfirmModal = () => {
    setShowConfirmModal(false);
    setTrabajadorToDelete(null);
  };

  return (
    <>
      <section className="flex flex-col items-center pt-8 px-4">
        <h1 className="text-5xl font-extrabold text-gray-800 leading-tight mb-6">
          Trabajadores
        </h1>
        <Link to={"/trabajador/new"}>
          <button className="flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105">
            <AgregarSVG />
            Añadir Nuevos Trabajadores
          </button>
        </Link>
      </section>
      <div className="flex flex-wrap justify-center gap-2 max-w-6xl mx-auto">
        {trabajadores.map((trabajador) => (
          <TrabajadorCard
            trabajador={trabajador}
            key={trabajador.id_trabajador}
            onDeleteClick={handleDeleteClick}
            // AÑADE ESTA LÍNEA CLAVE:
            isCurrentUser={
              user && user.id_trabajador === trabajador.id_trabajador
            }
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 2xl:w-1/5 p-2"
          />
        ))}
      </div>

      <ConfirmModal
        isOpen={showConfirmModal}
        message="¿Estás seguro de que quieres eliminar este trabajador?"
        onConfirm={handleConfirmDelete}
        onCancel={handleCloseConfirmModal}
      />
    </>
  );
};

export default ListadoTrabajadores;
