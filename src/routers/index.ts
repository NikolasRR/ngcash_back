import { Router } from "express";

import accountRouter from "./accountsRouter.js";
import transactionRouter from "./transactionsRouter.js";
import usersRouter from "./usersRouter.js";

const router = Router();

router
  .use(usersRouter)
  .use(accountRouter)
  .use(transactionRouter)

export default router;