import ReservarBtn from "./LandingPage/ReservarBtn.jsx";
import Edit_ElimBTN from "./LandingPage/Edit_ElimBTN.jsx";

// function ProductoCard({ producto }) {
//   return (
//     <div className={`bg-white shadow`} style={{ width: '400px' ,margin: '0 auto'}}> {/* Ajusta '300px' al ancho que desees */}
//       <section className="flex flex-col text-he_card">
//         <div className="bg-he_card text-white h-24 flex items-center">
//           <div className="flex-1 relative">
//             <div className=" bg-huellas_color atravezado absolute z-50 right-0 h-72">
//               <h3 className="rotar-36 rotate-45 pl-6 ml-2 relative top-4 ">
//                 FOTOBOOK
//               </h3>
//             </div>
//             <h2 className="font-bold flex justify-center text-2xl">
//               {producto.nombre_producto}
//             </h2>
//             <h4 className="flex justify-center font-semibold">20 Fotos</h4>
//           </div>
//         </div>

//         <div className="flex flex-col text-2xl">
//           <h2 className="flex justify-center text-7xl font-bold p-5">
//             ${producto.precio_venta}
//           </h2>
//           <h4 className="flex justify-center -mt-4">CUP</h4>
//           <h4 className="flex justify-center p-5 font-semibold"></h4>
//           <h4 className="flex justify-center p-5 ">{producto.formato_entrega}</h4>
//           <h4 className=" flex flex-col grow p-5 text-center font-semibol">{producto.descripcion}</h4>
//           <div className="text-sm">
//             <ReservarBtn id_producto={producto.id_producto} />
//           </div>
//         </div>
//       </section>
//       <Edit_ElimBTN id_producto={producto.id_producto} />
//     </div>
//   );
// }
function ProductoCard({ producto }) {
  return (
    <div className={`bg-white shadow relative`} style={{ width: '400px' ,margin: '0 auto'}}>
      <section className="flex flex-col text-he_card pb-12"> {/* Añadimos padding-bottom */}
        <div className="bg-he_card text-white h-24 flex items-center">
          <div className="flex-1 relative">
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
          <h4 className="flex justify-center p-5 font-semibold"></h4>
          <h4 className="flex justify-center p-5 ">{producto.formato_entrega}</h4>
          <p className=" flex flex-col grow p-5 text-center font-semibol" style={{ whiteSpace: 'pre-wrap' }}>{producto.descripcion}</p>
          <div className="text-sm">
            <ReservarBtn id_producto={producto.id_producto} />
          </div>
        </div>
      </section>
      <div className="absolute bottom-0 left-0 w-full">
        <Edit_ElimBTN id_producto={producto.id_producto} />
      </div>
    </div>
  );
}

export default ProductoCard;
