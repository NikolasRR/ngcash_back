import { NextFunction, Request, Response } from "express";

type error = {
  type: string,
  message: string
};

async function errorHandler(error: error, req: Request, res: Response, next: NextFunction) {
  let code: number;

  switch (error.type) {
    case "id invalid":
      code = 400;
      error.message = "article id provided is invalid";
      break;
    case "query invalid":
      code = 400;
      error.message = "query params are wrong";
      break;
    case "not found":
      code = 404;
      error.message = "article not found";
      break;
    default:
      code = 500;
      break;
  }
  res.status(code).send(error.message);
}

export default errorHandler;