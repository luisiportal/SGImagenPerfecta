import React from "react";
import MostrarError from "../validacionForm/MostrarError";



const Input = ({ type, name, value, handleChange, errors, label }) => {
  return (
    <div>
      <label htmlFor={name} className="block">
        {label}:
      </label>
      <input
        type={type}
        name={name}
        className="my-2 px-2 py-1 rounded-sm w-full"
        onChange={handleChange}
        value={value}
        min={new Date().toISOString().split("T")[0]}
      />
      <MostrarError errors={errors} campo={name} />
    </div>
  );
};

export default Input;
