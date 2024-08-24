import { currentYear } from "@/constants";
import { create } from "zustand";

interface SelectedYearState {
  selectedYear: number;
  changeYear: (year: number) => void;
}

export const useSelectedYearStore = create<SelectedYearState>((set) => ({
  selectedYear: currentYear,
  changeYear: (year: number) => set({ selectedYear: year }),
}));
