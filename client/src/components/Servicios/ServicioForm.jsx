import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  crearServicioRequest,
  listarUnServicioRequest,
  actualizarServicioRequest,
} from "../../api/servicios.api";
import Input from "../formulario/Input";
import ConfirmModal from "../ConfirmModal";
import Notificacion from "../validacionForm/Notificacion";
import { servicioSchema } from "../validacionForm/servicioSchema";

const ServicioForm = ({ id: propId, onClose }) => {
  const [servicio, setServicio] = useState({
    nombre_servicio: "",
    descripcion_servicio: "",
    precio_servicio: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const [showGenericModal, setShowGenericModal] = useState(false);
  const [genericModalMessage, setGenericModalMessage] = useState("");
  const [genericModalType, setGenericModalType] = useState("confirm");
  const [genericModalTitle, setGenericModalTitle] = useState("");

  const [notificacionMsg, setNotificacionMsg] = useState(null);
  const navigate = useNavigate();
  const { id: paramId } = useParams();
  const servicioId = propId || paramId;

  useEffect(() => {
    if (servicioId) {
      const fetchServicio = async () => {
        try {
          setLoading(true);
          const response = await listarUnServicioRequest(servicioId);
          if (response && response.nombre_servicio) {
            setServicio({
              nombre_servicio: response.nombre_servicio || "",
              descripcion_servicio: response.descripcion_servicio || "",
              precio_servicio: response.precio_servicio || "",
            });
            setErrors({});
          } else {
            console.error(
              "Servicio no encontrado o datos incompletos:",
              response
            );
            setNotificacionMsg({
              mensaje: "Servicio no encontrado.",
              errorColor: true,
            });
            setTimeout(() => {
              setNotificacionMsg(null);
              if (onClose) onClose();
              else navigate("/servicios");
            }, 3000);
          }
        } catch (err) {
          console.error("Error al cargar el servicio:", err);
          setNotificacionMsg({
            mensaje:
              err.response?.data?.message || "Error al cargar el servicio.",
            errorColor: true,
          });
          setTimeout(() => setNotificacionMsg(null), 3000);
        } finally {
          setLoading(false);
        }
      };
      fetchServicio();
    } else {
      setServicio({
        nombre_servicio: "",
        descripcion_servicio: "",
        precio_servicio: "",
      });
      setErrors({});
    }
  }, [servicioId, onClose, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue =
      name === "descripcion_servicio" && value.trim() === "" ? null : value;
    setServicio({ ...servicio, [name]: newValue });
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await servicioSchema.validate(servicio, { abortEarly: false });
      setErrors({});

      let responseMessage = "";
      if (servicioId) {
        await actualizarServicioRequest(servicioId, servicio);
        responseMessage = "Se ha actualizado el servicio correctamente.";
      } else {
        await crearServicioRequest(servicio);
        responseMessage = "Se ha creado el servicio correctamente.";
      }

      setGenericModalMessage(responseMessage);
      setGenericModalType("success");
      setGenericModalTitle("¡Éxito!");
      setShowGenericModal(true);
    } catch (err) {
      if (err.name === "ValidationError") {
        const newErrors = {};
        err.inner.forEach((error) => {
          newErrors[error.path] = error.message;
        });
        setErrors(newErrors);
      } else if (err.response?.status === 401) {
        setNotificacionMsg({
          mensaje: "Debes iniciar sesión para realizar esta acción",
          errorColor: true,
        });
        setTimeout(() => {
          setNotificacionMsg(null);
          navigate("/login");
        }, 2000);
      } else {
        setNotificacionMsg({
          mensaje:
            err.response?.data?.message || "Error al guardar el servicio.",
          errorColor: true,
        });
        setTimeout(() => setNotificacionMsg(null), 3000);
      }
      console.error(err);
    }
  };

  const handleCancelClick = () => {
    setGenericModalMessage(
      "¿Estás seguro de que quieres cancelar? Los cambios no guardados se perderán."
    );
    setGenericModalType("confirm");
    setGenericModalTitle("Confirmar Cancelación");
    setShowGenericModal(true);
  };

  const handleGenericModalConfirm = () => {
    setShowGenericModal(false);
    if (genericModalType === "confirm") {
      if (onClose) onClose();
      else navigate("/servicios");
    } else if (genericModalType === "success") {
      if (onClose) onClose();
      else navigate("/servicios");
    }
  };

  const handleGenericModalCancel = () => {
    setShowGenericModal(false);
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-xl">
      {loading ? (
        <p className="text-center text-gray-600">Cargando...</p>
      ) : servicioId &&
        Object.keys(errors).length > 0 &&
        errors.generalError ? (
        <div>
          <p className="text-red-500 text-center">{errors.generalError}</p>
          <button
            onClick={handleCancelClick}
            className="mt-4 px-6 py-3 rounded-lg bg-gray-300 text-gray-800 font-semibold hover:bg-gray-400 transition-colors duration-200 ease-in-out w-full"
          >
            Volver
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Input
              name="nombre_servicio"
              label="Nombre del Servicio"
              type="text"
              value={servicio.nombre_servicio || ""}
              handleChange={handleChange}
              errors={errors}
            />
          </div>
          <div>
            <Input
              name="descripcion_servicio"
              label="Descripción"
              type="textarea"
              value={servicio.descripcion_servicio || ""}
              handleChange={handleChange}
              errors={errors}
            />
          </div>
          <div>
            <Input
              name="precio_servicio"
              label="Precio"
              type="number"
              value={servicio.precio_servicio || ""}
              handleChange={handleChange}
              errors={errors}
              step="0.01"
            />
          </div>
          <div className="flex justify-end gap-4 mt-8">
            <button
              type="button"
              onClick={handleCancelClick}
              className="px-6 py-3 rounded-lg bg-gray-300 text-gray-800 font-semibold hover:bg-gray-400 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {servicioId ? "Aplicar cambios" : "Agregar"}
            </button>
          </div>
        </form>
      )}

      <ConfirmModal
        isOpen={showGenericModal}
        message={genericModalMessage}
        onConfirm={handleGenericModalConfirm}
        onCancel={handleGenericModalCancel}
        type={genericModalType}
        title={genericModalTitle}
      />

      {notificacionMsg && (
        <div
          onClick={() => setNotificacionMsg(null)}
          className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50 p-4"
        >
          <Notificacion
            mensaje={notificacionMsg.mensaje}
            errorColor={notificacionMsg.errorColor}
          />
        </div>
      )}
    </div>
  );
};

export default ServicioForm;
