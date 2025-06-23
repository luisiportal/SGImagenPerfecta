// components/reserva/CustomDatePicker.jsx
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/datepicker-custom.css";

export const CustomDatePicker = ({
  selected,
  onChange,
  minDate,
  excludeDates,
  errors,
  touched,
}) => {
  return (
    <div className="mb-4">
      <label
        htmlFor="fecha_sesion"
        className="block text-gray-700 text-sm font-bold mb-2"
      >
        Fecha de la Sesión
      </label>
      <div className="flex justify-center w-full">
        <DatePicker
          id="fecha_sesion"
          name="fecha_sesion"
          selected={selected}
          onChange={onChange}
          dateFormat="dd/MM/yyyy"
          minDate={minDate}
          excludeDates={excludeDates}
          filterDate={(date) => {
            const day = date.getDay();
            return day !== 0;
          }}
          placeholderText="Selecciona una fecha"
          locale="es"
          onMonthChange={() => {
            document.activeElement && document.activeElement.blur();
          }}
        />
      </div>
      {selected && (
        <div className="text-center mt-2">
          <span
            className="px-3 py-1 rounded-md text-white font-medium"
            style={{ backgroundColor: "#4caf50" }}
          >
            Fecha seleccionada:{" "}
            {selected.toLocaleDateString("es-ES", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>
      )}
      {errors && touched && (
        <div className="bg-red-500 p-1 m-1 rounded">{errors}</div>
      )}
    </div>
  );
};
