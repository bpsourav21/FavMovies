import _ from "underscore";
import {
  AuthAction
} from "../actions/actionTypes";
import { getAuthToken } from "../actions/authActions";

export interface AuthState {
  loginErrorMsg: string;
  isAuthenticated: boolean;
}

const isAuthPresent = !_.isEmpty(getAuthToken());
const initialState: AuthState = {
  loginErrorMsg: "",
  isAuthenticated: isAuthPresent,
};

export const authReducer = (
  state: AuthState = initialState,
  action: any
): AuthState => {
  switch (action.type) {
    case AuthAction.LOGIN.PROCESSING:
      return {
        ...state,
        loginErrorMsg: "",
      };
    case AuthAction.LOGIN.SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
      };
    case AuthAction.LOGIN.FAILED:
      return {
        ...state,
        isAuthenticated: false,
        loginErrorMsg: action.payload,
      };

    case AuthAction.SIGNUP.PROCESSING:
      return {
        ...state,
        loginErrorMsg: "",
      };
    case AuthAction.SIGNUP.SUCCESS:
      return {
        ...state,
      };
    case AuthAction.SIGNUP.FAILED:
      return {
        ...state,
        loginErrorMsg: action.payload,
      };
    case AuthAction.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
      };
    case AuthAction.AUTHENTICATION:
      return {
        ...state,
        isAuthenticated: action.payload,
      };
    default:
      return state;
  }
};
