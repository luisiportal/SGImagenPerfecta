import { Link } from "react-router-dom";

const ElementoNavbar = ({ nombre, href, isAuthenticated }) => {
  const textColorClass = isAuthenticated ? "text-blue-900" : "text-slate-700";
  const hoverTextColorClass = isAuthenticated
    ? "hover:text-blue-700"
    : "hover:text-black";
  const focusTextColorClass = isAuthenticated
    ? "focus:text-blue-700 md:focus:text-red-700"
    : "focus:text-slate-700 md:focus:text-red-700";

  return (
    <>
      <Link
        to={href}
        className={`block px-3 py-2 rounded-md transition-color  ${textColorClass} ${hoverTextColorClass} ${focusTextColorClass}`}
      >
        {nombre}
      </Link>
    </>
  );
};

export default ElementoNavbar;
