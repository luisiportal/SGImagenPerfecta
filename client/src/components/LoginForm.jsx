import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import MostrarError from "./validacionForm/MostrarError";

const Login = () => {
  const { login } = useAuth();
  const [credencial_invalida, setCredencial_invalida] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="h-screen">
      <h1 className=" text-3xl text-slate-500 font-bold mx-auto p-5 grid place-items-center">
        Acceso Trabajadores
      </h1>

      <Formik
        initialValues={{ usuario: "", password: "" }}
        validationSchema={Yup.object({
          usuario: Yup.string()
            .required("Campo requerido")
            .max(20, "Credencial incorrecta"),
          password: Yup.string()
            .required("Campo requerido")
            .max(20, "Credencial incorrecta")
            .matches(/^[a-zA-Z0-9-. ]*$/, "Solo se permiten letras y números"),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const {response} = await login(values);
            setCredencial_invalida(response.data.message);
          } catch (error) {
            
          }
        }}
      >
        {({ isSubmitting, errors }) => (
          <Form>
            <div className="w-80 grid grid-cols-1 gap-2  p-4 min-h-80 m-auto mt-16 shadow-xl rounded-md text-gray-900 bg-neutral-200">
              <label className="text-gray-900" htmlFor="usuario">
                Usuario :
              </label>
              <Field
                className=" border-b-huellas_color"
                type="text"
                name="usuario"
              />
              <MostrarError campo={"usuario"} errors={errors} />
              <label className="text-gray-900" htmlFor="password">
                Contraseña :
              </label>
              <Field
                className=" border-b-huellas_color"
                type="password"
                name="password"
              />
              <MostrarError campo={"password"} errors={errors} />

              {credencial_invalida && (
                <span className="bg-red-500 p-1 m-1 rounded">
                  {credencial_invalida}
                </span>
              )}
              <button
                className="w-full bg-huellas_color text-2md hover:bg-amber-600 text-white font-semibold block p-2 rounded transition-colors"
                type="submit"
                disabled={isSubmitting}
              >
                Iniciar sesión
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
