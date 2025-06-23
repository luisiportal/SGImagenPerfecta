import { Formik } from "formik";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import { reservaSchema } from "../validacionForm/schemaForm";
import { useOfertaStore } from "../../Store/Oferta_personalizada.store";
import ConfirmModal from "../Modal/ConfirmModal";
import { ReservaFormContent } from "./ReservaFormContent";
import { ReservaModal } from "./ReservaModal";
import {
  crearReservaRequest,
  obtenerFechasReservadasRequest,
} from "../../api/reservas.api";

registerLocale("es", es);

export const ReservarForm = ({
  initialValues,
  onSubmit,
  isEditing = false,
  isModal = false,
  onCloseModal,
  onGoBackToServicios,
  returnToDetails = false,
  onCancel,
}) => {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { oferta_personalizada, setOferta_personalizada } = useOfertaStore();

  const [showGenericModal, setShowGenericModal] = useState(false);
  const [genericModalMessage, setGenericModalMessage] = useState("");
  const [genericModalType, setGenericModalType] = useState("confirm");
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
    pagado: false,
  });

  const [reservedDates, setReservedDates] = useState([]);
  const [minDateAllowed] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() + 3);
    date.setHours(0, 0, 0, 0);
    return date;
  });

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

      // Asegurar que oferta_personalizada tenga la estructura correcta
      const safeOfertaPersonalizada = initialValues.oferta_personalizada
        ?.ofertas_servicios
        ? initialValues.oferta_personalizada
        : {
            ofertas_servicios: Array.isArray(initialValues.oferta_personalizada)
              ? initialValues.oferta_personalizada
              : [],
          };

      setFormInitialValues({
        ...initialValues,
        fecha_sesion: formattedDate,
        oferta_personalizada: safeOfertaPersonalizada,
      });
    }
  }, [initialValues]);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
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

      const obtenerServicios = (oferta) => {
        if (!oferta) return [];
        // Si es un objeto con ofertas_servicios, usa esa propiedad
        if (
          oferta.ofertas_servicios &&
          Array.isArray(oferta.ofertas_servicios)
        ) {
          return oferta.ofertas_servicios;
        }
        // Si es un array directamente, úsalo
        if (Array.isArray(oferta)) {
          return oferta;
        }
        return [];
      };

      const serviciosParaEnviar = values.id_oferta
        ? []
        : obtenerServicios(
            oferta_personalizada || initialValues?.oferta_personalizada
          ).map((s) => ({
            id_servicio: s.id_servicio,
            nombre_servicio: s.nombre_servicio,
            precio_servicio: s.precio_servicio,
            cantidad: s.cantidad || 1,
          }));

      const dataToSend = {
        ...values,
        fecha_sesion: fechaCompleta,
        id_oferta: values.id_oferta || null,
        oferta_personalizada: serviciosParaEnviar,
      };

      console.log("Datos enviados:", dataToSend);
      console.log(isEditing);
      if (isEditing) {
        await onSubmit(dataToSend);
      } else {
        const res = await crearReservaRequest(dataToSend);
        setGenericModalMessage(res?.message || "Reserva creada con éxito!");
        setGenericModalType("success");
        setGenericModalTitle("¡Reserva Confirmada!");
        setShowGenericModal(true);
        resetForm();
        if (values.id_oferta !== null) {
          setOferta_personalizada([]);
        }
      }
    } catch (error) {
      console.error(
        "Error al procesar reserva:",
        error.response?.data || error.message
      );
      if (onError) {
        onError(error.response?.data?.message || "Error al crear la reserva.");
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
        console.log("55");
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
      if (onCloseModal) {
        onCloseModal(isEditing ? true : returnToDetails);
      } else if (onCancel && isEditing) {
        console.log("44");
        onCancel(true);
      } else {
        console.log("33");
        navigate(-1);
      }
    } else if (genericModalType === "success") {
      setOferta_personalizada([]);
      if (isEditing) {
        console.log("11");
        if (onCloseModal) {
          console.log("00");
          onCloseModal();
        }
      } else {
        console.log("22");
        navigate(-1); // Navega a la página anterior solo si NO estás editando
      }
    }
    console.log("99");
    setShowGenericModal(false);
  };

  const handleGenericModalCancel = () => {
    console.log("88");
    setShowGenericModal(false);
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
          {(formikProps) => (
            <ReservaFormContent
              {...formikProps}
              isEditing={isEditing}
              oferta_personalizada={oferta_personalizada}
              minDateAllowed={minDateAllowed}
              reservedDates={reservedDates}
              handleCancelAction={handleCancelAction}
            />
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
      <ReservaModal
        onClose={() => onCloseModal(isEditing ? true : returnToDetails)}
        title="Crear Reserva Personalizada"
      >
        {content}
      </ReservaModal>
    );
  }

  return content;
};

export default ReservarForm;
