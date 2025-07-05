"use client"

import {ExchangeRate} from "@/libs/exchangeRates";
import {getData, getFlagEmoji, toCountryKey} from "@/libs/countryCodes";
import ExchangeCurrencyConverter from "@/app/components/ExchangeCurrencyConverter";
import {useRouter} from "next/navigation";
import {formatChangeWithSign} from "@/libs/rateMove";

export default function ExchangeRateDetail({ currency, rates }: { currency: ExchangeRate, rates: ExchangeRate[]}) {
    const router = useRouter();

    const countryKey = toCountryKey(currency.country);
    const countryFlag = countryKey ? getFlagEmoji(countryKey) : "🏳️";
    const czCountryName = countryKey ? getData(countryKey)?.cz : currency.country;

    return (
        <main className="max-w-3xl mx-auto p-6">
            <button
                onClick={() => router.push("/")}
                className="mb-6 inline-flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <svg
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                <span>Zpět</span>
            </button>

            <header className="flex items-center space-x-6 mb-8">
                <span className="text-6xl">{countryFlag}</span>
                <h1 className="text-4xl font-extrabold leading-tight">
                    <span>{currency.name}</span>
                    <span className="text-blue-600 font-semibold ml-4">({currency.shortName})</span>
                </h1>
            </header>

            <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10 text-gray-700 dark:text-gray-300">
                <div className="flex flex-col items-center space-y-4">
                    <div className="flex items-center max-w-xs w-full">
                        <span className="font-semibold w-32 text-blue-700 dark:text-blue-400">Stát:</span>
                        <span>{czCountryName}</span>
                    </div>
                    <div className="flex items-center max-w-xs w-full">
                        <span className="font-semibold w-32 text-blue-700 dark:text-blue-400">Ze dne:</span>
                        <span>{new Date(currency.validFrom).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center max-w-xs w-full">
                        <span className="font-semibold w-32 text-blue-700 dark:text-blue-400">Počet:</span>
                        <span>{currency.amount}</span>
                    </div>
                </div>

                <div className="flex flex-col items-center space-y-4">
                    <div className="flex items-center max-w-xs w-full">
                        <span className="font-semibold w-32 text-blue-700 dark:text-blue-400">ČNB střed:</span>
                        <span>{currency.cnbMid.toString().replace(".", ",")}</span>
                    </div>
                    <div className="flex items-center max-w-xs w-full">
                        <span className="font-semibold w-32 text-blue-700 dark:text-blue-400">ECB střed:</span>
                        <span>{currency.ecbMid.toString().replace(".", ",")}</span>
                    </div>
                    <div className="flex items-center max-w-xs w-full">
                        <span className="font-semibold w-32 text-blue-700 dark:text-blue-400">Změna:</span>
                        {formatChangeWithSign(currency.move, false)}
                    </div>
                </div>
            </section>

            <section className="flex flex-col sm:flex-row gap-6 mb-12">
                <div className="flex-1 text-left bg-white dark:bg-gray-900 rounded-xl p-6 border border-blue-300 dark:border-blue-700">
                    <h2 className="text-2xl font-semibold mb-5 text-blue-600 flex items-center gap-2 pl-2">Bezhotovostně</h2>
                    <ul className="space-y-3 text-gray-700 dark:text-gray-300 text-lg">
                        <li>
                            <span className="font-semibold">Nákup:</span> {currency.currBuy}
                        </li>
                        <li>
                            <span className="font-semibold">Prodej:</span> {currency.currSell}
                        </li>
                        <li>
                            <span className="font-semibold">Střed:</span> {currency.currMid}
                        </li>
                    </ul>
                </div>

                <div className="flex-1 text-left bg-white dark:bg-gray-900 rounded-xl p-6 border border-blue-300 dark:border-blue-700">
                    <h2 className="text-2xl font-semibold mb-5 text-blue-600 flex items-center gap-2 pl-2">Hotovostně</h2>
                    <ul className="space-y-3 text-gray-700 dark:text-gray-300 text-lg">
                        <li>
                            <span className="font-semibold">Nákup:</span> {currency.valBuy}
                        </li>
                        <li>
                            <span className="font-semibold">Prodej:</span> {currency.valSell}
                        </li>
                        <li>
                            <span className="font-semibold">Střed:</span> {currency.valMid}
                        </li>
                    </ul>
                </div>
            </section>

            <ExchangeCurrencyConverter
                baseCurrency={currency}
                rates={rates}
            />
        </main>
    )
}