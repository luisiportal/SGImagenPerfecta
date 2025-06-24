import { Form, Formik } from "formik";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/datepicker-custom.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import { reservaSchema } from "../validacionForm/schemaForm";
import Input from "../formulario/Input";
import {
  crearReservaRequest,
  obtenerFechasReservadasRequest,
} from "../../api/reservas.api";
import { useOfertaStore } from "../../Store/Oferta_personalizada.store";
import ConfirmModal from "../Modal/ConfirmModal";

registerLocale("es", es);

const ReservarForm = ({
  initialValues,
  onSubmit,
  isEditing = false,
  isModal = false,
  onCloseModal,
  onGoBackToServicios,
}) => {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { oferta_personalizada, setOferta_personalizada } = useOfertaStore();

  const [showGenericModal, setShowGenericModal] = useState(false);
  const [genericModalMessage, setGenericModalMessage] = useState("");
  const [genericModalType, setGenericModalType] = useState("confirm"); // Puede ser 'confirm' o 'success' o 'error'
  const [genericModalTitle, setGenericModalTitle] = useState("");

  const [formInitialValues, setFormInitialValues] = useState({
    nombre_cliente: "",
    apellidos: "",
    ci: "",
    telefono: "",
    correo_electronico: "",
    fecha_sesion: null,
    id_oferta: params.id_oferta || null,
    oferta_personalizada:
      location.state?.serviciosSeleccionados || oferta_personalizada || [],
  });

  const [reservedDates, setReservedDates] = useState([]);

  const minDateAllowed = new Date();
  minDateAllowed.setDate(minDateAllowed.getDate() + 3);
  minDateAllowed.setHours(0, 0, 0, 0);

  useEffect(() => {
    setDefaultLocale("es");

    const loadReservedDates = async () => {
      try {
        const dates = await obtenerFechasReservadasRequest();
        const dateObjects = dates.map(
          (dateStr) => new Date(`${dateStr}T00:00:00`)
        );
        setReservedDates(dateObjects);
      } catch (error) {
        console.error("Error al cargar fechas reservadas:", error);
      }
    };
    loadReservedDates();
  }, []);

  useEffect(() => {
    if (initialValues) {
      const formattedDate = initialValues.fecha_sesion
        ? new Date(`${initialValues.fecha_sesion}T00:00:00`)
        : null;
      setFormInitialValues({
        ...initialValues,
        fecha_sesion: formattedDate,
        oferta_personalizada: initialValues.oferta_personalizada || [],
      });
    } else if (location.state?.serviciosSeleccionados) {
      setFormInitialValues((prev) => ({
        ...prev,
        oferta_personalizada: location.state.serviciosSeleccionados,
      }));
      setOferta_personalizada(location.state.serviciosSeleccionados);
    }
  }, [initialValues, location.state, setOferta_personalizada]);

  const handleSubmit = async (
    values,
    { setSubmitting, resetForm, setErrors }
  ) => {
    setSubmitting(true);
    try {
      const fechaCompleta = values.fecha_sesion
        ? `${values.fecha_sesion.getFullYear()}-${String(
            values.fecha_sesion.getMonth() + 1
          ).padStart(
            2,
            "0"
          )}-${String(values.fecha_sesion.getDate()).padStart(2, "0")}`
        : null;

      const dataToSend = {
        ...values,
        fecha_sesion: fechaCompleta,
        id_oferta: values.id_oferta || null,
        oferta_personalizada: values.id_oferta
          ? []
          : oferta_personalizada.map((s) => ({
              id_servicio: s.id_servicio,
              nombre_servicio: s.nombre_servicio,
              precio_servicio: s.precio_servicio,
              cantidad: s.cantidad || 1,
            })),
      };

      if (isEditing) {
        await onSubmit(dataToSend);
      } else {
        const res = await crearReservaRequest(dataToSend);
        setGenericModalMessage(res?.message || "La reserva ha sido creada!");
        setGenericModalType("success");
        setGenericModalTitle("¡Reserva Confirmada!");
        setShowGenericModal(true);

        resetForm();
        if (values.id_oferta === null) {
          setOferta_personalizada([]);
        }
      }
    } catch (error) {
      console.error(
        "Error al procesar reserva:",
        error.response?.data || error.message
      );

      if (error.response?.data?.field === "ci") {
        setErrors({
          ci: "Ya existe una reserva con este CI. Por favor verifica tus datos.",
        });
      } else if (error.response?.data?.fields?.includes("nombre_cliente")) {
        setErrors({
          nombre_cliente: "Ya existe una reserva con este nombre y apellidos.",
          apellidos: "Ya existe una reserva con este nombre y apellidos.",
        });
      } else {
        setGenericModalMessage(
          error.response?.data?.message ||
            "Error al crear la reserva. Por favor intenta nuevamente."
        );
        setGenericModalType("error");
        setGenericModalTitle("Error");
        setShowGenericModal(true);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancelAction = () => {
    if (isModal && !isEditing && oferta_personalizada.length > 0) {
      if (onGoBackToServicios) {
        onGoBackToServicios();
      } else if (onCloseModal) {
        onCloseModal();
      }
    } else {
      setGenericModalMessage(
        "¿Estás seguro de que quieres cancelar? Los datos ingresados se perderán."
      );
      setGenericModalType("confirm");
      setGenericModalTitle("Confirmar Cancelación");
      setShowGenericModal(true);
    }
  };

  const handleGenericModalConfirm = () => {
    if (genericModalType === "confirm") {
      if (isModal && onCloseModal) {
        onCloseModal();
      } else {
        // navigate(-1);
      }
    } else if (genericModalType === "success") {
      setOferta_personalizada([]);
      if (isModal && onCloseModal) {
        onCloseModal();
      } else {
        // navigate(-1);
      }
    }
    setShowGenericModal(false);
  };

  const handleGenericModalCancel = () => {
    setShowGenericModal(false);
  };

  const calcularPrecioOfertaPersonalizada = (servicios) => {
    const total = servicios.reduce(
      (total, servicio) =>
        total + (Number(servicio.precio_servicio * servicio.cantidad) || 0),
      0
    );
    return total;
  };

  const content = (
    <div
      className={
        isEditing || isModal ? "" : "mx-2 bg-neutral-200 rounded-md p-4"
      }
    >
      <h1 className="hidden">{isEditing ? "Editar Reserva" : "Reserva"}</h1>
      <div className="mt-2">
        <Formik
          initialValues={formInitialValues}
          onSubmit={handleSubmit}
          validationSchema={reservaSchema}
          enableReinitialize={true}
        >
          {({
            handleChange,
            values,
            errors,
            setFieldValue,
            isSubmitting,
            touched,
            resetForm,
            validateForm,
            setFieldTouched,
          }) => (
            <Form className="bg-neutral-200 max-w-md rounded-md p-4 mx-auto">
              {values.id_oferta === null && oferta_personalizada.length > 0 && (
                <div className="mb-4">
                  <div className="flex justify-between items-baseline mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Servicios Seleccionados:
                    </h3>
                  </div>
                  <div className="space-y-2">
                    {oferta_personalizada.map((servicio) => (
                      <div
                        key={servicio.id_servicio}
                        className="flex justify-between items-center bg-gray-100 p-2 rounded-md"
                      >
                        <div className="flex-1 flex justify-between items-center pr-2">
                          <span className="flex-grow ">
                            {" "}
                            <h3 className=" font-bold text-red-500 inline">
                              {servicio.cantidad} x{" "}
                            </h3>
                            {servicio.nombre_servicio}
                          </span>
                          <span className="w-20 text-right text-red-400 ">
                            (${Number(servicio.precio_servicio).toFixed(2)})
                          </span>
                        </div>
                        <span className="w-24 text-right font-bold text-red-500">
                          $
                          {(
                            Number(servicio.precio_servicio) * servicio.cantidad
                          ).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-2 border-t border-gray-300 flex justify-between items-baseline">
                    <h2 className="text-xl font-bold text-gray-800">
                      Precio Total:
                    </h2>
                    <div className="text-2xl font-extrabold text-red-600">
                      $
                      {calcularPrecioOfertaPersonalizada(
                        oferta_personalizada
                      ).toFixed(2)}
                    </div>
                  </div>
                </div>
              )}
              <Input
                name={"nombre_cliente"}
                label={"Nombre"}
                type={"text"}
                value={values.nombre_cliente}
                handleChange={handleChange}
                errors={errors}
                touched={touched}
              />
              <Input
                name={"apellidos"}
                label={"Apellidos"}
                type={"text"}
                value={values.apellidos}
                handleChange={handleChange}
                errors={errors}
                touched={touched}
              />
              <Input
                name={"ci"}
                label={"Carnet Identidad"}
                type={"text"}
                value={values.ci}
                handleChange={handleChange}
                errors={errors}
                touched={touched}
              />
              <Input
                name={"telefono"}
                label={"Teléfono Contacto"}
                type={"text"}
                value={values.telefono}
                handleChange={handleChange}
                errors={errors}
                touched={touched}
              />
              <Input
                name={"correo_electronico"}
                label={"Correo Electrónico"}
                type={"email"}
                value={values.correo_electronico}
                handleChange={handleChange}
                errors={errors}
                touched={touched}
              />
              <div className="mb-4">
                <label
                  htmlFor="fecha_sesion"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Fecha de la Sesión
                </label>
                <div className="flex justify-center w-full">
                  <DatePicker
                    id="fecha_sesion"
                    name="fecha_sesion"
                    selected={values.fecha_sesion}
                    onChange={(date) => {
                      setFieldValue("fecha_sesion", date);
                      setFieldTouched("fecha_sesion", true, false);
                    }}
                    dateFormat="dd/MM/yyyy"
                    minDate={minDateAllowed}
                    excludeDates={reservedDates.filter(
                      (date) =>
                        !values.fecha_sesion ||
                        date.toISOString().split("T")[0] !==
                          values.fecha_sesion.toISOString().split("T")[0]
                    )}
                    filterDate={(date) => {
                      const day = date.getDay();
                      return day !== 0;
                    }}
                    placeholderText="Selecciona una fecha"
                    locale="es"
                    onMonthChange={() => {
                      document.activeElement && document.activeElement.blur();
                    }}
                  />
                </div>
                {values.fecha_sesion && (
                  <div className="text-center mt-2">
                    <span
                      className="px-3 py-1 rounded-md text-white font-medium"
                      style={{ backgroundColor: "#4caf50" }}
                    >
                      Fecha seleccionada:{" "}
                      {values.fecha_sesion.toLocaleDateString("es-ES", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                )}
                {errors.fecha_sesion && touched.fecha_sesion && (
                  <div className="bg-red-500 p-1 m-1 rounded">
                    {errors.fecha_sesion}
                  </div>
                )}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                onClick={async () => {
                  await setFieldTouched("fecha_sesion", true, true);
                  const currentErrors = await validateForm();
                  if (currentErrors.fecha_sesion) {
                    console.log(
                      "Error de validación en fecha_sesion:",
                      currentErrors.fecha_sesion
                    );
                  }
                }}
                className="bg-st_color w-full text-2md text-black font-bold block p-2 rounded-md mt-4 hover:bg-amber-600 transition-all duration-500 ease-in-out"
              >
                {isSubmitting
                  ? isEditing
                    ? "Actualizando..."
                    : "Reservando..."
                  : isEditing
                    ? "Guardar Cambios"
                    : "Reservar"}
              </button>
              <button
                type="button"
                onClick={handleCancelAction}
                className="mt-2 bg-gray-500 hover:bg-gray-700 text-white font-bold w-full p-2 rounded-md"
              >
                Cancelar
              </button>
            </Form>
          )}
        </Formik>
      </div>
      <ConfirmModal
        isOpen={showGenericModal}
        message={genericModalMessage}
        onConfirm={handleGenericModalConfirm}
        onCancel={handleGenericModalCancel}
        type={genericModalType}
        title={genericModalTitle}
      />
    </div>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4 my-8 max-h-[90vh] overflow-y-auto">
          <button
            onClick={handleCancelAction}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            ×
          </button>
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Crear Reserva Personalizada
          </h2>
          {content}
        </div>
      </div>
    );
  }

  return content;
};

export default ReservarForm;
