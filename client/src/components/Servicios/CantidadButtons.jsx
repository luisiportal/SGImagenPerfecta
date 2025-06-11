const CantidadButtons = ({
  setOferta_personalizada,
  oferta_personalizada,
  servicio,
}) => {
  const incrementar = (servicio) => {
    const serviciosActualizados = oferta_personalizada.map((item) =>
      item.id_servicio === servicio.id_servicio
        ? { ...item, cantidad: item.cantidad + 1 }
        : item
    );

    setOferta_personalizada(serviciosActualizados);
  };
  const decrementar = (servicio) => {
       const serviciosActualizados = oferta_personalizada.map((item) =>
      item.id_servicio === servicio.id_servicio
        ? { ...item, cantidad: item.cantidad > 1 ? item.cantidad - 1 : item.cantidad }
        : item
    );

    setOferta_personalizada(serviciosActualizados);
  };

  return (
    <div>
      <button
        title="Incrementar"
        className="bg-white hover:bg-[#1654be] transition-colors duration-700 w-10 h-10 p-2 rounded-full aspect-square font-black text-2xl flex items-center justify-center"
        onClick={() => incrementar(servicio)}
      >
        +
      </button>
      <button
        title="Quitar"
        className="bg-white hover:bg-red-500 transition-colors duration-700 w-10 h-10 p-2 rounded-full aspect-square font-black text-2xl flex items-center justify-center"
        onClick={() => decrementar(servicio)}
      >
        -
      </button>
    </div>
  );
};

export default CantidadButtons;
