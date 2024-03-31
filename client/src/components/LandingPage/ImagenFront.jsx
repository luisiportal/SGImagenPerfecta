import React from "react";

const ImagenFront = ({ ruta, alt }) => {
  return <img className=" object-cover w-full lg:h-h_4foto aspect-auto" src={ruta} alt={alt} />;
};

export default ImagenFront;
