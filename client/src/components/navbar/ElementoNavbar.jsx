import { Link } from "react-router-dom";

const ElementoNavbar = ({ nombre, href }) => {
  return (
    <>
      <Link
        to={href}
        className=" block text-slate-700 hover:bg-white hover:text-black px-3 py-2 rounded-md transition-color focus:bg-huellas_color focus:text-white md:focus:text-slate-900  md:focus:bg-white"
      >
        {nombre}
      </Link>
    </>
  );
};

export default ElementoNavbar;
