import { Request, Response } from "express";

import { TransferReceiverInfo } from "../middlewares/schemas/transferSchema.js";
import { TokenPayload } from "../middlewares/tokenValidator.js";
import transactionsService from "../services/transactionsService.js";

async function cashOut(req: Request, res: Response) {
  const token: TokenPayload = res.locals.tokenBody;
  const transferInfo: TransferReceiverInfo = req.body;
  await transactionsService.transferFunds(
    token.accountId, 
    transferInfo.accountId, 
    transferInfo.username,  
    transferInfo.value
  );

  res.sendStatus(200);
}

const controllers = {
  cashOut
}

export default controllers;