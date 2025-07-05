"use client"

import {getDbToggle} from "@/app/libs/getDbToggle";

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

export async function exchangeRates(): Promise<ExchangeRate[]> {
    const useDb = getDbToggle();
    const apiResponse = await fetch(`http://localhost:8080/api/exchange-rates?usedb=${useDb}`);

    if (!apiResponse.ok) {
        throw new Error("Failed to fetch exchange rates.");
    }

    const responseJson = await apiResponse.json();
    return responseJson as ExchangeRate[];
}