import express, { json } from "express";
import dotenv from "dotenv";
import cors from "cors";
import "express-async-errors";

import router from "./routers/index.js";
import errorHandler from "./errors/errorHandler.js";

dotenv.config();

const app = express()
    .use(cors())
    .use(json())
    .use(router)
    .use(errorHandler);

export default app;