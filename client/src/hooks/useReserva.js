import { useState, useEffect } from "react";
import {listarunReservaRequest } from "../api/reservas.api";

export function useReserva(id_reserva) {
  const [reserva, setReserva] = useState([]);



  useEffect(() => {
    const loadReservas = async () => {
      try {
        const response = await listarunReservaRequest(1);
        setReserva(response);
      } catch (error) {}
    };
    loadReservas();
    
  }, []);

  return reserva;
}
