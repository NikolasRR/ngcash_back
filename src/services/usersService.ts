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

function verifyUserPassword(user: User, password: string) {
  const correctPassword = bcrypt.compareSync(password, user.password);
  if(!correctPassword) throw { type: "authorization" };
}


const userService = {
  createUser
}

export default userService;