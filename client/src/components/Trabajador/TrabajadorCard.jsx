// TrabajadorCard.jsx
import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
// No es necesario importar useTrabajadores aquí si solo pasas onDeleteClick
// import { useTrabajadores } from "../../context/TrabajadorContext"; // Comentado

// Recibe onDeleteClick y la nueva prop isCurrentUser
const TrabajadorCard = ({ trabajador, onDeleteClick, isCurrentUser }) => {
  const navigate = useNavigate();

  return (
    // Aplica estilos condicionales y un borde si es el usuario autenticado
    // Este div ya no necesita el borde condicional aquí, se moverá al div interno
    <div className="w-full max-w-xs mx-auto">
      <div className="pt-12">
        {/* Aquí es donde movemos el borde condicional y añadimos 'relative' */}
        <div
          className={`mx-2 bg-neutral-200 shadow-xl rounded-lg text-gray-900 h-full flex flex-col relative
          ${isCurrentUser ? "border-4 border-blue-500" : ""}`} // El borde se aplica a este div
        >
          {/* Indicador de "Eres tú" si es el usuario autenticado */}
          {isCurrentUser && (
            <span className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-full z-10">
              Tú
            </span>
          )}

          <div className="rounded-t-lg h-32 overflow-hidden bg-gray-300"></div>
          <div className="mx-auto w-32 h-32 relative -mt-28 border-4 border-white rounded-full overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src={`../images/trabajadores/perfil/${trabajador.foto_perfil || "fotoPerfil.jpg"}`}
              alt="Foto de perfil"
              onError={(e) => {
                // Manejo de error para imagen no encontrada
                e.target.src = "../images/trabajadores/perfil/fotoPerfil.jpg";
              }}
            />
          </div>

          <div className="p-4 text-center mt-2 flex-grow">
            <h2 className="font-semibold text-lg mb-2">
              {`${trabajador.nombre} ${trabajador.apellidos}`}
            </h2>

            <div className="space-y-2 mb-4">
              <p className="text-gray-700">CI: {trabajador.ci}</p>
              <p className="text-gray-700">Puesto: {trabajador.puesto}</p>
              <p className="text-gray-700">Teléfono: {trabajador.telefono}</p>

              <p className="text-gray-700 line-clamp-2">
                Dirección: {trabajador.direccion}
              </p>

              <p className="text-gray-700">Salario: {trabajador.salario} cup</p>
            </div>

            <div className="flex justify-center gap-x-4 mt-4">
              <button
                className={`bg-red-500 px-4 py-2 font-bold text-white rounded hover:bg-red-600 transition-colors ${isCurrentUser ? "cursor-not-allowed opacity-50" : ""}`}
                onClick={() => onDeleteClick(trabajador.id_trabajador)}
                disabled={isCurrentUser} // Deshabilita el botón si es el usuario actual
              >
                Eliminar
              </button>

              <button
                className="bg-blue-500 px-4 py-2 font-bold text-white rounded hover:bg-blue-600 transition-colors"
                onClick={() => {
                  // Asegúrate de que la ruta de edición sea correcta en TrabajadorRoutes.jsx
                  // Debería ser algo como "edit/:id" y no "/profile/edit/:id"
                  navigate(
                    `/trabajador/profile/edit/${trabajador.id_trabajador}`
                  );
                }}
              >
                Editar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrabajadorCard;
