import type { PropsWithClassName, Transfer } from "@/types";

import { Controller, useFormState } from "react-hook-form";
import clsx from "clsx";

import { Box, FormError } from "@/components";

import { OfficeSelector } from "./components";

export const Offices = ({ className }: PropsWithClassName) => {
    const { errors } = useFormState<Transfer>({ name: "collectionOffice" });

    return (
        <Box className={clsx("min-h-[350px] xl:min-h-0", className)}>
            <Controller
                name="collectionOffice"
                /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
                render={({ field: { ref, ...field } }) => <OfficeSelector {...field} />}
            />
            <FormError
                error={errors.collectionOffice && { path: "pages.transfer-funds.errors", type: "office.unselected" }}
                field="common.terms.office"
                context="female"
                className="mt-auto mx-3"
            />
        </Box>
    );
};
