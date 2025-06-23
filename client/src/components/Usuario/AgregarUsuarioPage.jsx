import React from "react";
import { useNavigate } from "react-router-dom";
import TrabajadorForm from "./TrabajadorForm";
import { useTrabajadores } from "../../context/TrabajadorContext";
import { crearTrabajadoresRequest } from "../../api/trabajador.api";
import { crearUsuarioRequest } from "../../api/usuario.api";
import UsuarioForm from "./UsuarioForm";

const AgregarUsuarioPage = () => {
  const navigate = useNavigate();
  const { loadTrabajadoresContext } = useTrabajadores();

  const initialValues = {
    usuario: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = async (values, file, formikBag, setNotificacion) => {
    const formData = new FormData();
    formData.append("usuario", values.usuario);
    if (values.password) {
      formData.append("password", values.password);
    }

    try {
      await crearUsuarioRequest(formData);
      setNotificacion({
        mensaje: "Usuario creado correctamente",
        errorColor: false,
      });
  
    } catch (error) {
      console.error("Error al crear usuario:", error);
      const errorMessage =
        error.response?.data?.message || "Error al crear usuario.";
      setNotificacion({ mensaje: errorMessage, errorColor: true });
    } finally {
      formikBag.setSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate("/usuarios");
  };

  return (
    <UsuarioForm
      formTitle="Agregar Trabajador"
      initialValues={initialValues}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      isEditing={false}
    />
  );
};

export default AgregarUsuarioPage;
