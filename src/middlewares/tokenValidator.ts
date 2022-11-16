import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "@prisma/client";

export type TokenPayload = Omit<User, 'password'> & {
  iat: number,
  exp: number
}

function validateToken(req: Request, res: Response, next: NextFunction) {
  jwt.verify(req.headers.authorization, process.env.SUPERSECRET_JWTKEY, (err, decoded) => {
    if (err) throw { type: "token", message: err.message }
    res.locals.tokenBody = decoded;
  });
  next();
}

export default validateToken;