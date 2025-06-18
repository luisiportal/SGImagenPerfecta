import { useState, useEffect } from "react";
import { listarunReservaRequest } from "../api/reservas.api";

export function useReserva(ci) {
  const [reserva, setReserva] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!ci) {
      setReserva(null);
      setLoading(false);
      return;
    }

    const loadReserva = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await listarunReservaRequest(ci);
        setReserva(response);
      } catch (err) {
        console.error("Error al cargar la reserva:", err);
        setError(err);
        setReserva(null);
      } finally {
        setLoading(false);
      }
    };

    loadReserva();
  }, [ci]);

  return { reserva, loading, error };
}
