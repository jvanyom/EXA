import type { Fetcher } from "swr";

export const apiFetcher: Fetcher<unknown, string> = async (url, data?: Record<string, unknown>) => {
    const response = await fetch(url, {
        ...(data && { body: JSON.stringify(data) }),
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (!response.ok) throw new Error(response.statusText);

    return response.json();
};
