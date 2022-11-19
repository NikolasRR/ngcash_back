import { Router } from "express";

import controllers from "../controllers/transactionsController.js";
import validateToken from "../middlewares/tokenValidator.js";
import middleware from "../middlewares/transactionsMiddleware.js";

const transactionRouter = Router();

transactionRouter
  .post('/transactions/cash-out', validateToken, middleware.verifyTransferData, controllers.cashOut)
  .get('/transactions', validateToken, middleware.verifyQueries, controllers.transactionsHistory)

export default transactionRouter;