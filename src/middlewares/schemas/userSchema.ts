import { User } from "@prisma/client";
import Joi from "joi";

export const userSchema = Joi.object<User>({
    username: Joi.string().min(3).required(),
    password: Joi.string().min(8).required()
});