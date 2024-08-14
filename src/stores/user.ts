import { create } from "zustand";
import { UserEntity } from "@/interfaces";

interface UserState {
  user: UserEntity | null;
  selectedYear: number;
  setUser: (user: UserEntity) => void;
  removeUser: () => void;
  changeYear: (year: number) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  selectedYear: new Date().getFullYear(),
  setUser: (user: UserEntity) => set({ user }),
  removeUser: () => set({ user: null }),
  changeYear: (year: number) => set({ selectedYear: year }),
}));
