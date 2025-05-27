import { useEffect } from "react";
import ProductoCard from "../components/ProductoCard";
import { useProductos } from "../context/ProductoProvider";
import { Link } from "react-router-dom";
import AgregarSVG from "../components/SVG/AgregarSVG";

const ProductosPage = () => {
  const { productos, loadProductos } = useProductos();

  useEffect(() => {
    loadProductos();
  }, []);

  function renderMain() {
    if (productos.length === 0) return <h1>No hay productos</h1>;
    return productos.map((producto) => (
      <ProductoCard producto={producto} key={producto.id_producto} />
    ));

   
  }
  return (
    <div>
      <section className="flex justify-center">
      <h1 className="flex justify-center pt-5 text-slate-500 font-bold text-4xl">
        Ofertas
      </h1>
      <Link to={"/productos/new"}>
        <button className="text-slate-500 font-bold w-16 h-16 flex justify-center items-center">
          <AgregarSVG/>
        </button>
      </Link>
      </section>
      

      <div className="grid sm:grid-cols-1 gap-2 xl:grid-cols-3 mt-8  px-3 bg-sect_gray">
        {renderMain()}
      </div>
    </div>
  );
};

export default ProductosPage;
