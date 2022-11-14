import type { User } from "@supabase/auth-helpers-nextjs";
import type { CountryCode } from "libphonenumber-js";
import type { FieldError } from "react-hook-form";
import type { ComponentProps, FC } from "react";
import type { Path } from "react-hook-form";
import type { InferType } from "yup";

import type { transferSchema, credentialSchema } from "@/schemas";

import translations from "../../public/locales/es/common.json";

export * from "./database";

export type Language = "es" | "fr" | "en";

export type TIcon = FC<ComponentProps<"svg">>;

export type PropsWithUser<T = unknown> = { user: User } & T;

export type PropsWithClassName<T = unknown> = { className?: string } & T;

export type Transfer = InferType<typeof transferSchema>;

export type Credential = InferType<typeof credentialSchema>;

export type CustomerType = Exclude<keyof Transfer, "amount" | "collectionOffice">;

export type Gender = "male" | "female";

export type ControllerInputProps<C extends string | number = string, T extends string | number = C> = {
    name: string;
    value: T;
    onChange: (value: C) => void;
    onBlur: () => void;
};

export type InputStatus = "empty" | "typing" | "error" | "success";

export type TFormError = Pick<FieldError, "type" | "message"> & {
    path?: string;
    value?: string | number;
};

export type ErrorType<T = ""> = keyof typeof translations.common.errors | T;

export type ValidationError<E = "", T = Transfer> = {
    type: ErrorType<E>;
    path?: Path<T>;
    value?: string | number;
    message?: string;
};

export type ID = {
    id: number;
};

export type Range = {
    min: number;
    max: number;
};

export type CompensationCommission = {
    compensation: number;
    commission: number;
    percentage: number;
};

export type Country = {
    id: number;
    code: Lowercase<CountryCode>;
    prefix: string;
    flag: string;
    names: Record<Language, string>;
};

export type TransferResponse = {
    amount: number;
    createdAt: string;
    payee: {
        name: string;
        surname: string;
        phone: string;
    };
    issuingOffice: {
        names: Record<Language, string>;
        country: Pick<Country, "names" | "flag">;
    };
};

export type Settings = {
    currency: string;
    maxTransferPercentage: number;
};

export type Office = {
    id: number;
    names: Record<Language, string>;
    country: Omit<Country, "prefix">;
    availableCash: number;
};
