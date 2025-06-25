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
import ReservarForm from "../Reserva/ReservarForm";
import Notificacion from "../validacionForm/Notificacion";
import { useAuth } from "../../context/AuthContext";
import ConfirmModal from "../Modal/ConfirmModal";
import Footer from "../../pages/Footer";
import { obtenerNotificacionesPorReservaRequest } from "../../api/notificaciones.api";
import NotificacionCard from "../Notificaciones/NotificacionCard";

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

  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const [reservaToDeleteId, setReservaToDeleteId] = useState(null);

  const [notificaciones, setNotificaciones] = useState({});

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
      if (responseData) {
        setReservas(responseData);
        responseData.forEach((reserva) => {
          cargarNotificaciones(reserva.id_reserva);
        });
      }
      setError(null);
    } catch (error) {
      setError("Lo siento no tiene una reserva con nosotros");
      setReservas([]);
      setNotificaciones({});
    }
  };
  const cargarNotificaciones = async (id_reserva) => {
    try {
      const response = await obtenerNotificacionesPorReservaRequest(id_reserva);
      setNotificaciones((prev) => ({
        ...prev,
        [id_reserva]: response || [],
      }));
    } catch (error) {
      console.error("Error al cargar notificaciones:", error);
    }
  };

  const handleEdit = (reserva) => {
    setSelectedReserva(reserva);
    setShowEditModal(true);
  };

  const handleDelete = (id_reserva) => {
    setReservaToDeleteId(id_reserva);
    setShowConfirmDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    setShowConfirmDeleteModal(false);
    if (!reservaToDeleteId) return;

    try {
      await eliminarReservaRequest(reservaToDeleteId);
      setNotificacion_msg({
        mensaje: "Reserva eliminada con éxito!",
        errorColor: false,
      });
      setReservas(
        reservas.filter((reserva) => reserva.id_reserva !== reservaToDeleteId)
      );
      setNotificaciones((prev) => {
        const newNotificaciones = { ...prev };
        delete newNotificaciones[reservaToDeleteId];
        return newNotificaciones;
      });
      setError(null);
    } catch (error) {
      console.error("Error al eliminar reserva:", error);
      const errorMessage =
        error.response?.data?.message || "Error al eliminar la reserva.";
      setNotificacion_msg({ mensaje: errorMessage, errorColor: true });
    } finally {
      setReservaToDeleteId(null);
    }
  };

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

      setNotificacion_msg({
        mensaje: "Reserva actualizada con éxito!",
        errorColor: false,
      });

      setShowEditModal(false);
      setSelectedReserva(null);
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
    <div className="flex flex-wrap min-h-screen bg-sect_gray">
      <header className="w-full flex flex-col">
        {notificacion_msg && (
          <Notificacion
            mensaje={notificacion_msg.mensaje}
            errorColor={notificacion_msg.errorColor}
          />
        )}
        <h1 className="text-5xl text-center font-extrabold text-gray-800 leading-tight py-8">
          Comprobar Reserva
        </h1>
      </header>
      <main className="flex-1">
        <div className="w-full flex flex-col items-center">
          <div className="">
            <Formik
              initialValues={{ ci: "" }}
              onSubmit={handleSubmit}
              validationSchema={schema}
            >
              {({
                handleChange,
                handleSubmit,
                errors,
                values,
                isSubmitting,
              }) => (
                <Form onSubmit={handleSubmit} className="rounded-md p-2">
                  <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300 w-full mx-auto p-8">
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
                      className=" bg-st_color w-full text-2md text-white font-bold block p-2 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
                    >
                      {isSubmitting ? "Buscando..." : "Comprobar"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <div className="grid grid-cols-1 gap-2 p-4">
            {reservas && reservas.length > 0
              ? reservas.map((reserva) => (
                  <div
                    key={reserva.id_reserva}
                    className="flex flex-col md:flex-row gap-1 w-full"
                  >
                    <div className="w-full md:w-2/3">
                      <ListarReservasCard
                        reserva={reserva}
                        key={reserva.id_reserva}
                        onEdit={isAuthenticated ? handleEdit : undefined}
                        onDelete={isAuthenticated ? handleDelete : undefined}
                      />
                    </div>
                    {notificaciones[reserva.id_reserva] &&
                    notificaciones[reserva.id_reserva].length > 0 ? (
                      <div className="w-full md:w-1/3">
                        {notificaciones[reserva.id_reserva].map(
                          (notificacion, index) => (
                            <NotificacionCard
                              key={index}
                              notificacion={notificacion}
                              onUpdate={() =>
                                cargarNotificaciones(reserva.id_reserva)
                              }
                            />
                          )
                        )}
                      </div>
                    ) : null}
                  </div>
                ))
              : ""}
          </div>
        </div>
      </main>
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

      <ConfirmModal
        isOpen={showConfirmDeleteModal}
        message="¿Estás seguro de que quieres eliminar esta reserva? Esta acción no se puede deshacer."
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
      <Footer />
    </div>
  );
};

export default ComprobarReservaForm;
