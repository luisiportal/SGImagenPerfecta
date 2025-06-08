// src/utils/dateUtils.js

import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import { es } from "date-fns/locale";
import { isDate } from "date-fns";
import { dateFnsLocalizer } from "react-big-calendar";

// Configuración de la localización para date-fns
export const locales = { es: es };

// Localizador para React Big Calendar
export const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: (date) => startOfWeek(date, { weekStartsOn: 1 }),
  getDay,
  locales,
});

/**
 * Parsea una cadena de fecha a un objeto Date.
 * @param {string} dateString - La cadena de fecha a parsear.
 * @returns {Date | null} - El objeto Date parseado o null si hay un error.
 */
export const parseDateForCalendar = (dateString) => {
  if (!dateString) return null;
  try {
    const date = new Date(dateString);
    if (isDate(date) && !isNaN(date.getTime())) {
      return date;
    }
  } catch (error) {
    console.error("Error al analizar la cadena de fecha:", dateString, error);
  }
  return null;
};
