"use client"

import {ExchangeRate, exchangeRates} from "@/app/libs/exchangeRates";
import ExchangeRatesList from "@/app/components/ExchangeRatesList";
import ExchangeRateDetail from "@/app/components/ExchangeRateDetail";
import {useEffect, useState} from "react";

export default function ExchangeRatesContainer({ shortNameParam }: { shortNameParam?: String }) {
    const [rates, setRates] = useState<ExchangeRate[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        exchangeRates()
            .then((data) => {
                setRates(data);
                setLoading(false);
            })
            .catch(() => {
                setError("Failed to fetch exchange rates.");
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading exchange rates...</div>;
    if (error) return <div>{error}</div>;
    if (!rates) return null;

    if (shortNameParam) {
        const currency = rates.find(rate => rate.shortName === shortNameParam);
        if (!currency) return <div>Currency not found</div>;

        return (<ExchangeRateDetail currency={currency} rates={rates} />);
    }

    return <ExchangeRatesList rates={rates} />;
}