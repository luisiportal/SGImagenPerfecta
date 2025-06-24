import { calcularPrecioOfertaPersonalizada } from "../../utils/calculos";

export const ServiciosSeleccionados = ({ servicios }) => {
  if (!servicios || servicios.length === 0) return null;

  return (
    <div className="mb-4">
      <div className="flex justify-between items-baseline mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          Servicios Seleccionados:
        </h3>
      </div>
      <div className="space-y-2">
        {servicios.map((servicio) => (
          <div
            key={servicio.id_servicio}
            className="flex justify-between items-center bg-gray-100 p-2 rounded-md"
          >
            <div className="flex-1 flex justify-between items-center pr-2">
              <span className="flex-grow ">
                <h3 className="font-bold text-red-500 inline">
                  {servicio.cantidad} x{" "}
                </h3>
                {servicio.nombre_servicio}
              </span>
              <span className="w-20 text-right text-red-400">
                (${Number(servicio.precio_servicio).toFixed(2)})
              </span>
            </div>
            <span className="w-24 text-right font-bold text-red-500">
              $
              {(Number(servicio.precio_servicio) * servicio.cantidad).toFixed(
                2
              )}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-2 border-t border-gray-300 flex justify-between items-baseline">
        <h2 className="text-xl font-bold text-gray-800">Precio Total:</h2>
        <div className="text-2xl font-extrabold text-red-600">
          ${calcularPrecioOfertaPersonalizada(servicios).toFixed(2)}
        </div>
      </div>
    </div>
  );
};
