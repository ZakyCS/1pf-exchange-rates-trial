export interface ExchangeRate {
    shortName: string;
    name: string;
    country: string;
    validFrom: string;
    move: number;
    amount: number;
    valBuy: number;
    valSell: number;
    valMid: number;
    currBuy: number;
    currSell: number;
    currMid: number;
    cnbMid: number;
    ecbMid: number;
}

export async function fetchExchangeRates(): Promise<ExchangeRate[]> {
    const apiKey = process.env.WEB_API_KEY;
    if (!apiKey) {
        throw new Error("Missing API key in environment variables.");
    }

    const apiResponse = await fetch(
        `https://webapi.developers.erstegroup.com/api/csas/public/sandbox/v2/rates/exchangerates?web-api-key=${apiKey}`,
        {
            next: { revalidate: 3600 },
        }
    );

    if (!apiResponse.ok) {
        throw new Error("Failed to fetch exchange rates.");
    }

    const responseJson = await apiResponse.json();
    return responseJson as ExchangeRate[];
}