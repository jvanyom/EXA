import { object, string } from "yup";

export const credentialSchema = object({
    email: string().email().required(),
    password: string().required()
});
