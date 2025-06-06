// src/pages/EditarTrabajadorPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TrabajadorForm from "./TrabajadorForm"; // Asegúrate de la ruta correcta
import { useTrabajadores } from "../../context/TrabajadorContext"; // Asegúrate de la ruta correcta
import { editarTrabajadoresRequest } from "../../api/trabajador.api"; // Asegúrate de la ruta correcta

const EditarTrabajadorPage = () => {
  const { id } = useParams(); // Obtiene el ID del trabajador de la URL
  const navigate = useNavigate();
  const { loadTrabajador, perfil, loadTrabajadoresContext } = useTrabajadores();
  const [initialValues, setInitialValues] = useState(null); // Estado para los valores iniciales (null mientras carga)
  const [loading, setLoading] = useState(true); // Estado para indicar si los datos están cargando

  useEffect(() => {
    const fetchTrabajador = async () => {
      setLoading(true); // Inicia la carga
      if (id) {
        await loadTrabajador(id); // Carga el perfil del trabajador en el contexto
      }
      setLoading(false); // Finaliza la carga
    };
    fetchTrabajador();
  }, [id, loadTrabajador]); // Depende de 'id' y 'loadTrabajador'

  useEffect(() => {
    // Cuando el perfil se carga (o se actualiza) en el contexto, actualiza initialValues
    if (id && perfil) {
      setInitialValues({
        ...perfil,
        password: "", // Contraseña siempre vacía por seguridad en edición
        confirmPassword: "",
      });
    }
  }, [perfil, id]); // Depende de 'perfil' y 'id'

  const handleSubmit = async (
    values,
    file,
    formikBag,
    setFormikNotificacion
  ) => {
    const formData = new FormData();
    formData.append("usuario", values.usuario);
    if (values.password) {
      // Solo si se proporciona una nueva contraseña
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
      // Si se seleccionó un nuevo archivo
      formData.append("imagenPerfil", file);
    }

    try {
      await editarTrabajadoresRequest(formData, id);
      setFormikNotificacion({
        mensaje: "Trabajador actualizado correctamente",
        errorColor: false,
      });
      setTimeout(() => {
        loadTrabajadoresContext(); // Recarga la lista en el contexto
        navigate("/trabajador/plantilla");
      }, 2000);
    } catch (error) {
      console.error("Error al actualizar trabajador:", error);
      const errorMessage =
        error.response?.data?.message || "Error al actualizar trabajador.";
      setFormikNotificacion({ mensaje: errorMessage, errorColor: true });
    } finally {
      formikBag.setSubmitting(false); // Resetea el estado de envío de Formik
    }
  };

  const handleCancel = () => {
    navigate("/trabajador/plantilla");
  };

  // Muestra un mensaje de carga mientras se obtienen los datos o si initialValues aún no está listo
  if (loading || (id && !initialValues)) {
    return (
      <div className="text-center mt-8 text-slate-600">
        Cargando datos del trabajador...
      </div>
    );
  }

  return (
    <>
      {/* Solo renderiza el formulario si initialValues ya está establecido (para edición) */}
      {initialValues && (
        <TrabajadorForm
          formTitle="Editar Trabajador"
          initialValues={initialValues}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      )}
    </>
  );
};

export default EditarTrabajadorPage;
