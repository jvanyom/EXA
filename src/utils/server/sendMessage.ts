import type { MessageInstance } from "twilio/lib/rest/api/v2010/account/message";

import { twilioClient } from "@/lib/twilio";

type Message = {
    payeePhone: string;
    transferCode: string;
};

export const sendMessage = ({ payeePhone, transferCode }: Message): Promise<MessageInstance> => {
    return twilioClient.create({
        from: "+19403988095",
        to: payeePhone,
        body: "Tú código de referencia es: ".concat(transferCode)
    });
};
