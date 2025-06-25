import { create } from "zustand";

export const useservicios = create((set) => ({
  servicios: [],
  setservicios: (newServicios) => set({ servicios: newServicios }),
}));
