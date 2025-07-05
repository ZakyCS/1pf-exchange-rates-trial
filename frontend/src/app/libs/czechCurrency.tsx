import {ExchangeRate} from "@/app/libs/exchangeRates";

export function getCzechCurrency(): ExchangeRate {
    return {
        shortName: "CZK",
        name: "Koruna",
        country: "Czechia",
        move: 0,
        amount: 1,
        valBuy: 1,
        valSell: 1,
        valMid: 1,
        currBuy: 1,
        currSell: 1,
        currMid: 1,
        validFrom: new Date().toISOString(),
        cnbMid: 1,
        ecbMid: 1,
    };
}