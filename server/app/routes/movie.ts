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

// Login
router.get("/", requireAuth, movie.getAllMovies);

export default router;
