import { Form, Formik } from "formik";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/datepicker-custom.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import es from "date-fns/locale/es";

// Importa el nuevo schema de validación
import { reservaSchema } from "../validacionForm/schemaForm"; //

import Input from "../formulario/Input";
import {
  crearReservaRequest,
  actualizarReservaRequest,
  obtenerFechasReservadasRequest,
} from "../../api/reservas.api";
import { useOfertas } from "../../context/OfertaProvider";
import { useOfertaStore } from "../../Store/Oferta_personalizada.store";

registerLocale("es", es);

const ReservarForm = ({
  initialValues,
  onSubmit,
  onCancel,
  isEditing = false,
  onSuccess,
  onError,
}) => {
  const params = useParams();
  const navigate = useNavigate();

  const [formInitialValues, setFormInitialValues] = useState({
    nombre_cliente: "",
    apellidos: "",
    ci: "",
    telefono: "",
    correo_electronico: "", // Agrega el nuevo campo de correo electrónico
    fecha_sesion: null,
    id_oferta: params.id_oferta,
    oferta_personalizada: [], // Añade esto
  });

  const [reservedDates, setReservedDates] = useState([]);
  const { oferta_personalizada, setOferta_personalizada } = useOfertaStore();

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
    }
  }, [initialValues]);

  const handleSubmit = async (values, { setSubmitting }) => {
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
        id_oferta: values.id_oferta || null, // Asegurar que sea null si no hay oferta
        oferta_personalizada: values.id_oferta
          ? []
          : oferta_personalizada.map((s) => ({
              id_servicio: s.id_servicio,
              nombre_servicio: s.nombre_servicio,
              precio_servicio: s.precio_servicio,
              cantidad: s.cantidad || 1,
            })),
      };
      console.log("Fecha enviada:", fechaCompleta);
      if (isEditing) {
        await onSubmit(dataToSend);
      } else {
        const res = await crearReservaRequest(dataToSend);
        if (onSuccess) {
          onSuccess(res?.message || "Reserva creada con éxito!");
        }
        navigate("/");
      }
      setOferta_personalizada([]);
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

  return (
    <div className={isEditing ? "" : "mx-2 bg-neutral-200 rounded-md p-4"}>
      <h1 className="hidden">{isEditing ? "Editar Reserva" : "Reserva"}</h1>
      <div className="mt-2">
        <Formik
          initialValues={formInitialValues}
          onSubmit={handleSubmit}
          validationSchema={reservaSchema} // Aplica el schema de validación
          enableReinitialize={true}
        >
          {(
            {
              handleChange,
              values,
              errors,
              setFieldValue,
              isSubmitting,
              touched,
            } // Agrega 'touched' para mostrar errores solo después de interactuar con el campo
          ) => (
            <Form className="bg-neutral-200 max-w-md rounded-md p-4 mx-auto">
              <Input
                name={"nombre_cliente"}
                label={"Nombre"}
                type={"text"}
                value={values.nombre_cliente}
                handleChange={handleChange}
                errors={errors}
                touched={touched} // Pasa 'touched' al Input
              />
              <Input
                name={"apellidos"}
                label={"Apellidos"}
                type={"text"}
                value={values.apellidos}
                handleChange={handleChange}
                errors={errors}
                touched={touched} //
              />
              <Input
                name={"ci"}
                label={"Carnet Identidad"}
                type={"text"}
                value={values.ci}
                handleChange={handleChange}
                errors={errors}
                touched={touched} //
              />

              <Input
                name={"telefono"}
                label={"Teléfono Contacto"}
                type={"text"}
                value={values.telefono}
                handleChange={handleChange}
                errors={errors}
                touched={touched} //
              />

              {/* Nuevo campo para el correo electrónico */}
              <Input
                name={"correo_electronico"}
                label={"Correo Electrónico"}
                type={"email"} // Utiliza type="email" para validación básica del navegador
                value={values.correo_electronico}
                handleChange={handleChange}
                errors={errors}
                touched={touched} //
              />

              <div className="mb-4">
                <label
                  htmlFor="fecha_sesion"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Fecha de la Sesión
                </label>
                <DatePicker
                  id="fecha_sesion"
                  name="fecha_sesion"
                  selected={values.fecha_sesion}
                  onChange={(date) => setFieldValue("fecha_sesion", date)}
                  dateFormat="dd/MM/yyyy"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  minDate={new Date()}
                  excludeDates={reservedDates}
                  filterDate={(date) => {
                    const day = date.getDay();
                    return day !== 0; // Deshabilita domingos
                  }}
                  placeholderText="Selecciona una fecha"
                  locale="es"
                />
                {errors.fecha_sesion &&
                  touched.fecha_sesion && ( // Muestra el error solo si el campo ha sido tocado
                    <div className="text-red-500 text-xs italic mt-1">
                      {errors.fecha_sesion}
                    </div>
                  )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-st_color w-full text-2md text-black font-bold block p-2 rounded-md mt-4"
              >
                {isSubmitting
                  ? isEditing
                    ? "Actualizando..."
                    : "Reservando..."
                  : isEditing
                    ? "Guardar Cambios"
                    : "Reservar"}
              </button>
              {isEditing && (
                <button
                  type="button"
                  onClick={onCancel}
                  className="mt-2 bg-gray-500 hover:bg-gray-700 text-white font-bold w-full p-2 rounded-md"
                >
                  Cancelar
                </button>
              )}
              <br />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ReservarForm;
