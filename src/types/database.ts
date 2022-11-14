export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
    public: {
        Tables: {
            countries: {
                Row: {
                    id: number;
                    code: string;
                    flag: string;
                    prefix: string;
                    names: Json;
                };
                Insert: {
                    id?: number;
                    code: string;
                    flag: string;
                    prefix: string;
                    names?: Json;
                };
                Update: {
                    id?: number;
                    code?: string;
                    flag?: string;
                    prefix?: string;
                    names?: Json;
                };
            };
            customers: {
                Row: {
                    id: string;
                    name: string;
                    surname: string;
                    phone: string;
                };
                Insert: {
                    id?: string;
                    name: string;
                    surname: string;
                    phone: string;
                };
                Update: {
                    id?: string;
                    name?: string;
                    surname?: string;
                    phone?: string;
                };
            };
            offices: {
                Row: {
                    id: number;
                    available_cash: number;
                    names: Json;
                    country_id: number;
                };
                Insert: {
                    id?: number;
                    available_cash: number;
                    names: Json;
                    country_id: number;
                };
                Update: {
                    id?: number;
                    available_cash?: number;
                    names?: Json;
                    country_id?: number;
                };
            };
            profiles: {
                Row: {
                    id: string;
                    office_id: number;
                };
                Insert: {
                    id: string;
                    office_id: number;
                };
                Update: {
                    id?: string;
                    office_id?: number;
                };
            };
            rates: {
                Row: {
                    id: number;
                    national_commission: number;
                    foreign_commission: number;
                    transfer_amount: unknown;
                };
                Insert: {
                    id?: number;
                    national_commission: number;
                    foreign_commission: number;
                    transfer_amount: unknown;
                };
                Update: {
                    id?: number;
                    national_commission?: number;
                    foreign_commission?: number;
                    transfer_amount?: unknown;
                };
            };
            settings: {
                Row: {
                    key: string;
                    value: string | null;
                };
                Insert: {
                    key: string;
                    value?: string | null;
                };
                Update: {
                    key?: string;
                    value?: string | null;
                };
            };
            transfers: {
                Row: {
                    id: number;
                    sender_id: string;
                    payee_id: string;
                    issuing_office_id: number;
                    collection_office_id: number;
                    created_at: string;
                    amount: number;
                    status: string;
                    commission_amount: number;
                };
                Insert: {
                    id?: number;
                    sender_id: string;
                    payee_id: string;
                    issuing_office_id: number;
                    collection_office_id: number;
                    created_at?: string;
                    amount: number;
                    status?: string;
                    commission_amount: number;
                };
                Update: {
                    id?: number;
                    sender_id?: string;
                    payee_id?: string;
                    issuing_office_id?: number;
                    collection_office_id?: number;
                    created_at?: string;
                    amount?: number;
                    status?: string;
                    commission_amount?: number;
                };
            };
        };
        Views: {
            [_ in never]: never;
        };
        Functions: {
            commission: {
                Args: { collection_office: number; amount: number };
                Returns: number;
            };
            compensation_commission: {
                Args: {
                    sender_phone: string;
                    collection_office: number;
                    amount: number;
                };
                Returns: Json;
            };
            compensation_commission2: {
                Args: {
                    sender_phone: string;
                    collection_office: number;
                    amount: number;
                };
                Returns: unknown;
            };
            max_transfer_amount: {
                Args: { office: number };
                Returns: number;
            };
            min_transfer_amount: {
                Args: Record<PropertyKey, never>;
                Returns: number;
            };
            same_country: {
                Args: { collection_office: number };
                Returns: boolean;
            };
            transfer: {
                Args: {
                    sender_name: string;
                    sender_surname: string;
                    sender_phone: string;
                    payee_name: string;
                    payee_surname: string;
                    payee_phone: string;
                    collection_office: number;
                    amount: number;
                };
                Returns: Json;
            };
            withdraw: {
                Args: { code: string };
                Returns: undefined;
            };
        };
        Enums: {
            [_ in never]: never;
        };
    };
}
