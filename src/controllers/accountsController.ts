import { Request, Response } from "express";
import accountService from "../services/accountsService.js";

async function getBalance(req: Request, res: Response) {
  const token = req.body.token;
  const account = await accountService.getAccountBalance(token);
  account.balance /= 100;

  res.send(account);
}

const controllers = {
  getBalance
}

export default controllers;