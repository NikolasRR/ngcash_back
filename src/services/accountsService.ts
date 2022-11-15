import jwt from "jsonwebtoken";
import accountRepo from "../repositories/accountRepository.js";
import { TokenBody } from "../types/accountTypes.js";

async function getAccountBalance(token: string) {
  let tokenData: TokenBody;
  jwt.verify(token, process.env.SUPERSECRET_JWTKEY, (err, decoded) => {
    if (err) throw { type: "token", message: err.message }
    tokenData = decoded as TokenBody;
  });

  return await accountRepo.getById(tokenData.accountId);
}

const accountService = {
  getAccountBalance
}

export default accountService;