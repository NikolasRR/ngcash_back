import { NextFunction, Request, Response } from "express";

import { dateFilterSchema, transferSchema } from "./schemas/transactionsSchemas.js";

function verifyTransferData(req: Request, res: Response, next: NextFunction) {
  const validation = transferSchema.validate(req.body, { abortEarly: false });
  if (validation.error) throw {
    type: "schema",
    message: validation.error.details.map(detail => detail.message)
  };

  next();
}

function verifyQueries(req: Request, res: Response, next: NextFunction) {
  const transactionsType = req.query.type as string;
  const dateFilter = req.query.date;

  const validation = dateFilterSchema.validate(dateFilter, { abortEarly: false });
  if (validation.error) throw {
    type: "schema",
    message: "check the data format"
  };

  const typeIsAcceptable =
    transactionsType === "in" ||
    transactionsType === "out" ||
    transactionsType === "" ||
    !transactionsType;

  if (typeIsAcceptable) {
    next();
    return;
  }

  throw { type: "query params" };
}

const middleware = {
  verifyTransferData,
  verifyQueries
}

export default middleware;