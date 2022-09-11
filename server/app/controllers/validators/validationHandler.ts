import { validationResult, ValidationError } from "express-validator";
import { NextFunction, Request, Response } from "express";

const errorFormatter = ({ location, msg, param, value, nestedErrors }: ValidationError) => {
  return `${location}[${param}]: ${msg}`;
};

export const validationHandler = (req: Request, res: Response, next: NextFunction) => {
  const result = validationResult(req).formatWith(errorFormatter);
  if (result.isEmpty()) {
    next();
  }
  else {
    return res.status(400).json({ errors: result.array() });
  }
};
