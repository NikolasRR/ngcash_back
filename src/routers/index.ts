import { Router} from "express";
import usersRouter from "./usersRouter";

const router = Router();

router.use(usersRouter)

export default router;