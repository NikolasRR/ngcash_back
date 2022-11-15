import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import usersRepo from "../repositories/userRepository.js";

async function verifyUserExistence(username: string, shouldExist: boolean) {
  const user = await usersRepo.getByUsername(username);
  if(!user && shouldExist) throw { type: "not found" };
  if(user && !shouldExist) throw { type: "conflict" };

  return user;
}

async function createUser(username: string, password: string) {
  await verifyUserExistence(username, false);
  const hashedPassword = bcrypt.hashSync(password, 10);
  
  await usersRepo.createOne(username, hashedPassword);
}

function verifyUserPassword(hashedPassword: string, password: string) {
  const correctPassword = bcrypt.compareSync(password, hashedPassword);
  if(!correctPassword) throw { type: "authorization" };
}

async function logInUser(username: string, password: string) {
  const user = await verifyUserExistence(username, true);
  verifyUserPassword(user.password, password);

  delete user.password;
  const TwentyFourHours = '24h';
  const token = jwt.sign(user, process.env.SUPERSECRET_JWTKEY, { expiresIn: TwentyFourHours });
  return token;
}


const userService = {
  createUser,
  logInUser
}

export default userService;