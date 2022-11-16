import Joi from "joi";

export type TransferReceiverInfo = {
  accountId: number,
  username: string,
  value: number
}

export const transferSchema = Joi.object<TransferReceiverInfo>({
    accountId: Joi.number().required(),
    username: Joi.string().min(3).required(),
    value: Joi.number().required()
});