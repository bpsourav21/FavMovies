import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import _ from "underscore";
import { deleteMovie, getAllMovies } from "../actions/movieActions";
import { MovieDto } from "../dtos/movie";
import { useAppSelector, useAppDispatch } from "../hooks";

const Movies = () => {
  const allMovies = useAppSelector((state) => state.movie.allmovies);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllMovies());
  }, []);

  const onClickDelete = (id: number) => {
    if (window.confirm("Do you really want to delete?")) {
      dispatch(deleteMovie(id))
    }
  }

  const renderTable = () => {
    const rowData = _.map(allMovies, (movie: MovieDto, i: number) => {
      return (
        <tr key={"item_" + (i + 1)}>

          <td>{movie.name}</td>
          <td width={100} className="text-center">
            <button className="btn btn-sm" onClick={() => onClickDelete(movie.id)}>
              <i className="fas fa-trash"></i>
            </button>
          </td>
        </tr>
      );
    });

    return (
      <table className="table table-striped table-hover table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>{rowData}</tbody>
      </table>
    );
  }

  return (
    <div className="page">
      <h1>Movie Information</h1>
      <div className="d-grid gap-2 d-md-flex d-sm-flex justify-content-md-end justify-content-sm-end mb-3">
        <button className="btn btn-primary" onClick={() => navigate("/add-Movie")}>Add Movie</button>
      </div>
      {renderTable()}
    </div>
  );
};

export default Movies;
