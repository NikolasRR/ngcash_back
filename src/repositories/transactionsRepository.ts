import { PrismaClient } from "@prisma/client";

import prisma from "../database/db.js";
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

    if(!transaction || !debited || !credited) throw { type: "database" };
  })
}

async function getTransactionsByAccId(id: number) {
  await prisma.transaction.findMany({
    where: {
      OR: [
        {
          creditedAccountId: id
        },
        {
          debitedAccountId: id
        }
      ]
    }
  })
}

const transactionsRepo = {
  createTransaction,
  getTransactionsByAccId
}

export default transactionsRepo;