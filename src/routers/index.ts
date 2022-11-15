import { Router } from "express";

import accountRouter from "./accountsRouter.js";
import usersRouter from "./usersRouter.js";

const router = Router();

router
  .use(usersRouter)
  .use(accountRouter)

export default router;