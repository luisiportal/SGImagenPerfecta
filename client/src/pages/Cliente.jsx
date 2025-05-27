import React from "react";
import { useProductos } from "../context/ProductoProvider";
import { useEffect } from "react";
import ProductoCard from "../components/ProductoCard";

const Cliente = () => {
  const { productos, loadProductos } = useProductos();

  useEffect(() => {
   try {
     loadProductos();
   } catch (error) {
    
   }
  }, []);

  function renderMain() {
    try {
      if (productos.length == 0) return <h1 className="text-center pt-5 text-slate-500 font-bold text-4xl sm:text-5xl md:text-6xl">NO HAY OFERTAS DISPONIBLES</h1>
      return productos.map((producto) => (
        <ProductoCard producto={producto} key={producto.id_producto} />
      ));
    } catch (error) {
      
    }
  }

  return (
    <div className="bg-sect_gray">
      {window.location.pathname === "/cliente" && (
        <section className="px-2 pb-2 text-slate-700">
          <h1 className="flex justify-center pt-5 text-slate-500 font-bold text-4xl">
       Ofertas
      </h1>
      <p className="text-sm text-slate-700 font-semibold flex justify-center">RESERVAR</p>
          
        </section>
      )}
      <section>
        {renderMain()}
      </section>
    </div>
  );
};
export default Cliente;
