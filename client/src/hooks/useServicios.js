import { useEffect, useState } from "react";
import { listarServiciosRequest } from "../api/servicios.api";
import { useservicios } from "../Store/Servicios.store";

export const useServicios = () => {
  const { servicios, setservicios } = useservicios();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const fetchServicios = async () => {
    try {
      setLoading(true);
      const response = await listarServiciosRequest();
      setservicios(response || []);
      setError("");
    } catch (err) {
      setError(err.message || "Error al cargar servicios");
      console.error("Error al cargar servicios:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (servicios && servicios.length === 0) {
      fetchServicios();
    } else {
      setLoading(false);
    }
  }, []);

  const handleDeleteSuccess = (id_servicio) => {
    setservicios(
      servicios.filter((servicio) => servicio.id_servicio !== id_servicio)
    );
  };

  return { servicios, loading, error, fetchServicios, handleDeleteSuccess };
};
