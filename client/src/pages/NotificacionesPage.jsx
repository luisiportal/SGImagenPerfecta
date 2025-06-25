import React, { useState, useEffect, useCallback } from "react";
import NotificacionForm from "../components/Notificaciones/NotificacionForm";
import NotificacionCard from "../components/Notificaciones/NotificacionCard";
import FiltroNotificaciones from "../components/Notificaciones/FiltroNotificaciones";
import { obtenerNotificacionesRequest } from "../api/notificaciones.api";
import { useAuth } from "../context/AuthContext";

const NotificacionesPage = () => {
  const { isAuthenticated } = useAuth();

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
      const data = await obtenerNotificacionesRequest(filtros);
      setNotificaciones(data);
    } catch (err) {
      setError("Error al cargar notificaciones. Intente de nuevo.");
      console.error("Error al cargar notificaciones:", err);
    } finally {
      setLoading(false);
    }
  }, [filtros]);

  useEffect(() => {
    cargarNotificaciones();
  }, [cargarNotificaciones]);

  const handleCrearNuevaNotificacion = () => {
    setNotificacionAEditar(null);
    setMostrarFormulario(true);
  };

  const handleEditarNotificacion = (notificacion) => {
    setNotificacionAEditar(notificacion);
    setMostrarFormulario(true);
  };

  const handleNotificacionGuardada = () => {
    setMostrarFormulario(false);
    setNotificacionAEditar(null);
    cargarNotificaciones();
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Gestión de Notificaciones
      </h1>

      <FiltroNotificaciones filtros={filtros} setFiltros={setFiltros} />

      {isAuthenticated && (
        <div className="mb-6 flex justify-end">
          <button
            onClick={handleCrearNuevaNotificacion}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out"
          >
            Crear Nueva Notificación
          </button>
        </div>
      )}

      {loading && (
        <p className="text-center text-blue-500 text-lg py-10">
          Cargando notificaciones...
        </p>
      )}

      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
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
            onUpdate={cargarNotificaciones}
            onEdit={handleEditarNotificacion}
          />
        ))}
      </div>

      {mostrarFormulario && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto w-full max-w-2xl transform transition-all duration-300 scale-95 animate-fade-in-up">
            <NotificacionForm
              notificacion={notificacionAEditar}
              onSuccess={handleNotificacionGuardada}
              onCancel={() => {
                setMostrarFormulario(false);
                setNotificacionAEditar(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificacionesPage;
