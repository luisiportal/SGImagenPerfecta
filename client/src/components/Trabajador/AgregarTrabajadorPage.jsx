// src/components/Trabajador/AgregarTrabajadorPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import TrabajadorForm from "./TrabajadorForm";
import { useTrabajadores } from "../../context/TrabajadorContext";
import { crearTrabajadoresRequest } from "../../api/trabajador.api";

const AgregarTrabajadorPage = () => {
  const navigate = useNavigate();
  const { loadTrabajadoresContext } = useTrabajadores();

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

  const handleSubmit = async (values, file, formikBag, setNotificacion) => {
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
      setNotificacion({
        mensaje: "Usuario creado correctamente",
        errorColor: false,
      });
      setTimeout(async () => {
        await loadTrabajadoresContext();
        navigate("/trabajador/plantilla");
      }, 2000);
    } catch (error) {
      console.error("Error al crear trabajador:", error);
      const errorMessage =
        error.response?.data?.message || "Error al crear trabajador.";
      setNotificacion({ mensaje: errorMessage, errorColor: true });
    } finally {
      formikBag.setSubmitting(false);
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
      isEditing={false} // Pasar la prop isEditing
    />
  );
};

export default AgregarTrabajadorPage;
