import { Form, Formik } from "formik";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import * as Yup from "yup";
import Input from "../formulario/Input";
import { crearReservaRequest } from "../../api/reservas.api";

const schema = Yup.object().shape({
  nombre_cliente: Yup.string()
    .matches(/^[ñA-Za-záéíóúÁÉÍÓÚ\s]{3,}$/, "Revise su nombre por favor")
    .required("Nombre cliente requerido"),
  apellidos: Yup.string()
    .matches(/^[ñA-Za-záéíóúÁÉÍÓÚ\s]{3,}$/, "Revise sus apellidos por favor")
    .required("Apellidos requeridos"),
  telefono: Yup.string()
    .matches(/^\d{1,10}$/, "Telefono no valido")
    .required("El teléfono es requerido"),
  ci: Yup.string()
    .matches(/^\d{11}$/, "Identidad no valida")
    .required("CI es requerido"),
  fecha_sesion: Yup.date().required("Debe seleccionar una fecha"),
});

const ReservarForm = () => {
  const params = useParams();
  const [producto, setProducto] = useState({
    nombre_cliente: "",
    apellidos: "",
    ci: "",
    telefono: "",
    fecha_sesion: "",
    id_producto: params.id_producto,
  });

  const navigate = useNavigate();
  const handleSubmit = async (values) => {
    try {
      crearReservaRequest(values);
      alert(
        `Se ha creado su reserva para el día ${values.fecha_sesion} a nombre de la persona ${values.nombre_cliente} ${values.apellidos}`
      );
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mx-2 bg-neutral-200 rounded-md p-4">
      <h1 className="flex justify-center pt-5 text-slate-500 font-bold text-4xl">
        Reserva
      </h1>

      <div className="mt-8">
        <Formik
          initialValues={producto}
          onSubmit={handleSubmit}
          validationSchema={schema}
        >
          {({ handleChange, handleSubmit, errors, values, isSubmitting }) => (
            <Form
              onSubmit={handleSubmit}
              className="bg-neutral-200 max-w-md rounded-md p-4 mx-auto"
            >
              <Input
                name={"nombre_cliente"}
                label={"Nombre"}
                type={"text"}
                value={values.nombre_cliente}
                handleChange={handleChange}
                errors={errors}
              ></Input>
              <Input
                name={"apellidos"}
                label={"Apellidos"}
                type={"text"}
                value={values.apellidos}
                handleChange={handleChange}
                errors={errors}
              ></Input>
              <Input
                name={"ci"}
                label={"Carnet Identidad"}
                type={"text"}
                value={values.ci}
                handleChange={handleChange}
                errors={errors}
              ></Input>

              <Input
                name={"telefono"}
                label={"Teléfono Contacto"}
                type={"text"}
                value={values.telefono}
                handleChange={handleChange}
                errors={errors}
              ></Input>

              <Input
                name={"fecha_sesion"}
                label={"Fecha a Reservar"}
                type={"date"}
                value={values.fecha_sesion}
                handleChange={handleChange}
                errors={errors}
              ></Input>

              <button
                type="submit"
                disabled={isSubmitting}
                className=" bg-huellas_color w-full text-2md text-black font-bold block p-2 rounded-md"
              >
                {isSubmitting ? "Reservando..." : "Reservar"}
              </button>
              <br />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ReservarForm;
