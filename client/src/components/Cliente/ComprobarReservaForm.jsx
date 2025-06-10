import { Form, Formik } from "formik";
import * as Yup from "yup";
import Input from "../formulario/Input";
import {
  listarunReservaRequest,
  actualizarReservaRequest,
  eliminarReservaRequest,
} from "../../api/reservas.api";
import { useState, useEffect } from "react";
import ListarReservasCard from "./ListarReservasCard";
import ReservarForm from "./ReservarForm";
import Notificacion from "../validacionForm/Notificacion";
import { useAuth } from "../../context/AuthContext";
import ConfirmModal from "../ConfirmModal"; // <-- Importa tu ConfirmModal

const schema = Yup.object().shape({
  ci: Yup.string()
    .matches(/^\d{11}$/, "Identidad no valida")
    .required("CI es requerido"),
});

const ComprobarReservaForm = () => {
  const { isAuthenticated } = useAuth();
  const [reservas, setReservas] = useState([]);
  const [error, setError] = useState(null);
  const [selectedReserva, setSelectedReserva] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [notificacion_msg, setNotificacion_msg] = useState(null);

  // ESTADOS PARA LA CONFIRMACIÓN DE ELIMINACIÓN (MANTENIDOS)
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const [reservaToDeleteId, setReservaToDeleteId] = useState(null);

  useEffect(() => {
    if (notificacion_msg) {
      const timer = setTimeout(() => {
        setNotificacion_msg(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [notificacion_msg]);

  const handleSubmit = async (values) => {
    try {
      const responseData = await listarunReservaRequest(values.ci);
      responseData && setReservas(responseData);
      setError(null);
    } catch (error) {
      setError("Lo siento no tiene una reserva con nosotros");
      setReservas([]);
    }
  };

  const handleEdit = (reserva) => {
    setSelectedReserva(reserva);
    setShowEditModal(true);
  };

  // Función para manejar la eliminación (ABRE EL MODAL DE CONFIRMACIÓN)
  const handleDelete = (id_reserva) => {
    setReservaToDeleteId(id_reserva);
    setShowConfirmDeleteModal(true);
  };

  // Función para confirmar la eliminación (SE EJECUTA AL ACEPTAR EN EL MODAL)
  const handleConfirmDelete = async () => {
    setShowConfirmDeleteModal(false); // Cierra el modal de confirmación
    if (!reservaToDeleteId) return;

    try {
      await eliminarReservaRequest(reservaToDeleteId);
      setNotificacion_msg({
        mensaje: "Reserva eliminada con éxito!",
        errorColor: false,
      });
      // Después de eliminar, limpia la reserva mostrada y el error si lo hay
      setReservas(
        reservas.filter((reserva) => reserva.id_reserva !== reservaToDeleteId)
      ); // Actualiza la lista de reservas
      setError(null);
    } catch (error) {
      console.error("Error al eliminar reserva:", error);
      const errorMessage =
        error.response?.data?.message || "Error al eliminar la reserva.";
      setNotificacion_msg({ mensaje: errorMessage, errorColor: true });
    } finally {
      setReservaToDeleteId(null); // Limpia el ID de la reserva a eliminar
    }
  };

  // Función para cancelar la eliminación (CIERRA EL MODAL DE CONFIRMACIÓN)
  const handleCancelDelete = () => {
    setShowConfirmDeleteModal(false);
    setReservaToDeleteId(null);
  };

  const handleGuardarEdicion = async (values) => {
    try {
      await actualizarReservaRequest(selectedReserva.id_reserva, {
        ...values,
        oferta_personalizada: selectedReserva.oferta_personalizada || [],
      });

      // Vuelve a usar setNotificacion_msg para el éxito de la actualización (como estaba antes)
      setNotificacion_msg({
        mensaje: "Reserva actualizada con éxito!",
        errorColor: false,
      });

      setShowEditModal(false);
      setSelectedReserva(null);
      // Vuelve a buscar la reserva por CI para asegurar que los datos mostrados estén actualizados
      const responseData = await listarunReservaRequest(values.ci);
      responseData && setReservas(responseData);
    } catch (error) {
      console.error("Error al actualizar reserva:", error);
      const errorMessage =
        error.response?.data?.message || "Error al actualizar la reserva.";
      setNotificacion_msg({ mensaje: errorMessage, errorColor: true });
      throw error;
    }
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedReserva(null);
  };

  return (
    <div className="mx-2 bg-neutral-200 rounded-md p-4">
      {notificacion_msg && (
        <Notificacion
          mensaje={notificacion_msg.mensaje}
          errorColor={notificacion_msg.errorColor}
        />
      )}
      <h1 className="flex justify-center pt-5 text-slate-500 font-bold text-4xl">
        Comprobar Reserva
      </h1>

      <div className="mt-8">
        <Formik
          initialValues={{ ci: "" }}
          onSubmit={handleSubmit}
          validationSchema={schema}
        >
          {({ handleChange, handleSubmit, errors, values, isSubmitting }) => (
            <Form
              onSubmit={handleSubmit}
              className="bg-neutral-200 max-w-md rounded-md p-4 mx-auto"
            >
              <Input
                name={"ci"}
                label={"Carnet Identidad"}
                type={"text"}
                value={values.ci}
                handleChange={handleChange}
                errors={errors}
              ></Input>

              <button
                type="submit"
                disabled={isSubmitting}
                className=" bg-st_color w-full text-2md text-black font-bold block p-2 rounded-md"
              >
                {isSubmitting ? "Buscando..." : "Comprobar"}
              </button>
              <br />
              {error && <p className="text-red-500 text-center">{error}</p>}
              {reservas && reservas.length > 0
                ? reservas.map((reserva) => (
                    <ListarReservasCard
                      reserva={reserva}
                      key={reserva.id_reserva}
                      onEdit={isAuthenticated ? handleEdit : undefined}
                      onDelete={isAuthenticated ? handleDelete : undefined}
                    />
                  ))
                : ""}
            </Form>
          )}
        </Formik>
      </div>

      {/* Modal de Edición */}
      {selectedReserva && showEditModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleCloseEditModal}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleCloseEditModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              // type="submit" // Remueve este 'type="submit"' si no es un botón de envío
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h2 className="text-slate-500 text-2xl font-bold mb-4 text-center">
              Editar Reserva
            </h2>
            <ReservarForm
              initialValues={selectedReserva}
              onSubmit={handleGuardarEdicion}
              onCancel={handleCloseEditModal}
              isEditing={true}
            />
          </div>
        </div>
      )}

      {/* Modal de Confirmación de Eliminación */}
      <ConfirmModal
        isOpen={showConfirmDeleteModal}
        message="¿Estás seguro de que quieres eliminar esta reserva? Esta acción no se puede deshacer."
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
};

export default ComprobarReservaForm;
