// src/validacionForm/schemaTrabajadores.js
import * as Yup from "yup";

export const schemaTrabajadores = (
  isEditing // Aceptar isEditing como argumento
) =>
  Yup.object({
    usuario: Yup.string()
      .required("Campo requerido")
      .matches(
        /^[a-zA-Z0-9-. ñÑ áéíóúÁÉÍÓÚ]*$/,
        "Solo se permiten letras, números, guiones y puntos"
      )
      .max(20, "El nombre de usuario no debe tener más de 20 caracteres"),

    password: Yup.string().when("$isEditing", {
      is: true,
      then: (schema) =>
        schema.test(
          "min-length",
          "La contraseña debe tener al menos 8 caracteres",
          (value, context) => {
            if (context.options.context.$isEditing && !value) {
              return true;
            }
            return value && value.length >= 8;
          }
        ),
      otherwise: (schema) =>
        schema
          // .required("Campo requerido")
          .min(8, "La contraseña debe tener al menos 8 caracteres"),
    }),
    confirmPassword: Yup.string().when("password", {
      is: (password) => password && password.length > 0,
      then: (schema) =>
        schema
          .required("Confirma tu contraseña")
          .oneOf([Yup.ref("password")], "Las contraseñas deben coincidir"),
      otherwise: (schema) => schema.notRequired(),
    }),

    nombre: Yup.string()
      .required("Campo requerido")
      .matches(
        /^[a-zA-Z ñÑ áéíóúÁÉÍÓÚ]*$/,
        "Solo se permiten letras y espacios"
      )
      .max(20, "El nombre no debe tener más de 20 caracteres"),

    apellidos: Yup.string()
      .required("Campo requerido")
      .matches(
        /^[a-zA-Z ñÑ áéíóúÁÉÍÓÚ]*$/,
        "Solo se permiten letras y espacios"
      )
      .max(20, "Los apellidos no deben tener más de 20 caracteres"),

    ci: Yup.string()
      .matches(
        /^\d{11}$/,
        "Identidad no válida (debe tener exactamente 11 dígitos)"
      )
      .required("El CI es requerido"),

    telefono: Yup.string()
      .required("El teléfono es requerido")
      .matches(/^[0-9]+$/, "Solo se permiten números en el teléfono")
      .length(8, "El teléfono debe tener exactamente 8 caracteres"),

    salario: Yup.string()
      .required("El salario es requerido")
      .matches(
        /^\d+(\.\d{1,2})?$/,
        "Formato de salario inválido (ej. 123.45 o 123)"
      )
      .max(10, "El salario no debe exceder 10 caracteres"),

    puesto: Yup.string()
      .required("El puesto es requerido")
      .matches(
        /^[a-zA-Z ñÑ áéíóúÁÉÍÓÚ]*$/,
        "Solo se permiten letras y espacios en el puesto"
      )
      .max(50, "El puesto no debe tener más de 50 caracteres"),

    direccion: Yup.string()
      .required("La dirección es requerida")
      .max(100, "La dirección no debe exceder los 100 caracteres"),
  });
export default schemaTrabajadores;
