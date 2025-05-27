import React from "react";
import { eliminarReservaRequest } from "../../api/reservas.api";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";

const ListarReservasCard = ({ reserva, setActualizarReserva }) => {
  const { isAuthenticated } = useAuth();

  const handleEliminarReserva = async () => {
    await eliminarReservaRequest(reserva.id_reserva);
    setActualizarReserva(true);
  };

  return (
    <div
      className={`mx-4 md:mx-1 my-1 bg-neutral-200  shadow rounded overflow-hidden p-2`}
    >
      <main>
        <article className="px-3 text-left text-slate-700 font-semibold block">
          <h4>Cliente : {`${reserva.nombre_cliente} ${reserva.apellidos}`}</h4>

          <h5>CI:{reserva.ci}</h5>
          <h5>Telefono: {reserva.telefono}</h5>
          <h5>Fecha Sesion : {reserva.fecha_sesion}</h5>
          <h5>Producto : {reserva.producto.nombre_producto}</h5>
        </article>
      </main>
      {isAuthenticated && (
        <section
          className={`flex gap-x-1 transition-all duration-500 ease-in-out`}
        >
          <div className="bg-slate-700 px-2 py-1 font-bold text-white rounded hover:bg-slate-900 transition-all duration-500 ease-in-out">
            <button onClick={() => handleEliminarReserva(reserva.id_reserva)}>
              Eliminar
            </button>
          </div>
          <div className="bg-slate-700 px-2 py-1 font-bold text-white rounded hover:bg-slate-900 transition-all duration-500 ease-in-out">
            <button>Editar</button>
          </div>
        </section>
      )}
    </div>
  );
};
export default ListarReservasCard;
