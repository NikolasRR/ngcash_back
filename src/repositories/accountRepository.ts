import { PrismaClient } from "@prisma/client";

import prisma from "../database/db.js";

async function createOne(prismaClient: PrismaClient) {
  return await prismaClient.account.create({
    data: {
      balance: 10000
    }
  })
}

async function getById(id: number) {
  return await prisma.account.findUnique({
    where: {
      id: id
    }
  })
}

const accountRepo = {
  createOne,
  getById
}

export default accountRepo;