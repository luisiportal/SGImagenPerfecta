import { useNavigate } from "react-router-dom";
import { useOfertaStore } from "../../Store/Oferta_personalizada.store";
import { useState } from "react";
import { listarServiciosRequest } from "../../api/servicios.api";
import { useEffect } from "react";

const ListarServicios = () => {
  const { oferta_personalizada, setOferta_personalizada } = useOfertaStore();
  const [servicios, setServicios] = useState([
    {
      id_servicio: 0,
      nombre_servicio: "",
      descripcion_servicio: "",
      precio_servicio: 0,
    },
  ]);

  useEffect(() => {
    const cargarServicios = async () => {
      const response = await listarServiciosRequest();
      setServicios(response);
    };

    cargarServicios();
  }, []);

  const navigate = useNavigate();

  const quitarServicio = (servicio) => {
    const restantes = oferta_personalizada.filter(
      (item) => item.id_servicio != servicio.id_servicio
    );
    setOferta_personalizada(restantes);
  };
  const handleChange = (servicio, isChecked) => {
    if (isChecked) {
      setOferta_personalizada([...oferta_personalizada, servicio]);
    } else {
      quitarServicio(servicio);
    }
  };

  return (
    <div>
      ListarServicios
      {servicios.map((servicio) => (
        <section
          key={servicio.id_servicio}
          className="flex gap-2 bg-white p-2 rounded-lg m-1"
        >
          <input
            type="checkbox"
            name="selecc"
            onChange={(e) => handleChange(servicio, e.target.checked)}
          />

          <div className=" flex gap-2">
            <h2> {servicio.nombre_servicio}</h2>
            <h2> {servicio.precio_servicio}</h2>
          </div>
        </section>
      ))}
      <h2>Oferta Personalizada</h2>
      {oferta_personalizada.map((oferta_personalizada) => (
        <section key={oferta_personalizada.id_servicio}>
          {" "}
          
          <h2>{oferta_personalizada.nombre_servicio}</h2>
        </section>
      ))}
      <button
        onClick={() => navigate(`/cliente/reservar/personalizada`)}
        className="bg-fuchsia-700"
      >
        Aceptar{" "}
      </button>
    </div>
  );
};

export default ListarServicios;
