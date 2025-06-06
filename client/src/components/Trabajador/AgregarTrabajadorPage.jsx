// src/pages/AgregarTrabajadorPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TrabajadorForm from "./TrabajadorForm"; // Asegúrate de la ruta correcta
import { useTrabajadores } from "../../context/TrabajadorContext"; // Asegúrate de la ruta correcta
import { crearTrabajadoresRequest } from "../../api/trabajador.api"; // Asegúrate de la ruta correcta

const AgregarTrabajadorPage = () => {
  const navigate = useNavigate();
  const { loadTrabajadoresContext } = useTrabajadores(); // Para recargar la lista después de añadir

  // Valores iniciales para un nuevo trabajador (todos vacíos)
  const initialValues = {
    usuario: "",
    password: "",
    confirmPassword: "",
    nombre: "",
    apellidos: "",
    ci: "",
    telefono: "",
    puesto: "",
    direccion: "",
    salario: "",
    foto_perfil: "",
  };

  const handleSubmit = async (
    values,
    file,
    formikBag,
    setFormikNotificacion
  ) => {
    const formData = new FormData();
    formData.append("usuario", values.usuario);
    if (values.password) {
      formData.append("password", values.password);
    }
    formData.append("nombre", values.nombre);
    formData.append("apellidos", values.apellidos);
    formData.append("ci", values.ci);
    formData.append("telefono", values.telefono);
    formData.append("puesto", values.puesto);
    formData.append("direccion", values.direccion);
    formData.append("salario", values.salario);

    if (file) {
      formData.append("imagenPerfil", file);
    }

    try {
      await crearTrabajadoresRequest(formData);
      setFormikNotificacion({
        mensaje: "Usuario creado correctamente",
        errorColor: false,
      });
      setTimeout(() => {
        loadTrabajadoresContext(); // Recarga la lista en el contexto
        navigate("/trabajador/plantilla");
      }, 2000);
    } catch (error) {
      console.error("Error al crear trabajador:", error);
      const errorMessage =
        error.response?.data?.message || "Error al crear trabajador.";
      setFormikNotificacion({ mensaje: errorMessage, errorColor: true });
    } finally {
      formikBag.setSubmitting(false); // Resetea el estado de envío de Formik
    }
  };

  const handleCancel = () => {
    navigate("/trabajador/plantilla");
  };

  return (
    <TrabajadorForm
      formTitle="Agregar Trabajador"
      initialValues={initialValues}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    />
  );
};

export default AgregarTrabajadorPage;
