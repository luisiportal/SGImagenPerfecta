import { useEffect, useState } from "react";
import { listarServiciosRequest } from "../api/servicios.api";
import { useServiciosStore } from "../Store/Servicios.store";

export const useServicios = () => {
    const {  setServiciosStore } = useServiciosStore();
  
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
       setServiciosStore(response);
     };
 
     cargarServicios();
   }, []);

  return {servicios};
};
