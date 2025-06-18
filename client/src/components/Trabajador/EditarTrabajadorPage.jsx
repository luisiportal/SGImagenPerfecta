import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TrabajadorForm from "./TrabajadorForm";
import { useTrabajadores } from "../../context/TrabajadorContext";
import { useAuth } from "../../context/AuthContext";
import {
  editarTrabajadoresRequest,
  listarunTrabajadorRequest,
} from "../../api/trabajador.api";

const EditarTrabajadorPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loadTrabajadoresContext, loadPerfilUsuario } = useTrabajadores();
  const { user } = useAuth();
  const [initialValues, setInitialValues] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrabajador = async () => {
      setLoading(true);
      if (id) {
        try {
          const trabajador = await listarunTrabajadorRequest(id);
          setInitialValues({
            id_trabajador: trabajador.id_trabajador,
            usuario: trabajador.usuario,
            password: "",
            confirmPassword: "",
            nombre: trabajador.nombre,
            apellidos: trabajador.apellidos,
            ci: trabajador.ci,
            telefono: trabajador.telefono,
            puesto: trabajador.puesto,
            direccion: trabajador.direccion,
            salario: trabajador.salario,
            foto_perfil: trabajador.foto_perfil,
          });
        } catch (error) {
          console.error("Error al cargar trabajador:", error);
          setInitialValues(null);
        }
      }
      setLoading(false);
    };
    fetchTrabajador();
  }, [id]);

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
      await editarTrabajadoresRequest(formData, id);
      setNotificacion({
        mensaje: "Trabajador actualizado correctamente",
        errorColor: false,
      });
      setTimeout(async () => {
        await loadTrabajadoresContext();
        console.log("User.Idtrabaj: ", user.id_trabajador);
        console.log("este es user: ", user);
        console.log("este es id: ", id);
        if (user && user.id_trabajador == id) {
          await loadPerfilUsuario(user.id_trabajador);
        }
        navigate("/trabajador/plantilla");
      }, 2000);
    } catch (error) {
      console.error("Error al actualizar trabajador:", error);
      const errorMessage =
        error.response?.data?.message || "Error al actualizar el trabajador.";
      setNotificacion({ mensaje: errorMessage, errorColor: true });
    } finally {
      formikBag.setSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate("/trabajador/plantilla");
  };

  if (loading || (id && !initialValues)) {
    return (
      <div className="text-center mt-8 text-slate-600">
        Cargando datos del trabajador...
      </div>
    );
  }

  return (
    <>
      {initialValues && (
        <TrabajadorForm
          formTitle="Editar Trabajador"
          initialValues={initialValues}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isEditing={true}
        />
      )}
    </>
  );
};

export default EditarTrabajadorPage;
