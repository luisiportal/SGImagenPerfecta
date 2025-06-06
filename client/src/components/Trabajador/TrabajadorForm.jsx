// src/components/TrabajadorForm.jsx
import { Formik, Form, ErrorMessage } from "formik";
import { useState } from "react"; // Solo necesitas useState aquí
import Input from "../formulario/Input"; // Asegúrate de la ruta correcta
// import { schemaTrabajadores } from "../validacionForm/schemaTrabajadores"; // Asegúrate de la ruta correcta
import Notificacion from "../validacionForm/Notificacion"; // Asegúrate de la ruta correcta para tu componente Notificacion
import ConfirmModal from "../ConfirmModal"; // Asegúrate de la ruta correcta para tu componente ConfirmModal

// Las props que este componente espera
const TrabajadorForm = ({
  initialValues,
  onSubmit, // Función que recibirá los valores del formulario y el archivo
  onCancel, // Función que se llamará al cancelar
  formTitle, // Título dinámico para el formulario (Agregar o Editar)
}) => {
  const [file, setFile] = useState(null); // Estado local para el archivo de imagen
  const [notificacion_msg, setNotificacion_msg] = useState(null); // Estado local para mensajes de notificación
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleCancelClick = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmCancel = () => {
    setShowConfirmModal(false);
    onCancel(); // Llama a la función onCancel pasada por el padre
  };

  const handleCloseConfirmModal = () => {
    setShowConfirmModal(false);
  };

  return (
    <div className="pb-10">
      <h1 className="flex justify-center pt-5 text-slate-500 font-bold text-2xl lg:text-4xl">
        {formTitle} {/* Usa el prop formTitle aquí */}
      </h1>
      <Formik
        initialValues={initialValues}
        enableReinitialize={true} // Muy importante: permite que Formik se actualice cuando initialValues cambian
        // validationSchema={schema}
        // Pasamos values, el archivo, el formikBag (para setSubmitting) y setNotificacion_msg al onSubmit del padre
        onSubmit={(values, formikBag) =>
          onSubmit(values, file, formikBag, setNotificacion_msg)
        }
        // validationSchema={schemaTrabajadores}
      >
        {({ handleChange, values, errors, isSubmitting }) => (
          <Form className="max-w-md mx-auto mt-8">
            <div className="p-6 shadow-xl rounded-lg bg-neutral-200">
              {/* Contenedor de la imagen */}
              <div className="flex justify-center mb-6">
                <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-md bg-gray-100">
                  {file ? (
                    <img
                      className="w-full h-full object-cover"
                      src={URL.createObjectURL(file)}
                      alt="Vista previa"
                    />
                  ) : (
                    <img
                      className="w-full h-full object-cover"
                      src={`/images/trabajadores/perfil/${values.foto_perfil || "default.jpg"}`}
                      alt="Foto de perfil"
                      onError={(e) => {
                        e.target.src =
                          "/images/trabajadores/perfil/default.jpg";
                      }}
                    />
                  )}
                </div>
              </div>

              {/* Campos del formulario */}
              <div className="space-y-4">
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
                <Input
                  name="confirmPassword"
                  label="Confirmar Contraseña"
                  type="password"
                  value={values.confirmPassword}
                  handleChange={handleChange}
                  errors={errors}
                />
                <Input
                  name="nombre"
                  label="Nombre"
                  type="text"
                  value={values.nombre}
                  handleChange={handleChange}
                  errors={errors}
                />
                <Input
                  name="apellidos"
                  label="Apellidos"
                  type="text"
                  value={values.apellidos}
                  handleChange={handleChange}
                  errors={errors}
                />
                <Input
                  name="ci"
                  label="Carnet Identidad"
                  type="text"
                  value={values.ci}
                  handleChange={handleChange}
                  errors={errors}
                />
                <Input
                  name="telefono"
                  label="Teléfono"
                  type="text"
                  value={values.telefono}
                  handleChange={handleChange}
                  errors={errors}
                />
                <Input
                  name="puesto"
                  label="Puesto"
                  type="text"
                  value={values.puesto}
                  handleChange={handleChange}
                  errors={errors}
                />
                <Input
                  name="salario"
                  label="Salario"
                  type="text"
                  value={values.salario}
                  handleChange={handleChange}
                  errors={errors}
                />
                <Input
                  name="direccion"
                  label="Dirección"
                  type="text"
                  value={values.direccion}
                  handleChange={handleChange}
                  errors={errors}
                />

                <div className="pt-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Imagen de Perfil
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-300">
                      <img
                        className="w-full h-full object-cover"
                        src={
                          file
                            ? URL.createObjectURL(file)
                            : values.foto_perfil
                              ? `/images/trabajadores/perfil/${values.foto_perfil}`
                              : "/images/trabajadores/perfil/default.jpg"
                        }
                        alt="Foto de perfil"
                        onError={(e) => {
                          e.target.src =
                            "/images/trabajadores/perfil/default.jpg";
                        }}
                      />
                    </div>
                    <label className="flex-1">
                      <span className="sr-only">Seleccionar imagen</span>
                      <input
                        name="imagenPerfil"
                        type="file"
                        accept="image/*"
                        onChange={(e) => setFile(e.target.files?.[0])}
                        className="block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-md file:border-0
                      file:text-sm file:font-semibold
                      file:bg-st_color file:text-black
                      hover:file:bg-st_color-dark"
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <button
                  className="w-[48%] bg-gray-500 text-white font-bold py-2 px-4 rounded-md hover:bg-gray-600 transition-colors"
                  type="button"
                  onClick={handleCancelClick}
                >
                  Cancelar
                </button>
                <button
                  className="w-[48%] bg-st_color text-black font-bold py-2 px-4 rounded-md hover:bg-st_color-dark transition-colors"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Aceptar
                </button>
              </div>
            </div>

            {notificacion_msg && (
              <div
                onClick={() => setNotificacion_msg(null)}
                className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center"
              >
                <Notificacion
                  mensaje={notificacion_msg.mensaje}
                  errorColor={notificacion_msg.errorColor}
                />
              </div>
            )}
          </Form>
        )}
      </Formik>

      <ConfirmModal
        isOpen={showConfirmModal}
        message="¿Estás seguro de que quieres cancelar? Los cambios no guardados se perderán."
        onConfirm={handleConfirmCancel}
        onCancel={handleCloseConfirmModal}
      />
    </div>
  );
};

export default TrabajadorForm;
