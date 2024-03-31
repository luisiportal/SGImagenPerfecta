import { Formik, Form, ErrorMessage } from "formik";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Input from "../formulario/Input";
import { useTrabajadores } from "../../context/TrabajadorContext";
import { schemaTrabajadores } from "../validacionForm/schemaTrabajadores";
import {
  crearTrabajadoresRequest,
  editarTrabajadoresRequest,
} from "../../api/trabajador.api";
import Notificacion from "../validacionForm/Notificacion";

const TrabajadorForm = () => {
  const { loadTrabajador,perfil } = useTrabajadores();
  const params = useParams();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [notificacion_msg, setNotificacion_msg] = useState(null);
 
  useEffect(() => {
  
     loadTrabajador(params.id);
    
    
  }, []);

  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append("usuario", values.usuario);
    formData.append("password", values.password);
    formData.append("nombre", values.nombre);
    formData.append("apellidos", values.apellidos);
    formData.append("ci", values.ci);
    formData.append("telefono", values.telefono);
    formData.append("puesto", values.puesto);
    formData.append("direccion", values.direccion);
    formData.append("salario", values.salario);

    if (file !== null) {
      formData.append("imagenPerfil", file);
    }

    try {
      if (params.id) {
     
        const response = await editarTrabajadoresRequest(formData, params.id);
        if (response) {
          setNotificacion_msg({
            mensaje: "Datos actualizados",
            errorColor: false,
          });
        }
      } else {
      
        const { data } = await crearTrabajadoresRequest(formData);
        setNotificacion_msg({
          mensaje: "Usuario creado correctamente",
          errorColor: false,
        });
      }

      setTimeout(() => {
        navigate("/trabajador/plantilla");
      }, 2000);
    } catch (error) {
      setNotificacion_msg({
        mensaje: "El usuario ya existe",
        errorColor: true,
      });
    }
  };

  return (
    <div>
      <h1 className="flex justify-center pt-5 text-slate-500 font-bold text-2xl lg:text-4xl">
        {params.id_producto ? "Editar Trabajador" : "Agregar Trabajador"}
      </h1>
      <Formik
        initialValues={perfil}
        enableReinitialize={true}
        validationSchema={schemaTrabajadores}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleSubmit, errors, values, isSubmitting }) => (
          <Form className="bg-neutral-200 max-w-md p-4 mx-auto rounded">
            {
              /*muestra la imagen preview */ file && (
                <img
                  className="w-40 h-40 shadow-xl border-slate-50 border-spacing-2 rounded-md"
                  src={URL.createObjectURL(file)}
                  alt=""
                />
              )
            }

            <div className="bg-neutral-200 grid sm:grid-cols-1 gap-2 xl:grid-cols-1 p-4 min-h-80 max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-16 shadow-xl rounded text-gray-900">
              <>
                <Input
                  name="usuario"
                  label="Usuario"
                  type="text"
                  value={values.usuario}
                  handleChange={handleChange}
                  errors={errors}
                />

                <Input
                  name="password"
                  label="Contraseña"
                  type="password"
                  value={values.password}
                  handleChange={handleChange}
                  errors={errors}
                />
              </>

              <Input
                name={"nombre"}
                label={"Nombre"}
                type={"text"}
                value={values.nombre}
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
                label={"Teléfono"}
                type={"text"}
                value={values.telefono}
                handleChange={handleChange}
                errors={errors}
              ></Input>
              <Input
                name={"puesto"}
                label={"Puesto"}
                type={"text"}
                value={values.puesto}
                handleChange={handleChange}
                errors={errors}
              ></Input>
              <Input
                name={"salario"}
                label={"Salario"}
                type={"text"}
                value={values.salario}
                handleChange={handleChange}
                errors={errors}
              ></Input>
              <Input
                name={"direccion"}
                label={"Dirección"}
                type={"text"}
                value={values.direccion}
                handleChange={handleChange}
                errors={errors}
              ></Input>

              <label htmlFor="imagenPerfil" className="block"></label>
              <input
                name="imagenPerfil"
                type="file"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
              />

              {notificacion_msg && (
                <div
                  onClick={() => setNotificacion_msg(false)}
                  className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center"
                >
                  <Notificacion
                    mensaje={notificacion_msg.mensaje}
                    errorColor={notificacion_msg.errorColor}
                  />
                </div>
              )}

              <button
                className=" bg-huellas_color w-full text-2md text-black font-bold block p-2 rounded-md"
                type="submit"
                disabled={isSubmitting}
              >
                Aceptar
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default TrabajadorForm;
