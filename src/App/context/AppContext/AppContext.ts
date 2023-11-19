import { createContext, useContext } from "react";
import { AppContextType } from "@/types";

export const AppContext = createContext<AppContextType | null>(null);

export const useAppContext = (): AppContextType => useContext(AppContext) as AppContextType;