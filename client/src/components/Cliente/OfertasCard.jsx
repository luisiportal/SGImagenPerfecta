import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

function OfertaCard({ producto }) {
  const [showMore, setShowMore] = useState(false);
  const [showBotones, setShowBotones] = useState(false);

  const navigate = useNavigate();

  const handleSetmasDetalles = () => {
    setShowMore(!showMore);
  };
  const handleMouseEnter = () => {
    setShowBotones(true);
  };

  const handleMouseLeave = () => {
    setShowBotones(false);
  };

  const colorExistencia = () => {
    return producto.existencia <= producto.stockMinimo &&
      producto.existencia !== "0"
      ? "border-r-8 border-yellow-400"
      : producto.existencia === "0"
        ? "border-r-8 border-red-400 "
        : "";
  };

  return (
    <div
      className={`mx-4 md:mx-1 my-1 bg-neutral-200 ${colorExistencia()}  shadow rounded overflow-hidden p-2`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleSetmasDetalles}
    >
      <Link to={"/new"}>
        <button className="fixed  md:hidden bottom-5 right-8 bg-huellas_color hover:bg-slate-700 text-white font-extrabold py-10 px-10 rounded-full h-8 w-8 text-4xl flex justify-center items-center">
          +
        </button>
      </Link>
      <header className="flex">
        <div /* imagen del prodcuto */>
          <img
            className="w-12 h-12 object-cover object-center shadow-xl border-slate-50 border-spacing-2 rounded-md"
            src={"images/productos/" + producto.ruta_image}
            alt="Imagen de Producto"
          />
        </div>
        <div className="px-3 text-left text-slate-700 font-semibold flex justify-between w-full gap-7 align-middle">
          <div className="w-3/5">
            <h2 className="text-slate-900 font-bold text-sm line-clamp-1">
              {producto.nombre_producto}
            </h2>
            <span className="text-xs text-white bg-red-400 rounded p-0.5">
              {producto.descripcion}
            </span>
          </div>

          <div className="w-2/5 text-right">
            <p>{producto.precio_venta} cup</p>

            <p className="text-sm">
              Formato entrega: {producto.formato_entrega}
              Locacion : {producto.locacion}
            </p>
          </div>
        </div>
      </header>

      {showBotones && (
        <div className="flex gap-x-1 transition-all duration-500 ease-in-out">
          <div className="bg-slate-700 px-2 py-1 font-bold text-white rounded hover:bg-huellas_color">
            <button
              onClick={() => {
                navigate(`/cliente/reservar/${producto.id_producto}`);
              }}
            >
              Reservar
            </button>
          </div>
          <div> </div>
        </div>
      )}
    </div>
  );
}

export default OfertaCard;
