import { MovieAction } from "../actions/actionTypes";
import { MovieDto } from "../dtos/movie";

export interface movieState {
  allMovies: MovieDto[];
}

const initialState: movieState = {
  allMovies: []
};

export const movieReducer = (
  state: movieState = initialState,
  action: any
): movieState => {
  switch (action.type) {
    case MovieAction.GET_ALL_MOVIES.PROCESSING:
      return {
        ...state,
        allMovies: [],
      };
    case MovieAction.GET_ALL_MOVIES.SUCCESS:
      return {
        ...state,
        allMovies: action.payload,
      };
    case MovieAction.GET_ALL_MOVIES.FAILED:
      return {
        ...state,
        allMovies: [],
      };

    case MovieAction.ADD_NEW_MOVIE.PROCESSING:
      return {
        ...state,
      };
    case MovieAction.ADD_NEW_MOVIE.SUCCESS: {
      const movie = action.payload as MovieDto;
      return {
        ...state,
        allMovies: state.allMovies.concat(movie),
      };
    }
    case MovieAction.ADD_NEW_MOVIE.RESET:
    case MovieAction.ADD_NEW_MOVIE.FAILED:
      return {
        ...state,
      };

    case MovieAction.DELETE_MOVIE.PROCESSING:
      return {
        ...state,
      };
    case MovieAction.DELETE_MOVIE.SUCCESS: {
      return {
        ...state,
        allMovies: state.allMovies.filter(movie => movie.id !== action.payload),
      };
    }
    case MovieAction.DELETE_MOVIE.RESET:
    case MovieAction.DELETE_MOVIE.FAILED:
      return {
        ...state,
      };
    default:
      return state;
  }
};
