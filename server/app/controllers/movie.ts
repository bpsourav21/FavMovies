import { Request, Response } from "express";
import _ from 'underscore';
import { MovieDto, MovieModel } from "../models/Movie";

// Add new movie
export const addMovie = (req: Request, res: Response) => {
  const movie: MovieDto = {
    name: req.body.name,
    userId: req.body.userId
  };

  // Save Movie in the database
  MovieModel.create(movie)
    .then((data) => {
      res.send("Movie added")
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Profile.",
      });
    });
};

// Retrieve all Movies for a user from the database.
export const getAllMovies = (req: Request, res: Response) => {
  const userId = req.query.userId as string;
  var condition = userId ? { userId: userId } : undefined;

  MovieModel.findAll({
    where: condition
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Profiles.",
      });
    });
};

// Delete a Movie with the specified id in the request
export const deleteOneMovie = (req: Request, res: Response) => {
  const id = req.params.id;

  MovieModel.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Movie was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Movie with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Profile with id=" + id
      });
    });
};