import { create } from "zustand";
import { UserCredentials, UserEntity } from "@/interfaces";

interface UserState {
  user: UserEntity | null;
  credentials?: UserCredentials;
  setUser: (user: UserEntity) => void;
  removeUser: () => void;
  setCredentials: (credentials?: UserCredentials) => void;
  resetCredentials: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  credentials: undefined,
  setUser: (user: UserEntity) => set({ user }),
  removeUser: () => set({ user: null }),
  setCredentials: (credentials?: UserCredentials) => set({ credentials }),
  resetCredentials: () => set({ credentials: undefined }),
}));
