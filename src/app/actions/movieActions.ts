
import { MovieDto } from "../dtos/movie";
import apiService from "../service/apiService";
import { AppDispatch } from "../store";
import { AlertAction, MovieAction } from "./actionTypes";

export const getAllMovies = () => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: MovieAction.GET_ALL_MOVIES.PROCESSING });
    apiService
      .get(`/movies`)
      .then((res) => {
        const data: MovieDto[] = res.data;
        dispatch({
          type: MovieAction.GET_ALL_MOVIES.SUCCESS,
          payload: data
        });
      })
      .catch((e) => {
        dispatch({
          type: MovieAction.GET_ALL_MOVIES.FAILED,
          payload: e,
        });
      });
  };
};


export const resetMovie = () => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: MovieAction.GET_MOVIE.RESET });
  }
}

export const getOneMovie = (id: number) => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: MovieAction.GET_MOVIE.PROCESSING });
    apiService
      .get(`/movies/` + id)
      .then((res) => {
        const data: MovieDto = res.data;
        dispatch({
          type: MovieAction.GET_MOVIE.SUCCESS,
          payload: data
        });
      })
      .catch((e) => {
        dispatch({
          type: MovieAction.GET_MOVIE.FAILED,
          payload: e,
        });
        dispatch(onHandleAlert("No movie found", false));
      });
  };
};

export const addMovie = (movie: MovieDto, cb?: VoidFunction) => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: MovieAction.ADD_NEW_MOVIE.PROCESSING });
    apiService
      .post(`/movies/`, movie)
      .then((res) => {
        const data = res.data;
        dispatch({
          type: MovieAction.ADD_NEW_MOVIE.SUCCESS,
          payload: data
        });
        dispatch(onHandleAlert("movie Added successfully", true));
        if (cb) {
          cb();
        }
      })
      .catch((e) => {
        dispatch({
          type: MovieAction.ADD_NEW_MOVIE.FAILED,
          payload: e,
        });
        dispatch(onHandleAlert("movie Added failed", false));
      });
  };
};

export const deleteMovie = (id: number) => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: MovieAction.DELETE_MOVIE.PROCESSING });
    apiService
      .delete(`/movies/` + id)
      .then((res) => {
        const data = res.data;
        dispatch({
          type: MovieAction.DELETE_MOVIE.SUCCESS,
          payload: data
        });
        dispatch(onHandleAlert("movie deleted successfully", true));
        dispatch(getAllMovies());
      })
      .catch((e) => {
        dispatch({
          type: MovieAction.DELETE_MOVIE.FAILED,
          payload: e,
        });
        dispatch(onHandleAlert("movie deleted failed", false));
      });
  };
};

export const onHandleAlert = (msg: string, isSuccess: boolean = true) => {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: isSuccess ? AlertAction.SUCCESS : AlertAction.FAILED,
      payload: msg
    });
    setTimeout(() => {
      dispatch({ type: AlertAction.NONE });
    }, 3000)
  };
};
