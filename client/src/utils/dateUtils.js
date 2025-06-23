import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import { es } from "date-fns/locale";
import { isDate } from "date-fns";
import { dateFnsLocalizer } from "react-big-calendar";

export const locales = { es: es };

export const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: (date) => startOfWeek(date, { weekStartsOn: 1 }),
  getDay,
  locales,
});

export const parseDateForCalendar = (dateString) => {
  if (!dateString) return null;
  try {
    const date = parse(dateString, "yyyy-MM-dd", new Date());
    if (isDate(date) && !isNaN(date.getTime())) {
      return date;
    }
  } catch (error) {
    console.error("Error al analizar la cadena de fecha:", dateString, error);
  }
  return null;
};
export const formatDate = (date) => {
  if (!date || !isDate(date) || isNaN(date.getTime())) return null;
  try {
    return format(date, "yyyy-MM-dd");
  } catch (error) {
    console.error("Error al formatear la fecha:", date, error);
    return null;
  }
};
