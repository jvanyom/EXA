import { NextApiRequest } from "next";

export const getLocales = (req: NextApiRequest) => {
    return req.headers["accept-language"].replaceAll(/;q=0\.\d/g, "").split(",");
};
