import { Request, Response } from "express";

import { TransferReceiverInfo } from "../middlewares/schemas/transactionsSchemas.js";
import { TokenPayload } from "../middlewares/tokenValidator.js";
import transactionsService from "../services/transactionsService.js";

async function cashOut(req: Request, res: Response) {
  const token: TokenPayload = res.locals.tokenBody;
  const transferInfo: TransferReceiverInfo = req.body;
  await transactionsService.transferFunds(
    token.accountId, 
    transferInfo.accountId, 
    transferInfo.username,  
    Math.round(transferInfo.value*100)
  );

  res.sendStatus(200);
}

async function transactionsHistory(req: Request, res: Response) {
  const token: TokenPayload = res.locals.tokenBody;
  const transactionsType = req.query.type as string;
  const date = req.query.date as string;

  const history = await transactionsService.getTransactionsFromAcc(token.accountId, date, transactionsType);
  res.send(history);
}

const controllers = {
  cashOut,
  transactionsHistory
}

export default controllers;