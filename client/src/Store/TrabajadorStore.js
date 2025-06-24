import { create } from "zustand";

export const useTrabajadorStore = create((set) => ({
  trabajador: {},
  setTrabajador: (estado) => set({ trabajador: estado }),
}));
