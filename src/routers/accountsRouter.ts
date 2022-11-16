import { Router } from "express";

import controllers from "../controllers/accountsController.js";
import validateToken from "../middlewares/tokenValidator.js";

const accountRouter = Router();

accountRouter
  .get('/balance', validateToken, controllers.getBalance)

export default accountRouter;