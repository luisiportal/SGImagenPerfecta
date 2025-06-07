import { create } from "zustand";

export const useOfertaStore = create((set) => ({
  oferta_personalizada: [],
  setOferta_personalizada: (estado) => set({ oferta_personalizada: estado }),
}));


