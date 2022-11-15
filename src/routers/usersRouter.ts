import { Router} from "express";
import controllers from "../controllers/usersController";

const usersRouter = Router();

usersRouter.post('/sign-up', controllers.createUser)

export default usersRouter;