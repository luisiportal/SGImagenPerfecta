import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import MostrarError from "./validacionForm/MostrarError"; // Asegúrate de que MostrarError maneje arrays de errores

const Login = () => {
  const { login } = useAuth();
  const [credencial_invalida, setCredencial_invalida] = useState(null);
  const navigate = useNavigate();

  // Escucha los errores del contexto y actualiza el estado local de credencial_invalida
  // para que se muestre en el span.
  // Podrías mostrar directamente authErrors en el JSX si MostrarError puede manejar eso.
  React.useEffect(() => {
    if (authErrors && authErrors.length > 0) {
      setCredencial_invalida(authErrors[0]); // Muestra el primer error del array
    } else {
      setCredencial_invalida(null); // Limpia el mensaje si no hay errores
    }
  }, [authErrors]);

  return (
    <div className="h-screen">
      <h1 className=" text-3xl text-slate-500 font-bold mx-auto p-8 grid place-items-center">
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
        onSubmit={async (values) => {
          try {
            const result = await login(values); // 'result' contendrá { success: true } o { success: false, message: "..." }
            if (result.success) {
              navigate("/trabajadores"); // Redirigir solo si el login fue exitoso
            } else {
              // El error ya se maneja en el AuthContext y se propaga a authErrors,
              // que a su vez actualiza credencial_invalida vía useEffect.
              // No es necesario un setCredencial_invalida directo aquí.
            }
          } catch (error) {
            // Este catch solo se activaría si hay un error MUY inesperado que no fue capturado
            // por loginRequest o AuthContext.login.
            console.error("Error inesperado en LoginForm:", error);
            setCredencial_invalida(
              "Ocurrió un error inesperado al iniciar sesión."
            );
          } finally {
            setSubmitting(false); // Siempre deshabilitar el botón de submit
          }
        }}
      >
        {({ isSubmitting, errors }) => (
          <Form>
            <div className="w-80 grid grid-cols-1 gap-2  p-4 min-h-80 m-auto shadow-xl rounded-md text-gray-900 bg-neutral-200">
              <label className="text-gray-900" htmlFor="usuario">
                Usuario:
              </label>
              <Field
                className=" border-b-st_color"
                type="text"
                name="usuario"
              />
              <MostrarError campo={"usuario"} errors={errors} />
              <label className="text-gray-900" htmlFor="password">
                Contraseña:
              </label>
              <Field
                className=" border-b-st_color"
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
                className="w-full bg-st_color text-2md hover:bg-amber-600 text-white font-semibold block p-2 rounded transition-colors"
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
