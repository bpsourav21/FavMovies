import { AlertAction, LoadingAction } from "../actions/actionTypes";

export interface AlertType {
  message: string;
  state: "success" | "failed"
}

export interface CommonState {
  isLoading: boolean;
  error: string;
  alert: AlertType | null
}

const initialState: CommonState = {
  isLoading: false,
  error: "",
  alert: null
};

export const commonReducer = (
  state: CommonState = initialState,
  action: any
): CommonState => {
  switch (action.type) {
    case AlertAction.SUCCESS:
      return {
        ...state,
        alert: { message: action.payload, state: 'success' }
      }
    case AlertAction.FAILED:
      return {
        ...state,
        alert: { message: action.payload, state: 'failed' }
      }
    case AlertAction.NONE:
      return {
        ...state,
        alert: null
      }

    case LoadingAction.LOADING:
      return {
        ...state,
        isLoading: action.payload
      }

    default:
      return state;
  }
};
