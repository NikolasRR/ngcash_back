import { PrismaClient } from "@prisma/client";

import prisma from "../database/db.js";

async function createOne(prismaClient: PrismaClient) {
  return await prismaClient.account.create({
    data: {
      balance: 10000
    }
  })
}

const accountRepo = {
  createOne
}

export default accountRepo;