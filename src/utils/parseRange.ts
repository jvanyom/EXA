import type { Range } from "@/types";

export const parseRange = (range: string): Range => {
    const splitRange = range.replaceAll(/[)(\][]/g, "").split(",");

    if (splitRange.length !== 2) throw new Error("Invalid range.");

    const [min, max] = splitRange.map(num => +num);

    return {
        min,
        max: max || Infinity
    };
};
