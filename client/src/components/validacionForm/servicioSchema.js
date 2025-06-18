import * as yup from "yup";

export const servicioSchema = yup.object().shape({
  nombre_servicio: yup
    .string()
    .required("El nombre del servicio es obligatorio")
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(100, "El nombre no puede exceder los 100 caracteres"),
  descripcion_servicio: yup
    .string()
    .max(500, "La descripción no puede exceder los 500 caracteres")
    .transform((value) => (!value?.trim() ? null : value)) // Convierte "  ", "\t\t", etc. → null
    .nullable(), // Permite valores nulos
  precio_servicio: yup
    .number()
    .typeError("El precio debe ser un número")
    .required("El precio es obligatorio")
    .positive("El precio debe ser un valor positivo")
    .test("is-decimal", "El precio puede tener hasta 2 decimales", (value) => {
      if (value === undefined || value === null) return true;
      return /^\d+(\.\d{1,2})?$/.test(value.toString());
    }),
});
