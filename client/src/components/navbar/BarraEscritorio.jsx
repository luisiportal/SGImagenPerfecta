import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import HandlePerfil from "./HandlePerfil.jsx";
import ReservarBTN from "../navbar/ReservarBTN";
import { useAuth } from "../../context/AuthContext.jsx";

const BarraEscritorio = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <div className="flex justify-center items-center h-16 max-w-7xl mx-auto space-x-8">
      <Link
        className="text-st_color hover:scale-110 transition-transform duration-200"
        to={"/"}
      >
        <img
          className="w-14 h-14"
          src={"/images/logo.png"}
          alt="Logo Otra Dimensión"
        />
      </Link>
      <Navbar />
      <HandlePerfil
        isAuthenticated={isAuthenticated}
        user={user}
        logout={logout}
      />
      <ReservarBTN />
    </div>
  );
};

export default BarraEscritorio;
