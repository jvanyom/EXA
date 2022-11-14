import { string } from "yup";

import { isValid, LENGTH } from "@/utils/server/hasher";

export const transferCodeSchema = string()
    .uppercase()
    .trim()
    .required()
    .length(LENGTH)
    .test((value, context) => {
        return isValid(value) || context.createError({ type: "not-exists" });
    });
