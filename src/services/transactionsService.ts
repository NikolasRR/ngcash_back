import { Transaction } from "@prisma/client";
import dayjs from "dayjs";
import transactionsRepo from "../repositories/transactionsRepository.js";
import accountService from "./accountsService.js";
import userService from "./usersService.js";

async function transferFunds(
  debitedAccId: number,
  creditedAccId: number,
  creditedUsername: string,
  value: number
) {
  if (debitedAccId === creditedAccId) throw { type: "authorization" };
  await userService.verifyUserExistence(creditedUsername, true);
  await accountService.verifyFunds(debitedAccId, value);

  await transactionsRepo.createTransaction(value, debitedAccId, creditedAccId);
}

async function getTransactionsFromAcc(accountId: number, date: string, type: string) {
  const start = date ? dayjs(date).toISOString() : null;
  const end = date ? dayjs(date).add(1, 'day').toISOString() : null;
  let history: Transaction[];

  switch (type) {
    case "in":
      history = await transactionsRepo.getAccCashInTransactionsById(accountId, start, end);
      break;
    case "out":
      history = await transactionsRepo.getAccCashOutTransactionsById(accountId, start, end);
      break;
    default:
      history = await transactionsRepo.getAllAccTransactionsById(accountId, start, end);

      break;
  }

  return formatHistory(history, accountId);
}

function formatHistory(transactions: Transaction[], accountId: number) {
  return transactions.map((transaction): Transaction & { type: string } => {
    return {
      id: transaction.id,
      value: transaction.value / 100,
      createdAt: transaction.createdAt,
      debitedAccountId: transaction.debitedAccountId,
      creditedAccountId: transaction.creditedAccountId,
      type: accountId === transaction.debitedAccountId ? "cash-out" : "cash-in"
    }
  })
}


const transactionsService = {
  transferFunds,
  getTransactionsFromAcc
}

export default transactionsService;