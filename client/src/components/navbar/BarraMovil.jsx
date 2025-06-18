import Navbar from "./Navbar";
import HandlePerfil from "./HandlePerfil";

const BarraMovil = ({ abrirHamburguesa, perfil, logout, isAuthenticated }) => {
  return (
    <div
      className={`fixed lg:hidden ${
        abrirHamburguesa ? `left-0` : `-left-80`
      }  h-full w-48 bg-white shadow-2xl transition-all duration-500 ease-in-out z-50 flex flex-col items-center pt-8 text-center`}
    >
      <Navbar />
      <HandlePerfil
        isAuthenticated={isAuthenticated}
        user={perfil}
        logout={logout}
      />
    </div>
  );
};

export default BarraMovil;
