import React from "react";
import MostrarError from "../validacionForm/MostrarError";

const Input = ({
  type,
  name,
  value,
  handleChange,
  errors,
  label,
  placeholder,
  onFocus,
  onBlur,
}) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        className="px-3 py-2 rounded-md w-full border border-gray-300 bg-white
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                   placeholder-gray-400 text-gray-800"
        onChange={handleChange}
        value={value}
        placeholder={placeholder}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      <MostrarError errors={errors} campo={name} />
    </div>
  );
};

export default Input;
