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
  const { loadTrabajadoresContext, loadPerfilUsuario, editarMiPerfil } =
    useTrabajadores();
  const { user } = useAuth();
  const [initialValues, setInitialValues] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrabajador = async () => {
      setLoading(true);
      setError(null);
      if (id) {
        try {
          const trabajador = await listarunTrabajadorRequest(id);

          if (!trabajador.usuario.usuario) {
            setError("Este trabajador no tiene un usuario asociado.");
            return;
          }

          setInitialValues({
            id_trabajador: trabajador.id_trabajador,
            usuario: trabajador.usuario.usuario,
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
          setError(
            error.response?.data?.message || "Error al cargar el trabajador."
          );
        } finally {
          setLoading(false);
        }
      }
    };
    fetchTrabajador();
  }, [id]);

  const handleSubmit = async (values, file, formikBag, setNotificacion) => {
    // Determinar si es la edición del propio perfil o una edición por un admin
    const isMyProfileEdit = user && String(user.id_trabajador) === id;
    const isAdminUser = user && user.rol === "administrador";
    console.log(user.rol);

    try {
      if (isAdminUser || !isMyProfileEdit) {
        // Si no es mi propio perfil (es decir, un admin edita a otro), usa la función general
        const formData = new FormData();
        formData.append("usuario", values.usuario);
        if (values.password && values.password.trim() !== "") {
          formData.append("password", values.password);
        }
        formData.append("nombre", values.nombre);
        formData.append("apellidos", values.apellidos);
        formData.append("ci", values.ci);
        formData.append("telefono", values.telefono);
        formData.append("puesto", values.puesto);
        formData.append("direccion", values.direccion);
        formData.append("salario", values.salario);
        console.log(values.rol);

        if (values.rol) {
          formData.append("rol", values.rol);
        }

        if (file) {
          formData.append("imagenPerfil", file);
        }
        await editarTrabajadoresRequest(formData, id);
      } else {
        // Si es el propio perfil, usa la función específica para mi perfil
        await editarMiPerfil(values, file, id); // Llama a la función del contexto
      }

      setNotificacion({
        mensaje: "Perfil actualizado correctamente",
        errorColor: false,
      });
      setTimeout(async () => {
        // Si es la edición de mi propio perfil, navega al perfil, si no, a la plantilla de trabajadores
        if (isMyProfileEdit) {
          await loadPerfilUsuario(user.id_trabajador); // Recarga para asegurar los datos actualizados
          navigate("/trabajador/login"); // Asumiendo que /profile es la ruta de PerfilTrabajador
        } else {
          await loadTrabajadoresContext(); // Recarga la lista de trabajadores para el admin
          navigate("/trabajador/plantilla");
        }
      }, 2000);
    } catch (error) {
      console.error("Error al actualizar perfil:", error);
      const errorMessage =
        error.response?.data?.message || "Error al actualizar el perfil.";
      setNotificacion({ mensaje: errorMessage, errorColor: true });
    } finally {
      formikBag.setSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (user && user.id_trabajador == id) {
      navigate("/trabajador/login"); //
    } else {
      navigate("/trabajador/plantilla");
    }
  };

  if (loading || (id && !initialValues)) {
    return (
      <div className="text-center mt-8 text-slate-600">
        Cargando datos del trabajador...
      </div>
    );
  }
  if (error) {
    return (
      <div className="text-center mt-8 text-red-600">
        {error}
        <button
          onClick={() =>
            navigate(
              user && user.id_trabajador == id
                ? "/trabajador/login"
                : "/trabajador/plantilla"
            )
          }
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Volver
        </button>
      </div>
    );
  }

  // Determinar si los campos 'puesto' y 'salario' deben ser editables
  const isMyProfileEdit = user && String(user.id_trabajador) === id;
  const isAdminUser = user && user.rol === "administrador";
  const disablePuestoSalario = isMyProfileEdit && !isAdminUser;
  return (
    <>
      {initialValues && (
        <TrabajadorForm
          formTitle="Editar Trabajador"
          initialValues={initialValues}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isEditing={true}
          disablePuestoSalario={disablePuestoSalario}
          isAdminUser={isAdminUser} // Pasamos si el usuario actual es admin
          isMyProfileEdit={isMyProfileEdit}
        />
      )}
    </>
  );
};

export default EditarTrabajadorPage;
