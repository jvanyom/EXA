import Hashids from "hashids";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export const LENGTH = 6;

const hashEncoder = new Hashids("zahsizfolxdgmgrkirqs", LENGTH, alphabet);

export const encode = (id: number) => hashEncoder.encode(id);

export const decode = (code: string) => {
    const decoded = hashEncoder.decode(code);

    if (!decoded.length) throw new Error("Invalid code.");

    return decoded[0];
};

export const isValid = (code: string) => hashEncoder.isValidId(code);
