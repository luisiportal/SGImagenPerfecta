import * as Yup from "yup";

export const ofertaSchema = Yup.object().shape({
  nombre_oferta: Yup.string()
    .required("El nombre de la oferta es obligatorio")
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(100, "El nombre no puede exceder los 100 caracteres"),
  descripcion: Yup.string()
    .required("La descripción es obligatoria")
    .max(500, "La descripción no puede exceder los 500 caracteres"),

  precio_venta: Yup.number()
    .typeError("El precio debe ser un número")
    .required("El precio es obligatorio")
    .positive("El precio debe ser un valor positivo")
    .test("is-decimal", "El precio puede tener hasta 2 decimales", (value) => {
      if (value === undefined || value === null) return true;
      return /^\d+(\.\d{1,2})?$/.test(value.toString());
    }),
  cantidad_fotos: Yup.number()
    .typeError("La cantidad de fotos debe ser un número")
    .required("La cantidad de fotos es obligatoria")
    .integer("La cantidad de fotos debe ser un número entero")
    .positive("La cantidad de fotos debe ser un valor positivo"),
  locacion: Yup.string()
    .required("La locación es obligatoria")
    .oneOf(["Estudio", "Exterior", "Ambas"], "Locación no válida"),
  transportacion: Yup.boolean()
    .required("El campo de transportación es obligatorio")
    .typeError("El campo de transportación debe ser un booleano"),
  cambios_ropa: Yup.number()
    .typeError("El número de cambios de ropa debe ser un número")
    .required("El número de cambios de ropa es obligatorio")
    .integer("El número de cambios de ropa debe ser un número entero")
    .positive("El número de cambios de ropa debe ser un valor positivo"),
});
