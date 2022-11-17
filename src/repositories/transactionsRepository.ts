import { PrismaClient } from "@prisma/client";

import prisma from "../database/db.js";
import { SortOrder } from "../middlewares/schemas/transactionsSchemas.js";
import accountRepo from "./accountsRepository.js";

async function createTransaction(value: number, from: number, to: number) {
  await prisma.$transaction(async (unCommitedPrisma: PrismaClient) => {

    const debited = await accountRepo.decrementBalance(from, value, unCommitedPrisma);
    const credited = await accountRepo.incrementBalance(to, value, unCommitedPrisma);
    const transaction = await unCommitedPrisma.transaction.create({
      data: {
        createdAt: new Date(),
        value: value,
        debitedAccountId: from,
        creditedAccountId: to
      }
    });

    if (!transaction || !debited || !credited) throw { type: "database" };
  })
}

async function getAccCashInTransactionsById(accountId: number | null, organizer: SortOrder) {
  return await prisma.transaction.findMany({
    where: {
      creditedAccountId: accountId
    },
    orderBy: {
      createdAt: organizer
    }
  })
}

async function getAccCashOutTransactionsById(accountId: number, organizer: SortOrder) {
  return await prisma.transaction.findMany({
    where: {
      debitedAccountId: accountId
    },
    orderBy: {
      createdAt: organizer
    }
  })
}

async function getAllAccTransactionsById(accountId: number, organizer: SortOrder) {
  return await prisma.transaction.findMany({
    where: {
      OR: [
        {
          debitedAccountId: accountId
        },
        {
          creditedAccountId: accountId
        }
      ]
    },
    orderBy: {
      createdAt: organizer
    }
  })
}

const transactionsRepo = {
  createTransaction,
  getAccCashInTransactionsById,
  getAccCashOutTransactionsById,
  getAllAccTransactionsById
}

export default transactionsRepo;