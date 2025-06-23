const FiltroNotificaciones = ({ filtros, setFiltros }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFiltros((prev) => ({ ...prev, [name]: value }));
  };

  const limpiarFiltros = () => {
    setFiltros({
      fechaDesde: "",
      fechaHasta: "",
      ci: "",
      nombre: "",
    });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <h3 className="text-lg font-semibold mb-3">Filtrar Notificaciones</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm text-gray-700 mb-1">Desde:</label>
          <input
            type="date"
            name="fechaDesde"
            value={filtros.fechaDesde}
            onChange={handleChange}
            className="w-full border rounded px-2 py-1"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Hasta:</label>
          <input
            type="date"
            name="fechaHasta"
            value={filtros.fechaHasta}
            onChange={handleChange}
            className="w-full border rounded px-2 py-1"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">
            CI Cliente:
          </label>
          <input
            type="text"
            name="ci"
            value={filtros.ci}
            onChange={handleChange}
            placeholder="Buscar por CI"
            className="w-full border rounded px-2 py-1"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">
            Nombre Cliente:
          </label>
          <input
            type="text"
            name="nombre"
            value={filtros.nombre}
            onChange={handleChange}
            placeholder="Buscar por nombre"
            className="w-full border rounded px-2 py-1"
          />
        </div>
      </div>
      <button
        onClick={limpiarFiltros}
        className="mt-3 text-sm text-blue-600 hover:text-blue-800"
      >
        Limpiar filtros
      </button>
    </div>
  );
};

export default FiltroNotificaciones;
