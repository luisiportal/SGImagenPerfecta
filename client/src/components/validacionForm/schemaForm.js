import * as Yup from "yup";

const sevenDaysFromNow = new Date();
sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 3);
sevenDaysFromNow.setHours(0, 0, 0, 0);

export const reservaSchema = Yup.object().shape({
  nombre_cliente: Yup.string()
    .required("El nombre es requerido")
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(50, "El nombre no puede exceder los 50 caracteres"),
  apellidos: Yup.string()
    .required("Los apellidos son requeridos")
    .min(2, "Los apellidos deben tener al menos 2 caracteres")
    .max(100, "Los apellidos no pueden exceder los 100 caracteres"),
  ci: Yup.string()
    .required("El carnet de identidad es requerido")
    .matches(/^\d{11}$/, "El CI debe ser un número de 11 dígitos")
    .max(11, "El CI no puede exceder los 11 dígitos"),
  telefono: Yup.string()
    .required("El teléfono es requerido")
    .matches(/^\d{8}$/, "El teléfono debe ser un número de 8 dígitos")
    .max(8, "El teléfono no puede exceder los 8 dígitos"),
  correo_electronico: Yup.string()
    .email("Debe ser un correo electrónico válido")
    .required("El correo electrónico es requerido"),
  fecha_sesion: Yup.date()
    .required("La fecha de la sesión es requerida")

    .min(
      sevenDaysFromNow,
      "La reserva debe ser al menos con 3 días de antelación"
    ),
});
