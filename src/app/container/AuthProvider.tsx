import { createContext } from "react";
import { useAppSelector } from "../hooks";

export type AuthContextProps = {
  isAuthenticated: boolean;
};

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: any) => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
