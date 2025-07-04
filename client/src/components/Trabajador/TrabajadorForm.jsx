import { Formik, Form } from "formik";
import { useState } from "react";
import Input from "../formulario/Input";
import schemaTrabajadores from "../validacionForm/schemaTrabajadores";
import Notificacion from "../validacionForm/Notificacion";
import ConfirmModal from "../Modal/ConfirmModal";
import { useAuth } from "../../context/AuthContext";

const TrabajadorForm = ({
  onSubmit,
  onCancel,
  formTitle,
  isEditing,
  disablePuestoSalario,
  trabajador,
}) => {
  const [file, setFile] = useState(null);
  const [notificacion_msg, setNotificacion_msg] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { user } = useAuth();

  const handleCancelClick = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmCancel = () => {
    setShowConfirmModal(false);
    onCancel();
  };

  const handleCloseConfirmModal = () => {
    setShowConfirmModal(false);
  };

  return (
    <div className="pb-10">
      <h1 className="flex justify-center pt-5 text-slate-500 font-bold text-2xl lg:text-4xl">
        {formTitle}
      </h1>
      <Formik
        initialValues={trabajador}
        enableReinitialize={true}
        validationSchema={schemaTrabajadores()}
        context={{ $isEditing: isEditing }}
        onSubmit={(values, formikBag) => {
          const submitValues = { ...values };
          if (!submitValues.password) {
            delete submitValues.password;
            delete submitValues.confirmPassword;
          }
          onSubmit(submitValues, file, formikBag, setNotificacion_msg);
        }}
      >
        {({ handleChange, values, errors, isSubmitting, setFieldValue }) => (
          <Form className="max-w-md mx-auto mt-8">
            <div className="p-6 shadow-xl rounded-lg bg-neutral-200">
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
                      src={`/images/trabajadores/perfil/${trabajador.foto_perfil || "default.jpg"}`}
                      alt="Foto de perfil"
                      onError={(e) => {
                        e.target.src =
                          "/images/trabajadores/perfil/default.jpg";
                      }}
                    />
                  )}
                </div>
              </div>
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
                  handleChange={(e) => {
                    handleChange(e);
                    setShowConfirmPassword(!!e.target.value);
                  }}
                  errors={errors}
                  placeholder={
                    isEditing
                      ? "Cambiar contraseña (opcional)"
                      : "Introduce la contraseña"
                  }
                />
                {showConfirmPassword && (
                  <Input
                    name="confirmPassword"
                    label="Confirmar Contraseña"
                    type="password"
                    value={values.confirmPassword}
                    handleChange={handleChange}
                    errors={errors}
                    placeholder={
                      isEditing
                        ? "Cambiar contraseña (opcional)"
                        : "Introduce la contraseña"
                    }
                  />
                )}
                {user.rol === "administrador" && (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rol
                    </label>
                    <select
                      name="rol"
                      value={values.rol}
                      onChange={handleChange}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="trabajador">Trabajador</option>
                      <option value="administrador">Administrador</option>
                    </select>
                    {errors.rol && (
                      <p className="mt-1 text-sm text-red-600">{errors.rol}</p>
                    )}
                  </div>
                )}
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
                  disabled={disablePuestoSalario}
                  className={
                    disablePuestoSalario ? "text-slate-500 bg-slate-200" : ""
                  }
                />
                <Input
                  name="salario"
                  label="Salario"
                  type="text"
                  value={values.salario}
                  handleChange={handleChange}
                  errors={errors}
                  disabled={disablePuestoSalario}
                  className={
                    disablePuestoSalario ? "text-slate-500 bg-slate-200" : ""
                  }
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
                            : `/images/trabajadores/perfil/${values.foto_perfil || "default.jpg"}`
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
                        type="file"
                        name="foto_Perfil"
                        accept="image/*"
                        onChange={(e) => setFile(e.target.files?.[0])}
                        className="block w-full text-sm text-gray-500
                          file:mr-4 file:py-2 file:px-4
                          file:rounded-md file:border-0
                          file:text-sm file:font-semibold
                          file:bg-blue-500 file:text-white
                          hover:file:bg-blue-600"
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  className="w-[48%] bg-gray-500 text-white font-bold py-2 px-4 rounded-md hover:bg-gray-600 transition-colors"
                  onClick={handleCancelClick}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="w-[48%] bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
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
