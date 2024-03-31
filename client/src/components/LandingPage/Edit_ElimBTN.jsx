import React from "react";
import { useNavigate } from "react-router-dom";
import { useProductos } from "../../context/ProductoProvider.jsx";
 

const Edit_ElimBTN = ({ id_producto }) => {
  const { deleteProducto } = useProductos();
  const navigate = useNavigate();
  return (
    <>
      {window.location.pathname === "/productos" && (
        <section
          className={`flex gap-x-1 transition-all duration-500 ease-in-out`}
        >
          <div className="bg-slate-700 px-2 py-1 font-bold text-white rounded hover:bg-slate-900 transition-all duration-500 ease-in-out">
            <button onClick={() => deleteProducto(id_producto)}>
              Eliminar
            </button>
          </div>
          <div className="bg-slate-700 px-2 py-1 font-bold text-white rounded hover:bg-slate-900 transition-all duration-500 ease-in-out">
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
