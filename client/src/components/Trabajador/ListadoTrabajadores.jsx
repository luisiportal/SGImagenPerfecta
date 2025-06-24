import { useEffect, useState } from "react";
import TrabajadorCard from "./TrabajadorCard";
import { useTrabajadores } from "../../context/TrabajadorContext";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import AgregarSVG from "../SVG/AgregarSVG";
import ConfirmModal from "../Modal/ConfirmModal";

const ListadoTrabajadores = () => {
  const { trabajadores, loadTrabajadoresContext, deleteTrabajador } =
    useTrabajadores();
  const { user } = useAuth();
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
      try {
        await deleteTrabajador(trabajadorToDelete);
        setShowConfirmModal(false);
        setTrabajadorToDelete(null);
      } catch (error) {
        console.error("Error al eliminar:", error);
      }
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
        {user && user.rol === "administrador" && (
          <Link to={"/trabajador/new"}>
            <button className="flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105">
              <AgregarSVG />
              Añadir Nuevos Trabajadores
            </button>
          </Link>
        )}
      </section>
      <div className="flex flex-wrap justify-center gap-2 max-w-6xl mx-auto p-12">
        {trabajadores.map((trabajador) => (
          <TrabajadorCard
            trabajador={trabajador}
            key={trabajador.id_trabajador}
            onDeleteClick={handleDeleteClick}
            isCurrentUser={
              user && user.id_trabajador === trabajador.id_trabajador
            }
            currentUserRole={user ? user.rol : null}
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
