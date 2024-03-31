import * as Yup from "yup";

export const schemaTrabajadores = Yup.object({
  usuario: Yup.string()
    .required("Campo requerido")
    .matches(/^[a-zA-Z0-9-.]*$/, "Solo se permiten letras y números")
    .max(20, "El nombre de usuario no debe tener más de 20 caracteres"),
  password: Yup.string()
    .required("Campo requerido")
    .min(8, "La contraseña debe tener al menos 8 caracteres"),
  nombre: Yup.string()
    .required("Campo requerido")
    .matches(/^[a-zA-Z ]*$/, "Solo se permiten letras")
    .max(20, "El nombre de no debe tener más de 20 caracteres"),
  apellidos: Yup.string()
    .required("Campo requerido")
    .matches(/^[a-zA-Z ]*$/, "Solo se permiten letras")
    .max(20, "El nombre de no debe tener más de 20 caracteres"),

  ci: Yup.string()
    .matches(/^\d{11}$/, "Identidad no valida")
    .required("CI es requerido"),
  telefono: Yup.string()
    .required("Campo requerido")
    .matches(/^[0-9 ]*$/, "Solo se permiten numeros")
    .max(20, "Movil demasiado largo "),

  salario: Yup.string()
    .required("Campo requerido")
    .matches(/^[0-9 ]*$/, "Solo se permiten numeros")
    .max(20, "No debe tener más de 20 caracteres"),

  puesto: Yup.string()
    .required("Campo requerido")
    .matches(/^[a-zA-Z ]*$/, "Solo se permiten letras")
    .max(20, "El nombre de no debe tener más de 20 caracteres"),

  direccion: Yup.string()
    .required("Campo requerido")
    .max(200, "El nombre de no debe tener más de 20 caracteres"),
});
