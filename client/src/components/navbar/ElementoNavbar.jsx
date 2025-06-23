import { Link, useLocation } from "react-router-dom";

const ElementoNavbar = ({ nombre, href, isAuthenticated }) => {
  const location = useLocation();
  const isActive = location.pathname === href;

  // Clase base común
  const baseClass = "block px-3 py-2 rounded-md transition-color";

  // Clases condicionales
  const colorClass = isActive
    ? "text-red-700"
    : isAuthenticated
      ? "text-blue-900 hover:text-blue-700"
      : "text-slate-700 hover:text-black";

  return (
    <Link to={href} className={`${baseClass} ${colorClass}`}>
      {nombre}
    </Link>
  );
};

export default ElementoNavbar;
