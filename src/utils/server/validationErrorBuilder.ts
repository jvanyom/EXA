import type { NextApiResponse } from "next";
import type { Path } from "react-hook-form";

import type { ValidationError, ErrorType } from "@/types";

import { constants } from "http2";

export const validationErrorBuilder =
    <E, T>(res: NextApiResponse<ValidationError<E, T>>) =>
    (path: Path<T>, type: ErrorType<E>, value?: string | number) => {
        return res.status(constants.HTTP_STATUS_UNPROCESSABLE_ENTITY).json({ path, type, value });
    };
