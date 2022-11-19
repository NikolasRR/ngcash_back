import { Router } from "express";

import controllers from "../controllers/usersController.js";
import middleware from "../middlewares/usersMiddleware.js";

const usersRouter = Router();

usersRouter
  .post('/sign-up', middleware.verifyUserData, controllers.createUser)
  .post('/sign-in', middleware.verifyUserData, controllers.userSignIn)

export default usersRouter;