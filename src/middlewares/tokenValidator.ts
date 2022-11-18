import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "@prisma/client";

export type TokenPayload = Omit<User, 'password'> & {
  iat: number,
  exp: number
}

function validateToken(req: Request, res: Response, next: NextFunction) {
  const providedToken = req.headers.authorization;
  const key = process.env.SUPERSECRET_JWTKEY;
  jwt.verify(providedToken, key, (err, decoded) => {
    if (err) throw { type: "token", message: err.message }
    res.locals.tokenBody = decoded;
  });
  next();
}

export default validateToken;