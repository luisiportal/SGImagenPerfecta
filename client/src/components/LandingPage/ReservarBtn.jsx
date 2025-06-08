import React from "react";
import { useNavigate } from "react-router-dom";
const ReservarBtn = ({ id_oferta, personalizada, setShowServicios }) => {
  const onClickFN = () => {
    if (personalizada) {
      return setShowServicios(true);
    } else {
      return navigate(`/cliente/reservar/${id_oferta}`);
    }
  };

  const navigate = useNavigate();
  return (
    <div>
      {window.location.pathname !== "/ofertas" && (
        <section className="flex justify-center gap-x-1 transition-all duration-500 ease-in-out">
          <div className="bg-st_color px-10 py-3 mb-5 mt-4 font-bold  text-white rounded hover:bg-amber-600 transition-all duration-500 ease-in-out">
            <button onClick={() => onClickFN()}>RESERVAR</button>
          </div>
        </section>
      )}
    </div>
  );
};

export default ReservarBtn;
