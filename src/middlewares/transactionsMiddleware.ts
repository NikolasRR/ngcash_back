import { NextFunction, Request, Response } from "express";

import { transferSchema } from "./schemas/transferSchema.js";

function verifyTransferData(req: Request, res: Response, next: NextFunction) {
  const validation = transferSchema.validate(req.body, { abortEarly: false });
  if (validation.error) throw { 
    type: "schema", 
    message: validation.error.details.map(detail => detail.message)
  };

  next();
}

const middleware = {
  verifyTransferData
}

export default middleware;