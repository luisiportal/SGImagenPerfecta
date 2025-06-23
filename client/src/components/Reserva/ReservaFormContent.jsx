import { Form } from "formik";
import Input from "../formulario/Input";
import { ServiciosSeleccionados } from "./ServiciosSeleccionados";
import { CustomDatePicker } from "./CustomDatePicker";

export const ReservaFormContent = ({
  values,
  errors,
  touched,
  handleChange,
  setFieldValue,
  setFieldTouched,
  isSubmitting,
  validateForm,
  isEditing,
  oferta_personalizada,
  minDateAllowed,
  reservedDates,
  handleCancelAction,
}) => {
  // Verificar si es una oferta personalizada
  const isOfertaPersonalizada =
    values.id_oferta === null && oferta_personalizada.length > 0;

  return (
    <Form className="bg-neutral-200 max-w-md rounded-md p-4 mx-auto">
      {/* Mostrar servicios solo si es una oferta personalizada */}
      {isOfertaPersonalizada && !isEditing && (
        <ServiciosSeleccionados servicios={oferta_personalizada} />
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

      <CustomDatePicker
        selected={values.fecha_sesion}
        onChange={(date) => {
          setFieldValue("fecha_sesion", date);
          setFieldTouched("fecha_sesion", true, false);
        }}
        minDate={minDateAllowed}
        excludeDates={reservedDates.filter(
          (date) =>
            !values.fecha_sesion ||
            date.toISOString().split("T")[0] !==
              values.fecha_sesion.toISOString().split("T")[0]
        )}
        errors={errors.fecha_sesion}
        touched={touched.fecha_sesion}
      />

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
  );
};
