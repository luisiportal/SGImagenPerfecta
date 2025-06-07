import { Form, Formik } from "formik";
import { useOfertas } from "../context/OfertaProvider";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  actualizarOfertaRequest,
  crearOfertaRequest,
  listarunOfertaRequest,
} from "../api/ofertas.api";
import Entradas from "./formulario/Entradas";
import ConfirmModal from "./ConfirmModal";
import Notificacion from "./validacionForm/Notificacion";

const OfertaForm = () => {
  const [file, setFile] = useState(null);
  const [oferta, setOferta] = useState({
    id_oferta: "",
    nombre_oferta: "",
    descripcion: "",
    precio_venta: "",
    cantidad_fotos: "", // Nuevo campo
    locacion: "", // Nuevo campo
    transportacion: false, // Nuevo campo, inicializado como booleano
    cambios_ropa: "", // Nuevo campo
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
            cantidad_fotos: ofertaData.cantidad_fotos, // Cargar nuevo campo
            locacion: ofertaData.locacion, // Cargar nuevo campo
            transportacion: ofertaData.transportacion, // Cargar nuevo campo
            cambios_ropa: ofertaData.cambios_ropa, // Cargar nuevo campo
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
      const dataToSend = {
        ...values,
        precio_venta: parseFloat(values.precio_venta),
        cantidad_fotos: parseInt(values.cantidad_fotos), // Asegurarse de que sea número
        cambios_ropa: parseInt(values.cambios_ropa), // Asegurarse de que sea número
        transportacion: Boolean(values.transportacion), // Asegurarse de que sea booleano
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
      console.error("Error al guardar la oferta:", error);
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

              <Entradas
                values={values}
                handleChange={handleChange}
                errors={errors}
              />

              {/* Nuevos campos */}
              <div>
                <label
                  htmlFor="cantidad_fotos"
                  className="block text-sm font-medium text-gray-700"
                >
                  Cantidad de Fotos
                </label>
                <input
                  type="number"
                  name="cantidad_fotos"
                  id="cantidad_fotos"
                  onChange={handleChange}
                  value={values.cantidad_fotos}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {errors.cantidad_fotos && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.cantidad_fotos}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="locacion"
                  className="block text-sm font-medium text-gray-700"
                >
                  Locación
                </label>
                <select
                  name="locacion"
                  id="locacion"
                  onChange={handleChange}
                  value={values.locacion}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="">Selecciona una opción</option>
                  <option value="Estudio">Estudio</option>
                  <option value="Exterior">Exterior</option>
                  <option value="Ambas">Ambas</option>
                </select>
                {errors.locacion && (
                  <p className="mt-2 text-sm text-red-600">{errors.locacion}</p>
                )}
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="transportacion"
                  id="transportacion"
                  onChange={handleChange}
                  checked={values.transportacion}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label
                  htmlFor="transportacion"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Incluye Transportación
                </label>
                {errors.transportacion && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.transportacion}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="cambios_ropa"
                  className="block text-sm font-medium text-gray-700"
                >
                  Número de Cambios de Ropa
                </label>
                <input
                  type="number"
                  name="cambios_ropa"
                  id="cambios_ropa"
                  onChange={handleChange}
                  value={values.cambios_ropa}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {errors.cambios_ropa && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.cambios_ropa}
                  </p>
                )}
              </div>

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
