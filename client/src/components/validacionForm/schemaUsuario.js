import * as Yup from "yup";

export const schemaUsuario = (isEditing) =>
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
        schema.min(8, "La contraseña debe tener al menos 8 caracteres"),
    }),
    confirmPassword: Yup.string().when("password", {
      is: (password) => password && password.length > 0,
      then: (schema) =>
        schema
          .required("Confirma tu contraseña")
          .oneOf([Yup.ref("password")], "Las contraseñas deben coincidir"),
      otherwise: (schema) => schema.notRequired(),
    }),
  });
export default schemaUsuario;
