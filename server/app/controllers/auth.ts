import { Request, Response } from "express";
import { UserDto, UserModel } from "../models/User";
import bcrypt from 'bcrypt';
import jsonwebtoken from "jsonwebtoken";

// Create and Save a new user
export const signup = (req: Request, res: Response) => {
  // Create a user
  const user: UserDto = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  };

  // Save user in the database
  UserModel.create(user)
    .then((data) => {
      res.send("User added successfully");
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User.",
      });
    });
};

// login existing user
export const login = (req: Request, res: Response) => {
  UserModel.findOne({ where: { email: req.body.email } })
    .then((result) => {
      const user = result as UserDto;
      const isPasswordMatched = bcrypt.compareSync(req.body.password, user.password);

      const payload = {
        sub: user.email,
        iat: Date.now(),
      };
      if (isPasswordMatched) {
        const signedToken = jsonwebtoken.sign(payload, "testSecretKey");
        res.send(signedToken);
      }
      else {
        res.status(401).send("Please enter valid password");
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while login.",
      });
    })
};