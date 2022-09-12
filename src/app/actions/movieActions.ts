
import { MovieDto } from "../dtos/movie";
import apiService from "../service/apiService";
import { AppDispatch } from "../store";
import { MovieAction } from "./actionTypes";
import { onHandleAlert, showLoader } from './commonAction'

export const getAllMovies = () => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: MovieAction.GET_ALL_MOVIES.PROCESSING });
    dispatch(showLoader(true));
    apiService
      .get(`/movies`)
      .then((res) => {
        const data: MovieDto[] = res.data;
        dispatch({
          type: MovieAction.GET_ALL_MOVIES.SUCCESS,
          payload: data
        });
        dispatch(showLoader(false));
      })
      .catch((e) => {
        dispatch({
          type: MovieAction.GET_ALL_MOVIES.FAILED,
          payload: e,
        });
        dispatch(showLoader(false));
      });
  };
};

export const addMovie = (movie: MovieDto, cb?: VoidFunction) => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: MovieAction.ADD_NEW_MOVIE.PROCESSING });
    dispatch(showLoader(true));
    apiService
      .post(`/movies/add-movie/`, movie)
      .then((res) => {
        const data = res.data;
        dispatch({
          type: MovieAction.ADD_NEW_MOVIE.SUCCESS,
          payload: data
        });
        dispatch(showLoader(false));
        dispatch(onHandleAlert("Movie Added successfully", true));
        if (cb) {
          cb();
        }
      })
      .catch((e) => {
        dispatch({
          type: MovieAction.ADD_NEW_MOVIE.FAILED,
          payload: e,
        });
        dispatch(showLoader(false));
        dispatch(onHandleAlert("Movie Added failed", false));
      });
  };
};

export const deleteMovie = (id: number) => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: MovieAction.DELETE_MOVIE.PROCESSING });
    dispatch(showLoader(true));
    apiService
      .delete(`/movies/` + id)
      .then((res) => {
        const data = res.data;
        dispatch({
          type: MovieAction.DELETE_MOVIE.SUCCESS,
          payload: data
        });
        dispatch(onHandleAlert("Movie deleted successfully", true));
        dispatch(showLoader(false));
        dispatch(getAllMovies());
      })
      .catch((e) => {
        dispatch({
          type: MovieAction.DELETE_MOVIE.FAILED,
          payload: e,
        });
        dispatch(onHandleAlert("Movie deleted failed", false));
        dispatch(showLoader(false));
      });
  };
};
