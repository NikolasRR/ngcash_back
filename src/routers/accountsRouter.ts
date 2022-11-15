import { Router } from "express";
import controllers from "../controllers/accountsController.js";


const accountRouter = Router();

accountRouter
  .get('/balance', controllers.getBalance)

export default accountRouter;