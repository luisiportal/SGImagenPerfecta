// frontend/src/pages/NotificacionesPage.jsx
import React, { useState, useEffect, useCallback } from "react";
import NotificacionForm from "../components/Notificaciones/NotificacionForm";
import NotificacionCard from "../components/Notificaciones/NotificacionCard";
import FiltroNotificaciones from "../components/Notificaciones/FiltroNotificaciones";
import { obtenerNotificacionesRequest } from "../api/notificaciones.api";
import { useAuth } from "../context/AuthContext"; // Importa useAuth si lo utilizas para controlar el acceso

const NotificacionesPage = () => {
  const { isAuthenticated } = useAuth(); // Asumiendo que usas useAuth para determinar si el usuario puede crear/editar

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [notificaciones, setNotificaciones] = useState([]);
  const [notificacionAEditar, setNotificacionAEditar] = useState(null);
  const [filtros, setFiltros] = useState({
    fechaDesde: "",
    fechaHasta: "",
    ci: "",
    nombre: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cargarNotificaciones = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Ajusta esta llamada para enviar los filtros al backend si tu API los soporta
      const data = await obtenerNotificacionesRequest(filtros);
      setNotificaciones(data);
    } catch (err) {
      console.error("Error al cargar notificaciones:", err);
      setError(
        "No se pudieron cargar las notificaciones. Por favor, inténtalo de nuevo más tarde."
      );
    } finally {
      setLoading(false);
    }
  }, [filtros]); // Recarga notificaciones cuando los filtros cambian

  useEffect(() => {
    cargarNotificaciones();
  }, [cargarNotificaciones]);

  const handleNotificacionGuardada = () => {
    setMostrarFormulario(false);
    setNotificacionAEditar(null);
    cargarNotificaciones(); // Recarga las notificaciones después de guardar/actualizar
  };

  const handleCancelarFormulario = () => {
    setMostrarFormulario(false);
    setNotificacionAEditar(null);
  };

  const handleEditarNotificacion = (notif) => {
    setNotificacionAEditar(notif);
    setMostrarFormulario(true);
  };

  const aplicarFiltros = () => {
    cargarNotificaciones(); // Al aplicar filtros, recargar las notificaciones
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 sm:p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg p-6 sm:p-8">
        <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
          <h1 className="text-4xl font-extrabold text-gray-900 leading-tight">
            Gestión de Notificaciones
          </h1>
          {isAuthenticated && (
            <button
              onClick={() => {
                setNotificacionAEditar(null); // Asegura que no estemos en modo edición
                setMostrarFormulario(true);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
            >
              Crear Nueva Notificación
            </button>
          )}
        </div>

        <div className="mb-8">
          <FiltroNotificaciones
            filtros={filtros}
            setFiltros={setFiltros}
            onApplyFilters={aplicarFiltros}
          />
        </div>

        {loading && (
          <p className="text-center text-blue-600 text-lg font-medium py-10">
            Cargando notificaciones...
          </p>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center text-lg my-8">
            <strong className="font-bold">¡Error!</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}

        {!loading && !error && notificaciones.length === 0 && (
          <p className="text-center text-gray-500 text-lg py-10">
            No hay notificaciones para mostrar con los filtros actuales.
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
          {notificaciones.map((notif) => (
            <NotificacionCard
              key={notif.id_notificacion}
              notificacion={notif}
              onUpdate={cargarNotificaciones} // Para recargar la lista después de cualquier cambio
              onEdit={handleEditarNotificacion} // Pasa la función para editar
            />
          ))}
        </div>

        {mostrarFormulario && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto w-full max-w-2xl transform transition-all duration-300 scale-95 animate-fade-in-up">
              <NotificacionForm
                notificacion={notificacionAEditar}
                onSuccess={handleNotificacionGuardada}
                onCancel={handleCancelarFormulario}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificacionesPage;
