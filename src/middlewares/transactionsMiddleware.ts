import { NextFunction, Request, Response } from "express";

import { SortOrder, transferSchema } from "./schemas/transactionsSchemas.js";

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
  const order = req.query.orderBy as SortOrder;

  const typeIsAcceptable =
    transactionsType === "in" ||
    transactionsType === "out" ||
    transactionsType === "" ||
    !transactionsType;
  const orderIsAcceptable = order === "asc" || order === "desc" || order === "" || !order;

  if (typeIsAcceptable && orderIsAcceptable) {
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