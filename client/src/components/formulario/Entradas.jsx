import React from "react";
import Input from "./Input";
import MostrarError from "../validacionForm/MostrarError";

const Entradas = ({ values, handleChange, errors }) => {
  return (
    <>
      <Input
        label={"Nombre Oferta"}
        name={"nombre_oferta"}
        type={"text"}
        value={values.nombre_oferta}
        handleChange={handleChange}
        errors={errors}
      ></Input>

      {/* Mejora visual para la textarea */}
      <div className="mb-4">
        {" "}
        {/* Añade un div para agrupar el label y la textarea y darle margen inferior */}
        <label
          htmlFor="descripcion"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Descripción
        </label>
        <textarea
          name="descripcion"
          id="descripcion" // Importante para asociar el label
          rows="3"
          placeholder="Detalles de la oferta"
          className="h-40 my-2 px-3 py-2 rounded-md w-full border border-gray-300 bg-white
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                     placeholder-gray-400 text-gray-800" // Añadidas clases para visibilidad y estilo
          onChange={handleChange}
          value={values.descripcion}
        ></textarea>
        <MostrarError errors={errors} campo="descripcion" />
      </div>

      <Input
        label={"Precio"}
        name={"precio_venta"}
        type={"text"}
        value={values.precio_venta}
        handleChange={handleChange}
        errors={errors}
      ></Input>
    </>
  );
};

export default Entradas;
