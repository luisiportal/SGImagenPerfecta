import { useContext, useState } from "react";
import { OfertaContext } from "./OfertaContext";
import {
  eliminarOfertaRequest,
  listarOfertasRequest,
} from "../api/ofertas.api";

export const useOfertas = () => {
  const context = useContext(OfertaContext);
  if (!context === undefined) {
    throw new Error("No hay contexto provider");
  }
  return context;
};

export const OfertaContextProvider = ({ children }) => {
  const [ofertas, setOfertas] = useState([]);
  const [oferta_personalizada, setOferta_personalizada] = useState([]);

  const loadOfertas = async () => {
    try {
      const response = await listarOfertasRequest();
      setOfertas(response);
    } catch (error) {}
  };

  const deleteOferta = async (id_oferta) => {
    try {
      eliminarOfertaRequest(id_oferta);
      setOfertas(ofertas.filter((oferta) => oferta.id_oferta !== id_oferta));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <OfertaContext.Provider
      value={{
        ofertas,
        loadOfertas,
        deleteOferta,
        oferta_personalizada,
        setOferta_personalizada,
      }}
    >
      {children}
    </OfertaContext.Provider>
  );
};
