// frontend/src/components/Notificaciones/NotificacionForm.jsx
import { useState, useEffect } from "react";
import {
  crearNotificacionRequest,
  actualizarNotificacionRequest,
} from "../../api/notificaciones.api";
import { listarReservasRequest } from "../../api/reservas.api"; // Asegúrate de que esta ruta sea correcta
import DatePicker from "react-datepicker"; // Importar DatePicker
import "react-datepicker/dist/react-datepicker.css"; // Importar estilos del DatePicker
import { registerLocale } from "react-datepicker"; // Para configurar el idioma
import es from "date-fns/locale/es"; // Importar el idioma español
import "../../styles/datepicker-custom.css"; // Tu archivo de estilos personalizados si tienes

// Registrar el idioma español
registerLocale("es", es);

const NotificacionForm = ({ notificacion, onSuccess, onCancel }) => {
  const isEditing = !!notificacion;
  const [formData, setFormData] = useState({
    id_reserva: "",
    mensaje: "",
    tipo: "email",
    asunto: "",
    // Si editas y tienes fecha_eliminacion en la notificación, cárgala
    ffecha_eliminacion: notificacion?.fecha_eliminacion
      ? new Date(notificacion.fecha_eliminacion)
      : null,
  });
  const [reservas, setReservas] = useState([]);
  const [loadingReservas, setLoadingReservas] = useState(false);

  useEffect(() => {
    const cargarReservas = async () => {
      try {
        setLoadingReservas(true);
        const response = await listarReservasRequest();
        setReservas(response);
      } catch (error) {
        console.error("Error al cargar reservas:", error);
      } finally {
        setLoadingReservas(false);
      }
    };

    cargarReservas();

    if (isEditing) {
      setFormData({
        id_reserva: notificacion.id_reserva,
        mensaje: notificacion.mensaje,
        tipo: notificacion.tipo,
        asunto: notificacion.asunto || "",
        fecha_eliminacion: notificacion.fecha_eliminacion
          ? new Date(notificacion.fecha_eliminacion)
          : null,
      });
    }
  }, [isEditing, notificacion]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleDateChange = (date) => {
    setFormData((prev) => ({ ...prev, fecha_eliminacion: date }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Antes de enviar al backend, convertir el objeto Date a string YYYY-MM-DD
      const dataToSend = {
        ...formData,
        fecha_eliminacion: formData.fecha_eliminacion
          ? formData.fecha_eliminacion.toISOString().split("T")[0]
          : null,
      };

      if (isEditing) {
        await actualizarNotificacionRequest(
          notificacion.id_notificacion,
          dataToSend
        );
      } else {
        await crearNotificacionRequest(dataToSend);
      }

      if (typeof onSuccess === "function") {
        onSuccess();
      } else {
        console.warn(
          "onSuccess prop is not a function or is missing in NotificacionForm."
        );
      }
    } catch (error) {
      console.error("Error al guardar notificación:", error);
      const errorMessage =
        error.response?.data?.message || "Error al guardar la notificación.";
      alert(errorMessage);
    }
  };

  const isAsuntoRequired = formData.tipo === "email";

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto my-8"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">
        {isEditing ? "Editar Notificación" : "Crear Nueva Notificación"}
      </h2>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">ID Reserva:</label>
        <select
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
                {res.id_reserva} - {res.nombre_cliente} ({res.fecha_sesion})
              </option>
            ))
          )}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">
          Tipo de Notificación:
        </label>
        <select
          name="tipo"
          value={formData.tipo}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          required
        >
          <option value="email">Email</option>
          <option value="sms">SMS</option>
          <option value="sistema">Sistema</option>
        </select>
      </div>

      {formData.tipo === "email" && (
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Asunto:</label>
          <input
            type="text"
            name="asunto"
            value={formData.asunto}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Asunto del correo"
            required={isAsuntoRequired}
          />
        </div>
      )}

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Mensaje:</label>
        <textarea
          name="mensaje"
          value={formData.mensaje}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 h-32"
          placeholder="Escriba el mensaje de la notificación"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">
          Fecha de Eliminación (opcional):
        </label>
        <DatePicker
          selected={formData.fecha_eliminacion} // El valor debe ser un objeto Date o null
          onChange={handleDateChange} // El manejador de cambios de DatePicker
          dateFormat="dd/MM/yyyy" // Formato visible en el input
          minDate={new Date()} // Impide seleccionar fechas pasadas
          placeholderText="Seleccione fecha de eliminación"
          className="w-full border rounded px-3 py-2" // Clases de Tailwind
          locale="es" // Usar el idioma español
          isClearable // Permite borrar la fecha
        />
        <p className="text-sm text-gray-500 mt-1">
          La notificación se eliminará automáticamente en esta fecha. Déjalo
          vacío para que persista.
        </p>
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
          {isEditing ? "Actualizar" : "Crear Notificación"}
        </button>
      </div>
    </form>
  );
};

export default NotificacionForm;
