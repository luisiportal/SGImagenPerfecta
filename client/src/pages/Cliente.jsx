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
      if (productos.length == 0) return <h1>No hay productos</h1>;
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
       Productos
      </h1>
      <p className="text-sm text-slate-700 font-semibold flex justify-center">Reserve aqui</p>
          
        </section>
      )}
      <section className="grid sm:grid-cols-1 gap-5 xl:grid-cols-3 pt-5 lg:mx-48">
        {renderMain()}
      </section>
    </div>
  );
};
export default Cliente;
