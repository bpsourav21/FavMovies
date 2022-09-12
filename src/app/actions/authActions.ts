import { LoginDto, SignupDto } from "../dtos/auth";
import { AppDispatch } from "../store";
import { AuthAction } from "./actionTypes";
import _ from "underscore";
import apiService from "../service/apiService";
import { showLoader } from "./commonAction";

export const authTokenKey = "accessToken";

export const setAuthToken = (authValue: string) => {
  return localStorage.setItem(authTokenKey, authValue);
};

export const getAuthToken = (): string | null => {
  return localStorage.getItem(authTokenKey);
};

export const login = (
  input: LoginDto,
  callback: VoidFunction
) => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: AuthAction.LOGIN.PROCESSING });
    dispatch(showLoader(true));
    apiService
      .post(`/auth/login`, input)
      .then((res) => {
        const token: string = res.data;
        dispatch({ type: AuthAction.LOGIN.SUCCESS });
        dispatch(showLoader(false));
        setAuthToken(token);
        callback();
      })
      .catch((e) => {
        dispatch({ type: AuthAction.LOGIN.FAILED, payload: e });
        dispatch(showLoader(false));
        setAuthToken("");
      });
  };
};

export const signup = (
  input: SignupDto,
  callback: VoidFunction
) => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: AuthAction.SIGNUP.PROCESSING });
    dispatch(showLoader(true));
    apiService
      .post(`/auth/signup`, input)
      .then((res) => {
        dispatch({ type: AuthAction.SIGNUP.SUCCESS });
        dispatch(showLoader(false));
        callback();
      })
      .catch((e) => {
        dispatch({ type: AuthAction.SIGNUP.FAILED, payload: e });
        dispatch(showLoader(false));
      });
  };
};

export const logout = (callback: VoidFunction) => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: AuthAction.LOGOUT });
    setAuthToken("");
    callback();
  };
};

export const isUserAuthenticated = () => {
  return (dispatch: AppDispatch) => {
    const isAuthPresent = !_.isEmpty(getAuthToken());
    dispatch({ type: AuthAction.AUTHENTICATION, payload: isAuthPresent });
  };
};
