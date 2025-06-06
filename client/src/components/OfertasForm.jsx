import { Form, Formik } from "formik";
import { useOfertas } from "../context/OfertaProvider"; // Asumo que este contexto es para manejar ofertas
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
// import * as Yup from "yup"; // Ya no es necesario importar Yup aquí si el esquema viene de otro archivo
import {
  actualizarOfertaRequest,
  crearOfertaRequest,
  listarunOfertaRequest,
} from "../api/ofertas.api";
import Entradas from "./formulario/Entradas"; // Asegúrate de que este componente maneje los tipos de entrada correctamente
import ConfirmModal from "./ConfirmModal";
import Notificacion from "./validacionForm/Notificacion";
// import schema from './validacionForm/schema'; // ¡Asegúrate de que esta ruta sea correcta!

const OfertaForm = () => {
  const [file, setFile] = useState(null); // Para manejo de archivos/imágenes
  const [oferta, setOferta] = useState({
    // ¡Ojo! id_oferta: Date.now() genera un ID en el frontend.
    // Asegúrate de que tu backend no genere un ID duplicado y que use autoIncrement.
    // Si es para un nuevo registro, usualmente no se envía el ID.
    id_oferta: "", // Mejor inicializarlo vacío si es para creación
    nombre_oferta: "",
    descripcion: "",
    precio_venta: "",
  });

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [notificacion_msg, setNotificacion_msg] = useState(null);

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loadOferta = async () => {
      if (params.id_oferta) {
        try {
          const ofertaData = await listarunOfertaRequest(params.id_oferta);
          setOferta({
            id_oferta: ofertaData.id_oferta,
            nombre_oferta: ofertaData.nombre_oferta,
            descripcion: ofertaData.descripcion,
            precio_venta: ofertaData.precio_venta,
          });
        } catch (error) {
          console.error("Error al cargar la oferta:", error);
          setNotificacion_msg({
            mensaje: "Error al cargar la oferta.",
            errorColor: true,
          });
        }
      }
    };
    loadOferta();
  }, [params.id_oferta]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      let res;
      // Pre-procesar values si es necesario, por ejemplo, convertir precio_venta a número si no lo hace Formik
      const dataToSend = {
        ...values,
        precio_venta: parseFloat(values.precio_venta), // Asegurarse de que sea un número antes de enviar
      };

      if (params.id_oferta) {
        res = await actualizarOfertaRequest(params.id_oferta, dataToSend);
        setNotificacion_msg({
          mensaje: "Se ha actualizado la oferta correctamente.",
          errorColor: false,
        });
      } else {
        res = await crearOfertaRequest(dataToSend);
        setNotificacion_msg({
          mensaje: "Se ha creado la oferta correctamente.",
          errorColor: false,
        });
      }
      setTimeout(() => {
        setNotificacion_msg(null);
        navigate("/ofertas");
      }, 2000);
    } catch (error) {
      console.error("Error al guardar la oferta:", error); // Usar console.error para errores
      // Capturar el mensaje de error del backend si está disponible
      const errorMessage =
        error.response?.data?.message ||
        "Error desconocido al guardar la oferta.";
      setNotificacion_msg({
        mensaje: "Error al guardar la oferta: " + errorMessage,
        errorColor: true,
      });
      setTimeout(() => {
        setNotificacion_msg(null);
      }, 3000);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancelClick = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmCancel = () => {
    setShowConfirmModal(false);
    navigate("/ofertas");
  };

  const handleCloseConfirmModal = () => {
    setShowConfirmModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-lg mt-8">
        <h1 className="text-center text-3xl md:text-4xl font-extrabold text-gray-800 mb-8">
          {params.id_oferta ? "Editar Oferta" : "Agregar Oferta"}
        </h1>

        <Formik
          initialValues={oferta}
          enableReinitialize={true}
          onSubmit={handleSubmit}
          // validationSchema={schema} // Usando el esquema importado
        >
          {({ handleChange, handleSubmit, errors, values, isSubmitting }) => (
            <Form onSubmit={handleSubmit} className="space-y-6">
              {file && (
                <div className="flex justify-center mb-6">
                  <img
                    className="w-48 h-48 object-cover rounded-lg shadow-md border-2 border-gray-200"
                    src={URL.createObjectURL(file)}
                    alt="Previsualización"
                  />
                </div>
              )}

              {/* Componente Entradas para campos generales */}
              {/* Asegúrate de que Entradas maneje los campos de Oferta: nombre_oferta, descripcion, precio_venta */}
              {/* Es posible que Entradas necesite ser más genérico o que necesites un componente específico para Ofertas */}
              <Entradas
                values={values}
                handleChange={handleChange}
                errors={errors}
              />

              <div className="flex justify-end gap-4 mt-8">
                <button
                  type="button"
                  onClick={handleCancelClick}
                  className="px-6 py-3 rounded-lg bg-gray-300 text-gray-800 font-semibold
                             hover:bg-gray-400 transition-colors duration-200 ease-in-out
                             focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-6 py-3 rounded-lg text-white font-semibold
                             transition-colors duration-200 ease-in-out
                             focus:outline-none focus:ring-2 focus:ring-offset-2
                             ${
                               isSubmitting
                                 ? "bg-blue-400 cursor-not-allowed"
                                 : "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
                             }`}
                >
                  {params.id_oferta
                    ? "Aplicar cambios"
                    : isSubmitting
                      ? "Guardando..."
                      : "Agregar"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      <ConfirmModal
        isOpen={showConfirmModal}
        message="¿Estás seguro de que quieres cancelar? Los cambios no guardados se perderán."
        onConfirm={handleConfirmCancel}
        onCancel={handleCloseConfirmModal}
      />

      {notificacion_msg && (
        <div
          onClick={() => setNotificacion_msg(null)}
          className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50 p-4"
        >
          <Notificacion
            mensaje={notificacion_msg.mensaje}
            errorColor={notificacion_msg.errorColor}
          />
        </div>
      )}
    </div>
  );
};

export default OfertaForm;
