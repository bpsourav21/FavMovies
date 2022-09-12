import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import _ from "underscore";
import { addMovie, deleteMovie, getAllMovies } from "../actions/movieActions";
import { MovieDto } from "../dtos/movie";
import { useAppSelector, useAppDispatch } from "../hooks";

const Movies = () => {
  const allMovies = useAppSelector((state) => state.movie.allMovies);
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

  const onAddMovie = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    var target = e.currentTarget as HTMLFormElement;
    const movie: MovieDto = {
      name: target._movieName.value,
      id: 0 // Ideally Id will be overriden
    }

    dispatch(addMovie(movie));
  }

  const renderTable = () => {
    const rowData = _.map(allMovies, (movie: MovieDto, i: number) => {
      return (
        <tr key={"item_" + (i + 1)}>
          <td>{i + 1}</td>
          <td width={100}>{movie.id}</td>
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
            <th>Sl no.</th>
            <th>Movie Id</th>
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
      <h1>Favourite Movie List</h1>
      <br />
      <form onSubmit={(e) => onAddMovie(e)}>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Add Movie"
            name="_movieName"
          />
          <div className="input-group-append">
            <button type="submit" className="btn btn-primary">Add</button>
          </div>
        </div>
      </form>
      {renderTable()}
    </div>
  );
};

export default Movies;
