// src/hooks/useServicios.js
import { useEffect, useState } from "react";
import { listarServiciosRequest } from "../api/servicios.api";
import { useservicios } from "../Store/Servicios.store"; // Asumiendo esta ruta

export const useServicios = () => {
  const { servicios, setservicios } = useservicios(); // Ahora el store te da los servicios
  const [loading, setLoading] = useState(true); // Se mantiene aquí para el estado de carga local
  const [error, setError] = useState(""); // Se mantiene aquí para el estado de error local

  const fetchServicios = async () => {
    try {
      setLoading(true);
      const response = await listarServiciosRequest();
      setservicios(response || []); // Actualiza el store
      setError("");
    } catch (err) {
      setError(err.message || "Error al cargar servicios");
      console.error("Error al cargar servicios:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Si los servicios ya están en el store, no los cargues de nuevo (opcional, depende de tu lógica de cache)
    if (servicios && servicios.length === 0) {
      // O alguna otra condición para cargar
      fetchServicios();
    } else {
      setLoading(false); // Si ya están cargados en el store, marca como no cargando
    }
  }, []); // El array de dependencia puede necesitar ajustarse si quieres recargar en ciertas condiciones

  // La eliminación ahora debería actualizar el store, no el estado local directo del hook
  const handleDeleteSuccess = (id_servicio) => {
    setservicios(
      servicios.filter((servicio) => servicio.id_servicio !== id_servicio)
    );
  };

  return { servicios, loading, error, fetchServicios, handleDeleteSuccess };
};
