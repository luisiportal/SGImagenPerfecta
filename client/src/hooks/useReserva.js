import { useState, useEffect } from "react";
import { listarunReservaRequest } from "../api/reservas.api";

export function useReserva(ci) { // Cambié el nombre del parámetro a 'ci' para mayor claridad
  const [reserva, setReserva] = useState(null); // Es mejor iniciar con null si esperamos un objeto único
  const [loading, setLoading] = useState(true); // Para indicar si la carga está en progreso
  const [error, setError] = useState(null); // Para almacenar errores

  useEffect(() => {
    if (!ci) { // Si no hay CI, no intentar cargar nada.
      setReserva(null);
      setLoading(false);
      return;
    }

    const loadReserva = async () => {
      setLoading(true); // Indicar que la carga ha comenzado
      setError(null);    // Limpiar cualquier error anterior
      try {
        const response = await listarunReservaRequest(ci); // Usar el parámetro 'ci'
        setReserva(response);
      } catch (err) {
        console.error("Error al cargar la reserva:", err); // Registrar el error
        setError(err); // Almacenar el error
        setReserva(null); // Limpiar la reserva si hubo un error
      } finally {
        setLoading(false); // Indicar que la carga ha terminado (éxito o error)
      }
    };

    loadReserva();

  }, [ci]); // <--- Dependencia CORRECTA: Recargar cuando 'ci' cambie

  return { reserva, loading, error }; // Devolver también el estado de carga y error
}