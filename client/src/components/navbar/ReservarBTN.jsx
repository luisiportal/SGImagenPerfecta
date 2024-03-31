import React from "react";
import { Link } from "react-router-dom";

const ReservarBTN = () => {
  return (
    <button className="bg-huellas_color font-bold text-white rounded-full ml-8 px-5 py-1">
      <Link to={"/cliente"}>Reservar</Link>
    </button>
  );
};

export default ReservarBTN;
