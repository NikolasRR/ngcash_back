import { Request, Response } from "express";
import userService from "../services/usersService.js";

async function createUser(req: Request, res: Response) {
  const username = req.body.username;
  const password = req.body.password;

  await userService.createUser(username, password);
  res.sendStatus(201);
}

async function userSignIn(req: Request, res: Response) {
  const username = req.body.username;
  const password = req.body.password;

  const token = await userService.logInUser(username, password);
  res.send({ token: token });
}

const controllers = {
  createUser,
  userSignIn
}

export default controllers;