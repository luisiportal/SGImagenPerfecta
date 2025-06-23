import { create } from "zustand";

export const useservicios = create((set) => ({
  servicios: [], // <--- Make sure it's an empty array
  setservicios: (newServicios) => set({ servicios: newServicios }),
}));
