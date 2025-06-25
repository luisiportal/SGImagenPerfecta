import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TrabajadorForm from "./TrabajadorForm";
import { useTrabajadores } from "../../context/TrabajadorContext";
import {
  crearTrabajadoresRequest,
  editarTrabajadoresRequest,
  listarunTrabajadorRequest,
} from "../../api/trabajador.api";

const AgregarTrabajadorPage = () => {
  const params = useParams();
  const id_trabajador = params.id;
  const navigate = useNavigate();
  const { loadTrabajadoresContext } = useTrabajadores();
  const [trabajador, setTrabajador] = useState({
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
    rol: "trabajador",
  });

  useEffect(() => {
    const cargarTrabajador = async () => {
      const response = await listarunTrabajadorRequest(id_trabajador);

      setTrabajador({
        ...response,
        usuario: response.usuario?.usuario ?? "",
        rol: response.usuario?.rol ?? "",
      });
    };

    if (id_trabajador) cargarTrabajador();
  }, [id_trabajador]);

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
    formData.append("rol", values.rol);

    if (file) {
      formData.append("imagenPerfil", file);
    }

    try {
      if (!id_trabajador) {
        await crearTrabajadoresRequest(formData);
        setNotificacion({
          mensaje: "Trabajador creado exitosamente.",
          errorColor: false,
        });
      } else {
        await editarTrabajadoresRequest(formData, id_trabajador);
        setNotificacion({
          mensaje: "Trabajador actualizado exitosamente.",
          errorColor: false,
        });
      }
      setTimeout(async () => {
        await loadTrabajadoresContext();
        navigate("/trabajador/plantilla");
      }, 2000);
    } catch (error) {
      console.error("Error al procesar trabajador:", error);
      const errorMessage =
        error.response?.data?.message || "Error al procesar trabajador.";
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
      formTitle={id_trabajador ? "Editar Trabajador" : "Agregar Trabajador"}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      isEditing={!!id_trabajador}
      trabajador={trabajador}
    />
  );
};

export default AgregarTrabajadorPage;
