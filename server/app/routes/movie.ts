import { Router } from "express";
import * as movie from "../controllers/movie";
import { validateAddingMovie } from "../controllers/validators/movie";

const router = Router();

// Add movie
router.post("/add-movie", validateAddingMovie, movie.addMovie);

// Login
router.get("/", movie.getAllMovies);

export default router;
