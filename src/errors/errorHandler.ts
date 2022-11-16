import { NextFunction, Request, Response } from "express";

type error = {
  type: string,
  message: string
};

async function errorHandler(error: error, req: Request, res: Response, next: NextFunction) {
  let code: number;

  switch (error.type) {
    case "schema":
      code = 400;
      break;
    case "token":
      code = 400;
      break;
      case "funds":
      code = 400;
      error.message = "insuficient funds"
      break;
    case "authorization":
      code = 401;
      error.message = "unauthorized";
      break;
    case "not found":
      code = 404;
      error.message = "user not found";
      break;
    case "conflict":
      code = 409;
      error.message = "username already taken";
      break;
    case "database":
      code = 500;
      error.message = "error in the database";
      break;
    default:
      code = 500;
      break;
  }
  res.status(code).send(error.message);
}

export default errorHandler;