import { useNavigate } from "react-router-dom";
import {
  confirmarVentaRequest,
} from "../../api/ventas.api";

function VentaCard({ venta, setActualizarVenta }) {
  const navigate = useNavigate();

  const handleConfirmarVenta = async (idVenta) => {
    await confirmarVentaRequest(idVenta);
    setActualizarVenta(true);
  };


  return (
    <div
      className={`mx-4 md:mx-1 my-1 bg-neutral-200  shadow rounded overflow-hidden p-2`}
    >
      <main>
        <article className="px-3 text-left text-slate-700 font-semibold block">
          <h4>Cliente : {`${venta.nombre_cliente} ${venta.apellidos}`}</h4>

          <h5>Producto Vendido:{venta.nombre_producto}</h5>
          <h5>Observaciones: {venta.descripcion}</h5>
          <h5>Pago : {venta.pago_confirmado}</h5>
          <h5>Precio : {venta.precio_venta}</h5>
        </article>
        <section
          className={`flex gap-x-1 transition-all duration-500 ease-in-out`}
        >
         
          {venta.pago_confirmado !== "Confirmado" && (
            <div className="bg-slate-700 px-2 py-1 font-bold text-white rounded hover:bg-slate-900 transition-all duration-500 ease-in-out">
              <button onClick={() => handleConfirmarVenta(venta.id_venta)}>
                Confirmar Venta
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default VentaCard;
