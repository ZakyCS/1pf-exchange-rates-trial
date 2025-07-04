import {exchangeRates} from "@/libs/exchangeRates";
import ExchangeRateDetail from "@/app/components/ExchangeRateDetail";

export default async function DetailPage(props: { params: Promise<{ shortName: string }> }) {
    const rates = await exchangeRates();
    const shortNameParam = await props.params;
    const currency = rates.find((rate) => rate.shortName === shortNameParam.shortName);
    if (!currency) {
        return <div>Currency not found</div>;
    }

    return <ExchangeRateDetail currency={currency} rates={rates} />
}