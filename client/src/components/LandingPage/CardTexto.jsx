import React from "react";

const CardTexto = ({ bg, titulo, slogan, texto,textColor }) => {
  return (
    <section className={`${bg} ${textColor} text-center px-10 lg:text-2xl py-4 lg:pt-16 flex-col w-full lg:h-h_4foto`}>
      <h2 className="text-huellas_color font-bold text-xl lg:text-4xl pb-5">{titulo}</h2>
      <h3>{slogan}</h3>
      <p>{texto}</p>
    </section>
  );
};

export default CardTexto;
