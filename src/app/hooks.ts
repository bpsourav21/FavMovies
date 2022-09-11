import { useContext } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AuthContext, AuthContextProps } from "./container/AuthProvider";
import type { RootState, AppDispatch } from "./store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppAuth = (): Readonly<AuthContextProps> => useContext(AuthContext);
