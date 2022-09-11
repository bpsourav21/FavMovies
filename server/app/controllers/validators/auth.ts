import { check } from "express-validator";
import { validationHandler } from "../validators/validationHandler";

export const validateSignup = [
  check("name")
    .exists()
    .withMessage("Name missing")
    .not()
    .isEmpty()
    .withMessage("Name Empty"),
  check("email")
    .exists()
    .withMessage("Email missing")
    .not()
    .isEmpty()
    .withMessage("Email Empty")
    .isEmail()
    .withMessage("Email is not valid")
    .normalizeEmail()
    .toLowerCase(),
  check("password")
    .exists()
    .withMessage("Password missing")
    .not()
    .isEmpty()
    .withMessage("Password Empty")
    .isLength({ min: 5 })
    .withMessage("Password too short, minimum needs 5 character"),
  validationHandler
];

export const validateLogin = [
  check("email")
    .exists()
    .withMessage("Email missing")
    .not()
    .isEmpty()
    .withMessage("Email Empty")
    .isEmail()
    .withMessage("Email is not valid")
    .normalizeEmail()
    .toLowerCase(),
  check("password")
    .exists()
    .withMessage("Password missing")
    .not()
    .isEmpty()
    .withMessage("Password Empty"),
  validationHandler
];