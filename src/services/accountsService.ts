import { TokenPayload } from "../middlewares/tokenValidator.js";
import accountRepo from "../repositories/accountsRepository.js";

async function getAccountBalance(data: TokenPayload) {
  const account = await accountRepo.getById(data.accountId);
  account.balance /= 100;

  return account;
}

async function verifyFunds(accountId: number, value: number) {
  const account = await accountRepo.getById(accountId);

  const fundsAreSuficient = (account.balance - value*100) >= 0;
  if(fundsAreSuficient) return;

  throw { type: "funds" };
}

const accountService = {
  getAccountBalance,
  verifyFunds
}

export default accountService;