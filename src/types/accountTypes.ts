import { User } from "@prisma/client";

export type TokenBody = Omit<User, 'password'> & {
  iat: number,
  exp: number
}