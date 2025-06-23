// hooks/useReservaForm.js
import { useState } from "react";
import { reservaSchema } from "../validacionForm/schemaForm";
import { useOfertaStore } from "../Store/Oferta_personalizada.store";

export const useReservaForm = (initialValues) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const { oferta_personalizada, setOferta_personalizada } = useOfertaStore();

  const handleSubmit = async (values, actions) => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Validación
      await reservaSchema.validate(values, { abortEarly: false });

      // Formatear fecha
      const fechaCompleta = values.fecha_sesion
        ? `${values.fecha_sesion.getFullYear()}-${String(
            values.fecha_sesion.getMonth() + 1
          ).padStart(
            2,
            "0"
          )}-${String(values.fecha_sesion.getDate()).padStart(2, "0")}`
        : null;

      // Preparar datos
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

      return dataToSend;
    } catch (validationError) {
      const errors = {};
      validationError.inner.forEach((err) => {
        errors[err.path] = err.message;
      });
      actions.setErrors(errors);
      throw validationError;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    error,
    handleSubmit,
    oferta_personalizada,
    setOferta_personalizada,
  };
};
