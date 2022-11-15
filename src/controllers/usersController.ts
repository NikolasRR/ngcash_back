import { Request, Response } from "express";
import userService from "../services/usersService.js";

async function createUser(req: Request, res: Response) {
  const username = req.body.username;
  const password = req.body.password;

  await userService.createUser(username, password);
  res.sendStatus(201);
}

const controllers = {
  createUser
}

export default controllers;