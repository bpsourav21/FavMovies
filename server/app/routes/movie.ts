import { Router } from "express";
import passport from "../config/passport";
import * as movie from "../controllers/movie";
import { validateAddingMovie } from "../controllers/validators/movie";

const router = Router();
const requireAuth = passport.authenticate("jwt", {
    session: false,
});

// Add movie
router.post("/add-movie", requireAuth, validateAddingMovie, movie.addMovie);

// Get all movies
router.get("/", requireAuth, movie.getAllMovies);

// Delete a movie
router.delete("/:id", requireAuth, movie.deleteOneMovie);

export default router;
