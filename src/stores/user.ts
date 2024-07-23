import { create } from "zustand";
import { UserEntity } from "@/interfaces";

interface UserState {
  user: UserEntity | null;
  setUser: (user: UserEntity) => void;
  removeUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user: UserEntity) => set({ user }),
  removeUser: () => set({ user: null }),
}));
