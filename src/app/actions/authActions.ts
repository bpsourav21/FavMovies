import { LoginDto } from "../dtos/auth";
import { AppDispatch } from "../store";
import { AuthAction } from "./actionTypes";
import _ from "underscore";
import apiService from "../service/apiService";

export const authTokenKey = "accessToken";

export const setAuthToken = (authValue: string) => {
  return localStorage.setItem(authTokenKey, authValue);
};

export const getAuthToken = (): string | null => {
  return localStorage.getItem(authTokenKey);
};

export const login = (
  email: string,
  password: string,
  callback: VoidFunction
) => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: AuthAction.LOGIN.PROCESSING });
    const loginCred: LoginDto = {
      email: email,
      password: password,
    };
    apiService
      .post(`/login`, loginCred)
      .then((res) => {
        const token: string = res.data;
        dispatch({ type: AuthAction.LOGIN.SUCCESS });
        setAuthToken(token);
        callback();
      })
      .catch((e) => {
        dispatch({ type: AuthAction.LOGIN.FAILED, payload: e });
        setAuthToken("");
      });
  };
};

export const logout = () => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: AuthAction.LOGOUT });
    setAuthToken("");
  };
};

export const isUserAuthenticated = () => {
  return (dispatch: AppDispatch) => {
    const isAuthPresent = !_.isEmpty(getAuthToken());
    dispatch({ type: AuthAction.AUTHENTICATION, payload: isAuthPresent });
  };
};
