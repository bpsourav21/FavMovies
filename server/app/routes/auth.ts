import { Router } from "express";
import * as auth from "../controllers/auth";
import { validateLogin, validateSignup } from "../controllers/validators/auth";

const router = Router();

// Sign up
router.post("/signup", validateSignup, auth.signup);

// Login
router.post("/login", validateLogin, auth.login);

export default router;
