import { create } from "zustand";

interface SelectedYearState {
  selectedYear: number;
  changeYear: (year: number) => void;
}

export const useSelectedYearStore = create<SelectedYearState>((set) => ({
  selectedYear: new Date().getFullYear(),
  changeYear: (year: number) => set({ selectedYear: year }),
}));
