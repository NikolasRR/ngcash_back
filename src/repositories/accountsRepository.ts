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

async function incrementBalance(id: number, value: number, prismaClient: PrismaClient) {
  return await prismaClient.account.update({
    where: {
      id: id
    },
    data: {
      balance: {
        increment: value
      }
    }
  })
}

async function decrementBalance(id: number, value: number, prismaClient: PrismaClient) {
  return await prismaClient.account.update({
    where: {
      id: id
    },
    data: {
      balance: {
        decrement: value
      }
    }
  })
}


const accountRepo = {
  createOne,
  getById,
  incrementBalance,
  decrementBalance
}

export default accountRepo;