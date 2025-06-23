import { Formik, Form } from "formik";
import { useState } from "react";
import Input from "../formulario/Input";
import Notificacion from "../validacionForm/Notificacion";
import ConfirmModal from "../Modal/ConfirmModal";
import schemaUsuario from "../validacionForm/schemaUsuario";

const UsuarioForm = ({
  initialValues,
  onSubmit,
  onCancel,
  formTitle,
  isEditing,
}) => {
  const [notificacion_msg, setNotificacion_msg] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
        initialValues={initialValues}
        enableReinitialize={true}
        validationSchema={schemaUsuario()}
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
              <div className="flex justify-center mb-6"></div>
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

export default UsuarioForm;
