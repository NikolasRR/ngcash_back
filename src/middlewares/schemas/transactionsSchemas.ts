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

const DateRegexPattern = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
export const dateFilterSchema = Joi.string().pattern(DateRegexPattern);