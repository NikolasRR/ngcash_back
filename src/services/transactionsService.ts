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

const transactionsService = {
  transferFunds
}

export default transactionsService;