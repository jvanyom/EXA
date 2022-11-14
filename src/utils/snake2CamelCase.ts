export const snake2CamelCase = (s: string) => {
    return s
        .toLowerCase()
        .split("_")
        .map((value, i) => (i > 0 ? value[0].toUpperCase().concat(value.slice(1)) : value))
        .join("");
};
