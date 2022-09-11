import { MovieAction } from "../actions/actionTypes";
import { MovieDto } from "../dtos/movie";

export interface movieState {
  isLoading: boolean;
  allmovies: MovieDto[];
  movie: MovieDto;
}

const emptymovie = {} as MovieDto;

const initialState: movieState = {
  isLoading: false,
  allmovies: [],
  movie: emptymovie
};

export const movieReducer = (
  state: movieState = initialState,
  action: any
): movieState => {
  switch (action.type) {
    case MovieAction.GET_ALL_MOVIES.PROCESSING:
      return {
        ...state,
        allmovies: [],
        isLoading: true,
      };
    case MovieAction.GET_ALL_MOVIES.SUCCESS:
      return {
        ...state,
        allmovies: action.payload,
        isLoading: false,
      };
    case MovieAction.GET_ALL_MOVIES.FAILED:
      return {
        ...state,
        allmovies: [],
        isLoading: false,
      };

    case MovieAction.GET_MOVIE.PROCESSING:
      return {
        ...state,
        movie: emptymovie,
        isLoading: true,
      };
    case MovieAction.GET_MOVIE.SUCCESS: {
      const currentmovie = action.payload as MovieDto;
      return {
        ...state,
        movie: currentmovie,
        isLoading: false,
      };
    }
    case MovieAction.GET_MOVIE.RESET:
    case MovieAction.GET_MOVIE.FAILED:
      return {
        ...state,
        movie: emptymovie,
        isLoading: false,
      };
    default:
      return state;
  }
};
