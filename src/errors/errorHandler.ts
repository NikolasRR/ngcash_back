import { NextFunction, Request, Response } from "express";

type error = {
  type: string,
  message: string
};

async function errorHandler(error: error, req: Request, res: Response, next: NextFunction) {
  let code: number;

  switch (error.type) {
    case "user info":
      code = 400;
      break;
    case "conflict":
      code = 401;
      error.message = "username already taken";
      break;
    case "not found":
      code = 404;
      error.message = "user not found";
      break;
    case "authorization":
      code = 409;
      error.message = "unauthorized";
      break;
    case "database":
      code = 500;
      error.message = "something went wrong while creating the account and user";
      break;
    default:
      code = 500;
      break;
  }
  res.status(code).send(error.message);
}

export default errorHandler;