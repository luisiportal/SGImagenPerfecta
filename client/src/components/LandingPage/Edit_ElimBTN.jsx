import React from "react";
import { useNavigate } from "react-router-dom";
import { useProductos } from "../../context/ProductoProvider.jsx";
 

// const Edit_ElimBTN = ({ id_producto }) => {
//   const { deleteProducto } = useProductos();
//   const navigate = useNavigate();
//   return (
//     <>
//       {window.location.pathname === "/productos" && (
//         <section
//           className={`flex gap-x-1 transition-all duration-500 ease-in-out`}
//         >
//           <div className="bg-slate-700 px-2 py-1 font-bold text-white rounded hover:bg-slate-900 transition-all duration-500 ease-in-out">
//             <button onClick={() => deleteProducto(id_producto)}>
//               Eliminar 5
//             </button>
//           </div>
//           <div className="bg-slate-700 px-2 py-1 font-bold text-white rounded hover:bg-slate-900 transition-all duration-500 ease-in-out">
//             <button onClick={() => navigate(`edit/${id_producto}`)}>
//               Editar
//             </button>
//           </div>
//         </section>
//       )}
//     </>
//   );
// };
const Edit_ElimBTN = ({ id_producto }) => {
  const { deleteProducto } = useProductos();
  const navigate = useNavigate();
  return (
    <> {/* Container for centering */}
      {window.location.pathname === "/productos" && (
        <section className={`flex justify-center left-1/2 gap-x-1 transition-all duration-500 ease-in-out`}> {/* Increased gap */}
          <div className="bg-red-500 px-3 py-2 font-bold text-white rounded hover:bg-red-700 transition-all duration-300 ease-in-out"> {/* More semantic color and padding */}
            <button onClick={() => deleteProducto(id_producto)}>
              Eliminar
            </button>
          </div>
          <div className="bg-blue-500 px-3 py-2 font-bold text-white rounded hover:bg-blue-700 transition-all duration-300 ease-in-out"> {/* More semantic color and padding */}
            <button onClick={() => navigate(`edit/${id_producto}`)}>
              Editar
            </button>
          </div>
        </section>
      )}
    </>
  );
};
export default Edit_ElimBTN;
