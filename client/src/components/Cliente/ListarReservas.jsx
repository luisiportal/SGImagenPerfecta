import React from "react";
import { useState, useEffect } from "react";
import ListarReservasCard from "./ListarReservasCard";

import {  listarReservasRequest } from "../../api/reservas.api";

const ListarReservas = () => {
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    const loadReservas = async () => {
      try {
        const response = await listarReservasRequest();
        setReservas(response);
      } catch (error) {}
    };
    loadReservas()
  }, []);

  return (
    <section>
      <h1 className="flex justify-center pt-5 text-slate-500 font-bold text-4xl">
        Reservas
      </h1>
      <div className="grid sm:grid-cols-1 gap-2 xl:grid-cols-4 pt-10">
        {reservas.map((reserva) => (
          <ListarReservasCard reserva={reserva} key={reserva.id_reserva} />
        ))}
      </div>
    </section>
  );
};

export default ListarReservas;
