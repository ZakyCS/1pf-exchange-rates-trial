import {exchangeRates} from "@/libs/exchangeRates";
import ExchangeRatesList from "@/app/components/ExchangeRatesList";

export default async function Home() {
    const rates = await exchangeRates();
    return <ExchangeRatesList rates={rates} />;
}
