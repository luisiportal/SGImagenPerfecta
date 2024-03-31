import { Form, Formik } from "formik";
import * as Yup from "yup";
import Input from "../formulario/Input";
import { listarunReservaRequest } from "../../api/reservas.api";
import { useState } from "react";
import ListarReservasCard from "./ListarReservasCard";

const schema = Yup.object().shape({
  ci: Yup.string()
    .matches(/^\d{11}$/, "Identidad no valida")
    .required("CI es requerido"),
});

const ComprobarReservaForm = () => {
  const [reservas, setReservas] = useState([]);
  const [error, setError] = useState(null);

  const handleSubmit = async (values) => {
    try {
      const { data } = await listarunReservaRequest(values.ci);
      data && setReservas(data);

      setError(null); 
    } catch (error) {
      setError("Lo siento no tiene una reserva con nosotros");
    }
  };
  return (
    <div className="mx-2 bg-neutral-200 rounded-md p-4">
      <h1 className="flex justify-center pt-5 text-slate-500 font-bold text-4xl">
        Comprobar Reserva
      </h1>

      <div className="mt-8">
        <Formik
          initialValues={{ ci: "" }}
          onSubmit={handleSubmit}
          validationSchema={schema}
        >
          {({ handleChange, handleSubmit, errors, values, isSubmitting }) => (
            <Form
              onSubmit={handleSubmit}
              className="bg-neutral-200 max-w-md rounded-md p-4 mx-auto"
            >
              <Input
                name={"ci"}
                label={"Carnet Identidad"}
                type={"text"}
                value={values.ci}
                handleChange={handleChange}
                errors={errors}
              ></Input>

              <button
                type="submit"
                disabled={isSubmitting}
                className=" bg-huellas_color w-full text-2md text-black font-bold block p-2 rounded-md"
              >
                {isSubmitting ? "Buscando..." : "Comprobar"}
              </button>
              <br />
              {error && <p>{error}</p>} {/* Renderizar el mensaje de error si existe */}
      {reservas
        ? reservas.map((reserva) => (
            <ListarReservasCard reserva={reserva} key={reserva.id_reserva} />
          ))
        : ""}
            </Form>
          )}
        </Formik>
      </div>
      
    </div>
  );
};

export default ComprobarReservaForm;
