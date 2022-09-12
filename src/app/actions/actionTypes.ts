interface RequestState {
  PROCESSING: string;
  SUCCESS: string;
  FAILED: string;
  RESET: string;
}

const actionGenerator = (action: string): RequestState => {
  const processedAction = action.toUpperCase() + "_";
  return {
    PROCESSING: processedAction + "PROCESSING",
    SUCCESS: processedAction + "SUCCESS",
    FAILED: processedAction + "FAILED",
    RESET: processedAction + "RESET",
  }
}

const requestGenerator = (action: string): string => {
  return action.toUpperCase() + "_" + "REQUEST";
}

export const AuthAction = {
  LOGIN: actionGenerator("LOGIN"),
  SIGNUP: actionGenerator("SIGNUP"),
  LOGOUT: requestGenerator("LOGOUT"),
  AUTHENTICATION: requestGenerator("AUTHENTICATION"),
};

export const MovieAction = {
  GET_ALL_MOVIES: actionGenerator("GET_ALL_MOVIES"),
  GET_MOVIE: actionGenerator("GET_MOVIE"),
  ADD_NEW_MOVIE: actionGenerator("ADD_NEW_MOVIE"),
  DELETE_MOVIE: actionGenerator("DELETE_MOVIE"),
};

export const AlertAction = {
  SUCCESS: "SUCCESS",
  FAILED: "FAILED",
  NONE: "NONE",
};

export const LoadingAction = {
  LOADING: requestGenerator("LOADING")
};
