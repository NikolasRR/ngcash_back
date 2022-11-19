import { Request, Response } from "express";

import { TokenPayload } from "../middlewares/tokenValidator.js";
import accountService from "../services/accountsService.js";

async function getBalance(req: Request, res: Response) {
  const token = res.locals.tokenBody as TokenPayload;
  const account = await accountService.getAccountBalance(token);

  res.send(account);
}

const controllers = {
  getBalance
}

export default controllers;