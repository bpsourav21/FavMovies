import _ from "underscore";
import {
  AuthAction
} from "../actions/actionTypes";
import { getAuthToken } from "../actions/authActions";

export interface AuthState {
  isLoading: boolean;
  loginErrorMsg: string;
  isAuthenticated: boolean;
}

const isAuthPresent = !_.isEmpty(getAuthToken());
const initialState: AuthState = {
  isLoading: false,
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
        isLoading: true,
        loginErrorMsg: "",
      };
    case AuthAction.LOGIN.SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
      };
    case AuthAction.LOGIN.FAILED:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
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
