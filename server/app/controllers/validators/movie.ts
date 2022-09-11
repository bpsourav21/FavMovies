import { check } from "express-validator";
import { validationHandler } from "../validators/validationHandler";

export const validateAddingMovie = [
  check("name")
    .exists()
    .withMessage("Name missing")
    .not()
    .isEmpty()
    .withMessage("Name Empty"),
  check("userId")
    .exists()
    .withMessage("User Id is missing")
    .not()
    .isEmpty()
    .withMessage("User Id is Empty"),
  validationHandler
];