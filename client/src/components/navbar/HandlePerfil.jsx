import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useTrabajadores } from "../../context/TrabajadorContext";
const HandlePerfil = ({ isAuthenticated, user }) => {
  const { perfil, loadTrabajador } = useTrabajadores();

  const navigate = useNavigate();

  const imageSrc = perfil.foto_perfil
  ? `/images/trabajadores/perfil/${perfil.foto_perfil}`
  : "/images/trabajadores/perfil/default.jpg";

  return (
    <aside className="flex justify-center items-center pt-4 lg:pt-1 hover:text-huellas_color hover:scale-125 transition-transform duration-300 ">
      {!isAuthenticated ? (
        <Link to={"/trabajador/login"}>
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
          </button>
        </Link>
      ) : (
        <button
          onClick={() => navigate(`../trabajador/login`)}
          className=" text-slate-500 hover:bg-huellas_color hover:text-black-300 p-1 rounded-full transition-colors focus:ring-2 focus:ring-slate-200"
        >
          <img
            className="h-12 w-12 lg:w-8 lg:h-8 object-cover rounded-full"
            src={imageSrc}
            alt="perfil"
          />
        </button>
      )}
    </aside>
  );
};

export default HandlePerfil;
