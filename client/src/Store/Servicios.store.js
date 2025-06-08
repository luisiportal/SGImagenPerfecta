import { create } from "zustand";

export const useServiciosStore = create((set) => ({
  serviciosStore: [
    {
      id_servicio: 0,
      nombre_servicio: "",
      descripcion_servicio: "",
      precio_servicio: 0,
    },
  ],
  setServiciosStore: (estado) => set({ serviciosStore: estado }),
}));
