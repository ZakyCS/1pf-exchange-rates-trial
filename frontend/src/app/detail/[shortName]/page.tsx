"use client";

import {fetchExchangeRates} from "@/libs/fetchExchangeRates";

export default async function DetailPage(props: { params: Promise<{ shortName: string }> }) {
    const shortNameFuture = await props.params;
    const rates = await fetchExchangeRates();

    const currency = rates.find(currency => currency.shortName === shortNameFuture.shortName);
    if (!currency) {
        return <div>Currency {shortNameFuture.shortName} not found</div>;
    }

    return (
        <div>
            <h1>
                {currency.name} ({currency.shortName})
            </h1>
            <p>Country: {currency.country}</p>
            <p>Valid From: {new Date(currency.validFrom).toLocaleDateString()}</p>
            <p>Amount: {currency.amount}</p>
            <p>Move: {currency.move}</p>
            <p>CNB Mid: {currency.cnbMid}</p>
            <p>ECB Mid: {currency.ecbMid}</p>
            <h2>Vault</h2>
            <ul>
                <li>Buy: {currency.valBuy}</li>
                <li>Sell: {currency.valSell}</li>
                <li>Mid: {currency.valMid}</li>
            </ul>
            <h2>Cashless</h2>
            <ul>
                <li>Buy: {currency.currBuy}</li>
                <li>Sell: {currency.currSell}</li>
                <li>Mid: {currency.currMid}</li>
            </ul>
        </div>
    );
}