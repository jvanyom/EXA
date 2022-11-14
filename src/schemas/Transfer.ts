import { isValidPhoneNumber } from "libphonenumber-js";
import { object, string, number } from "yup";

const phone = string()
    .trim()
    .required()
    .test((value, context) => {
        return isValidPhoneNumber(value ?? "") || context.createError({ type: "invalid" });
    });

const customer = object({
    name: string().trim().required(),
    surname: string().trim().required(),
    phone
});

export const transferSchema = object({
    sender: customer,
    payee: customer.shape({
        phone: phone.test((value, context) => {
            const senderPhone = context["from"][1].value.sender.phone as string;

            return (
                value !== senderPhone ||
                context.createError({
                    type: "equal",
                    message: "pages.transfer-funds.sender-phone-ref"
                })
            );
        })
    }),
    collectionOffice: number().positive().required(),
    amount: number()
        .required()
        .test((value, context) => {
            const minAmount = context.options.context.minAmount as number;

            return (
                value >= minAmount ||
                context.createError({
                    type: "min",
                    message: "${min}",
                    params: { min: minAmount }
                })
            );
        })
});
