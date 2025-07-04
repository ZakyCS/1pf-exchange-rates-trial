import {fetchExchangeRates} from "@/libs/fetchExchangeRates";
import ExchangeRatesList from "@/app/components/ExchangeRatesList";

export default async function Home() {
    const rates = await fetchExchangeRates();
    return <ExchangeRatesList rates={rates} />;
}
