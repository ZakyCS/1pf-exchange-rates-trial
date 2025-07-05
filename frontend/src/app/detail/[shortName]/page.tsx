import ExchangeRatesContainer from "@/app/components/ExchangeRatesContainer";

export default async function DetailPage(props: { params: Promise<{ shortName: string }> }) {
    const shortNameParam = await props.params;
    return <ExchangeRatesContainer shortNameParam={shortNameParam.shortName} />
}