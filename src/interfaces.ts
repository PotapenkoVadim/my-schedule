import { ThemeVariant, UserRole } from "./types";

export interface UserCredentials {
  username: string;
  password: string;
}

export interface UserSettingsEntity {
  id: number;
  createdAt: string;
  updatedAt: string;
  ownerId: number;
  theme: ThemeVariant;
}

export interface UserEntity {
  id: number;
  username: string;
  role: UserRole;
  hash: string;
  salt: string;
  settings: {};
  createdAt: string;
  updatedAt: string;
}
