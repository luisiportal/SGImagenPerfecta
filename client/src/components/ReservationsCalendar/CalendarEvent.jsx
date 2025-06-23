import format from "date-fns/format";
import { es } from "date-fns/locale";
import { parseDateForCalendar } from "../../utils/dateUtils";

export const CalendarEvent = ({ event }) => {
  const reserva = event.reservaData;
  const primerApellido = reserva.apellidos.split(" ")[0];

  return (
    <div className="flex flex-col">
      {reserva.pagado && (
        <div className="flex justify-end font-bold">
          <div className="rbc-event-paid-badge">Pagado</div>
        </div>
      )}
      <div className="rbc-event-title">
        {reserva.nombre_cliente} {primerApellido}
      </div>
      <div className="rbc-event-offer">
        {reserva.oferta?.nombre_oferta ?? "Oferta Personalizada"}
      </div>
    </div>
  );
};

export const AgendaEvent = ({ event }) => {
  const reserva = event.reservaData;
  return (
    <div className="agenda-event-card">
      {reserva.pagado && (
        <div className="flex justify-center font-bold rbc-event-paid-badge">
          Pagado
        </div>
      )}
      <div className="agenda-event-date">
        {format(
          parseDateForCalendar(event.reservaData.fecha_sesion),
          "dd MMMM",
          { locale: es }
        )}
      </div>
      <div className="agenda-event-details">
        <div className="detail-item">
          <span className="detail-label">Cliente:</span>
          <p>
            {event.reservaData.nombre_cliente} {event.reservaData.apellidos}
          </p>
        </div>
        <div className="detail-item">
          <span className="detail-label">Oferta:</span>
          <p>
            {event.reservaData.oferta?.nombre_oferta || "Oferta Personalizada"}
          </p>
        </div>
        <div className="detail-item">
          <span className="detail-label">CI:</span>
          <p>{event.reservaData.ci}</p>
        </div>
        <div className="detail-item">
          <span className="detail-label">Teléfono:</span>
          <p>{event.reservaData.telefono}</p>
        </div>
      </div>
    </div>
  );
};
