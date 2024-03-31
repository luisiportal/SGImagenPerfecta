import React from "react";

const Notificacion = ({ errorColor, mensaje }) => {
  return (
    
      <div
    className={`${errorColor ? "bg-red-500" : "bg-green-500"} py-4 rounded px-2 text-white font-semibold transition-all `}
  >
    <h2>{mensaje}</h2>
  </div>
  );
};

export default Notificacion;
