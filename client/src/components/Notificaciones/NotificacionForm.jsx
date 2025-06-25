import { useState, useEffect } from "react";
import {
  crearNotificacionRequest,
  actualizarNotificacionRequest,
} from "../../api/notificaciones.api";
import { listarReservasRequest } from "../../api/reservas.api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import "../../styles/datepicker-custom.css";
import {
  formatDate,
  formatDateEnvio,
  parseDateForCalendar,
} from "../../utils/dateUtils";
import Notificacion from "../validacionForm/Notificacion";
import { parseISO } from "date-fns";
import Modal from "../Modal/Modal";

registerLocale("es", es);

const NotificacionForm = ({ notificacion, onSuccess, onCancel }) => {
  const isEditing = !!notificacion;
  const [formData, setFormData] = useState({
    id_reserva: notificacion?.id_reserva || "",
    mensaje: notificacion?.mensaje || "",
    tipo: notificacion?.tipo || "sistema",
    asunto: notificacion?.asunto || "",
    fecha_envio: notificacion?.fecha_envio
      ? parseISO(notificacion.fecha_envio)
      : new Date(),
    fecha_eliminacion: notificacion?.fecha_eliminacion
      ? parseISO(notificacion.fecha_eliminacion)
      : null,
    id_usuario: notificacion?.id_usuario || "",
  });

  const [reservas, setReservas] = useState([]);
  const [loadingReservas, setLoadingReservas] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    const cargarReservas = async () => {
      try {
        setLoadingReservas(true);
        const response = await listarReservasRequest();
        const reservasOrdenadas = response.sort(
          (a, b) => new Date(a.fecha_sesion) - new Date(b.fecha_sesion)
        );
        setReservas(reservasOrdenadas);
      } catch (error) {
        console.error("Error al cargar reservas:", error);
      } finally {
        setLoadingReservas(false);
      }
    };

    cargarReservas();

    if (isEditing) {
      setFormData({
        id_reserva: notificacion.id_reserva || "",
        mensaje: notificacion.mensaje || "",
        tipo: notificacion.tipo || "sistema",
        asunto: notificacion.asunto || "",
        fecha_envio: notificacion.fecha_envio
          ? parseISO(notificacion.fecha_envio)
          : new Date(),
        fecha_eliminacion: notificacion.fecha_eliminacion
          ? parseISO(notificacion.fecha_eliminacion)
          : null,
        id_usuario: notificacion.id_usuario || "",
      });
    }
  }, [isEditing, notificacion]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date, name) => {
    setFormData((prev) => ({ ...prev, [name]: date }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.id_reserva)
      newErrors.id_reserva = "La reserva es obligatoria.";
    if (!formData.mensaje.trim())
      newErrors.mensaje = "El mensaje es obligatorio.";
    if (!formData.tipo)
      newErrors.tipo = "El tipo de notificación es obligatorio.";
    if (formData.tipo === "email" && !formData.asunto.trim())
      newErrors.asunto =
        "El asunto es obligatorio para notificaciones de email.";

    if (formData.fecha_eliminacion && formData.fecha_eliminacion < new Date()) {
      newErrors.fecha_eliminacion =
        "La fecha de eliminación debe ser en el futuro.";
    }

    if (
      formData.fecha_envio &&
      formData.fecha_envio < new Date() &&
      !isEditing
    ) {
      newErrors.fecha_envio =
        "La fecha de envío no puede ser en el pasado para una nueva notificación.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    try {
      const dataToSend = {
        ...formData,
        id_reserva: formData.id_reserva,
        mensaje: formData.mensaje,
        tipo: formData.tipo,
        asunto: formData.asunto,
        fecha_envio: formData.fecha_envio
          ? formatDateEnvio(formData.fecha_envio)
          : undefined,
        fecha_eliminacion: formData.fecha_eliminacion
          ? formatDate(formData.fecha_eliminacion)
          : null,
      };
      if (isEditing) {
        await actualizarNotificacionRequest(
          notificacion.id_notificacion,
          dataToSend
        );
        setSuccessMessage("Notificación actualizada exitosamente");
      } else {
        await crearNotificacionRequest(dataToSend);
        setSuccessMessage("Notificación creada exitosamente");
      }
      if (onSuccess && typeof onSuccess === "function") {
        onSuccess();
      }
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error) {
      console.error("Error al guardar notificación:", error);
      alert(
        "Error al guardar notificación: " +
          (error.response?.data?.message || error.message)
      );
    }
  };
  const handleCloseSuccessModal = () => {
    setSuccessMessage(null);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          {isEditing ? "Editar Notificación" : "Crear Nueva Notificación"}
        </h2>

        <div className="mb-4">
          <label htmlFor="id_reserva" className="block text-gray-700 mb-2">
            Reserva Asociada:
          </label>
          <select
            id="id_reserva"
            name="id_reserva"
            value={formData.id_reserva}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
            disabled={isEditing}
          >
            <option value="">Seleccione una reserva</option>
            {loadingReservas ? (
              <option disabled>Cargando reservas...</option>
            ) : (
              reservas.map((res) => (
                <option key={res.id_reserva} value={res.id_reserva}>
                  ({res.fecha_sesion}) {res.nombre_cliente}
                </option>
              ))
            )}
          </select>
          {errors.id_reserva && (
            <p className="text-red-500 text-sm mt-1">{errors.id_reserva}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="tipo" className="block text-gray-700 mb-2">
            Tipo de Notificación:
          </label>
          <select
            id="tipo"
            name="tipo"
            value={formData.tipo}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          >
            <option value="sistema">Sistema</option>
            <option value="email">Email</option>
          </select>
          {errors.tipo && (
            <p className="text-red-500 text-sm mt-1">{errors.tipo}</p>
          )}
        </div>

        <div className="mb-4">
          <input
            type="text"
            id="asunto"
            name="asunto"
            value={formData.asunto}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Asunto del Mensaje"
            required={formData.tipo === "email"}
          />
          {errors.asunto && (
            <p className="text-red-500 text-sm mt-1">{errors.asunto}</p>
          )}
        </div>

        <div className="mb-4">
          <textarea
            id="mensaje"
            name="mensaje"
            value={formData.mensaje}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 h-32 resize-y"
            placeholder="Escriba el mensaje de la notificación"
            required
          ></textarea>
          {errors.mensaje && (
            <p className="text-red-500 text-sm mt-1">{errors.mensaje}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="fecha_envio" className="block text-gray-700 mb-2">
            Fecha y Hora de Envío:
          </label>
          <DatePicker
            selected={formData.fecha_envio}
            onChange={(date) => handleDateChange(date, "fecha_envio")}
            dateFormat="dd/MM/yyyy HH:mm"
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="Hora"
            minDate={new Date()}
            placeholderText="Seleccione fecha y hora de envío"
            className="w-full border rounded px-3 py-2"
            locale="es"
            required
          />
          {errors.fecha_envio && (
            <p className="text-red-500 text-sm mt-1">{errors.fecha_envio}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            Fecha y Hora de Eliminación (opcional):
          </label>
          <DatePicker
            selected={formData.fecha_eliminacion}
            onChange={(date) => handleDateChange(date, "fecha_eliminacion")}
            dateFormat="dd/MM/yyyy HH:mm"
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="Hora"
            minDate={new Date()}
            placeholderText="Seleccione fecha y hora de eliminación"
            className="w-full border rounded px-3 py-2"
            locale="es"
            isClearable
          />
          <p className="text-sm text-gray-500 mt-1">
            La notificación se eliminará automáticamente en esta fecha. Déjalo
            vacío para que persista.
          </p>
          {errors.fecha_eliminacion && (
            <p className="text-red-500 text-sm mt-1">
              {errors.fecha_eliminacion}
            </p>
          )}
        </div>

        <div className="flex justify-end space-x-3">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
            >
              Cancelar
            </button>
          )}
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {isEditing ? "Actualizar" : "Crear"} Notificación
          </button>
        </div>
      </form>
      <Modal isOpen={!!successMessage} onClose={handleCloseSuccessModal}>
        <div className="p-6 text-center">
          <h3 className="text-lg font-bold text-green-600 mb-4">¡Éxito!</h3>
          <p className="text-gray-700 mb-6">{successMessage}</p>
          <button
            onClick={handleCloseSuccessModal}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Cerrar
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default NotificacionForm;
