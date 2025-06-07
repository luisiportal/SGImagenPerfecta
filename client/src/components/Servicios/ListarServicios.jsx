import { useNavigate } from "react-router-dom";
import { useOfertaStore } from "../../Store/Oferta_personalizada.store";

const ListarServicios = () => {
  const {oferta_personalizada,setOferta_personalizada}=useOfertaStore();

  console.log(oferta_personalizada);
  
  const navigate = useNavigate();
  const servicios = [
    {
      id_servicio: 5,
      nombre_servicio: "5Sesión de Retrato Profesional",
      descripcion_servicio:
        "Sesión fotográfica en estudio con iluminación profesional y retoque básico.",
      precio_servicio: 120.0,
    },
    {
      id_servicio: 7,
      nombre_servicio: "Fotografía de Eventos",
      descripcion_servicio:
        "Cobertura fotográfica de eventos como bodas, graduaciones y conferencias.",
      precio_servicio: 350.0,
    },
    {
      id_servicio: 6,
      nombre_servicio: "Fotografía para Redes Sociales",
      descripcion_servicio:
        "Imágenes optimizadas para Instagram, Facebook y otras redes sociales.",
      precio_servicio: 80.0,
    },
    
  ];
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
        <section key={servicio.id_servicio} className="flex gap-2 bg-white p-2 rounded-lg m-1">
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
      {oferta_personalizada.map((oferta_personalizada) => (
        <section>{oferta_personalizada.nombre_servicio}</section>
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
