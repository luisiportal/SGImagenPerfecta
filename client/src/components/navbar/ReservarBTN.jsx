import { Link } from "react-router-dom";

const ReservarBTN = () => {
  return (
    <Link
      to="/cliente"
      className="inline-flex justify-center items-center bg-st_color font-bold text-white rounded-full px-5 py-1 max-h-9 transition-transform duration-200 hover:scale-105"
    >
      Reservar
    </Link>
  );
};

export default ReservarBTN;
