import { Router } from "express";

import controllers from "../controllers/transactionsController.js";
import validateToken from "../middlewares/tokenValidator.js";
import middleware from "../middlewares/transactionsMiddleware.js";

const transactionRouter = Router();

transactionRouter
  .post('/cash-out', validateToken, middleware.verifyTransferData, controllers.cashOut);

export default transactionRouter;