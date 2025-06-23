import React from "react";
import { Link } from "react-router-dom";

const OfertasBTN = () => {
  return (
    <Link
      to="/cliente"
      className="inline-flex items-center justify-center bg-slate-700 px-2 py-1 font-bold text-white rounded hover:bg-slate-900 transition-all duration-500 ease-in-out"
    >
      Ofertas
    </Link>
  );
};

export default OfertasBTN;
