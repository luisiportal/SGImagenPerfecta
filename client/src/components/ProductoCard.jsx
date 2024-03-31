import ReservarBtn from "./LandingPage/ReservarBtn.jsx";
import Edit_ElimBTN from "./LandingPage/Edit_ElimBTN.jsx";

function ProductoCard({ producto }) {
  return (
    <div className={`bg-white shadow`}>
      <section className="flex flex-col text-he_card">
        <div className="bg-he_card text-white h-24 flex items-center">
          <div className="flex-1 relative">
            <div className=" bg-huellas_color atravezado absolute z-50 right-0 h-72">
              <h3 className="rotar-36 rotate-45 pl-6 ml-2 relative top-4 ">
                FOTOBOOK
              </h3>
            </div>
            <h2 className="font-bold flex justify-center text-2xl">
              {producto.nombre_producto}
            </h2>
            <h4 className="flex justify-center font-semibold">20 Fotos</h4>
          </div>
        </div>

        <div className="flex flex-col text-2xl">
          <h2 className="flex justify-center text-7xl font-bold p-5">
            ${producto.precio_venta}
          </h2>
          <h4 className="flex justify-center -mt-4">CUP</h4>
          <h4 className="flex justify-center p-5 ">Ampliacion 20x24</h4>
          <h4 className="flex justify-center p-5 ">Llavero</h4>
          <p className=" flex flex-col grow p-5 text-base text-justify">
            {producto.descripcion}
          </p>
          <div className="text-sm">
            <ReservarBtn id_producto={producto.id_producto} />
          </div>
        </div>
      </section>
      <Edit_ElimBTN id_producto={producto.id_producto} />
    </div>
  );
}

export default ProductoCard;
