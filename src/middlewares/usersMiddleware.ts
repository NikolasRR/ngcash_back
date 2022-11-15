import { NextFunction, Request, Response } from "express";
import { userSchema } from "./schemas/userSchema.js";

function verifyUserData(req: Request, res: Response, next: NextFunction) {
  const validation = userSchema.validate(req.body, { abortEarly: false });
  if (validation.error) throw { 
    type: "user info", 
    message: validation.error.details.map(detail => detail.message)
  };

  next();
}

const middleware = {
  verifyUserData
}

export default middleware;