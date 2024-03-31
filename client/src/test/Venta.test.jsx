import { render, screen } from "@testing-library/react";
import VentaCard from "../components/Ventas/VentaCard";

describe("Mostrar Venta", () => {
  test("deberia mostrar una venta", () => {
    render(
      <VentaCard
        venta={{
          id_venta: 1,
          nombre_cliente: "Candido",
          apellidos: "Julian",
          nombre_producto: "Estandar",
          descripcion: null,
          pago_confirmado: null,
          precio_venta: "10000.00",
        }}
      ></VentaCard>
    );
  });
});
