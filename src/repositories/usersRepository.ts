import { PrismaClient } from "@prisma/client";

import prisma from "../database/db.js";
import accountRepo from "./accountsRepository.js";

async function createOne(username: string, password: string) {
  await prisma.$transaction(async (unCommitedPrisma: PrismaClient) => {
    const account = await accountRepo.createOne(unCommitedPrisma);
    if (!account) throw { type: "database" };

    const user = await unCommitedPrisma.user.create({
      data: {
        username: username,
        password: password,
        accountId: account.id
      }
    });
    if (!user) throw { type: "database" };
  });
}

async function getByUsername(username: string) {
  return await prisma.user.findUnique({
    where: {
      username: username
    }
  })
}

const usersRepo = {
  getByUsername,
  createOne
}

export default usersRepo;