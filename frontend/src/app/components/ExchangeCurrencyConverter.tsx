"use client"

import {ExchangeRate} from "@/libs/exchangeRates";
import React, {useMemo, useState} from "react";
import {getCzechCurrency} from "@/libs/czechCurrency";
import {getData, getFlagEmoji, toCountryKey} from "@/libs/countryCodes";
import {getMenuToggleArrow} from "@/libs/menuToggle";
import ExchangeCurrencySelect from "@/app/components/ExchangeCurrencySelect";
import {replaceDotsWithCommas} from "@/libs/replaceDotsWithCommas";

export default function ExchangeCurrencyConverter({baseCurrency, rates}: { baseCurrency: ExchangeRate, rates: ExchangeRate[]}) {
    const [amountRaw, setAmountRaw] = useState("1");
    const [selectedCurrency, setSelectedCurrency] = useState("CZK");
    const [reversed, setReversed] = useState(false);
    const [useVault, setUseVault] = useState(false);
    const [vaultMenuState, setVaultMenuState] = useState(false);

    const amount = useMemo(() => {
        const parsed = parseFloat(amountRaw);
        return isNaN(parsed) ? 0 : parsed;
    }, [amountRaw]);

    const allRates = useMemo(() => [...rates, getCzechCurrency()], [rates]);

    const fromCurrency = reversed ? selectedCurrency : baseCurrency.shortName;
    const toCurrency = reversed ? baseCurrency.shortName : selectedCurrency;

    function findCurrency(shortName: string): ExchangeRate | undefined {
        return allRates.find((rate) => rate.shortName === shortName);
    }

    function getRateValue(currency: ExchangeRate, type: "buy" | "sell"): number {
        if (useVault) {
            return type === "buy" ? currency.valBuy : currency.valSell;
        } else {
            return type === "buy" ? currency.currBuy : currency.currSell;
        }
    }

    function getRate(): number {
        const from = findCurrency(fromCurrency);
        const to = findCurrency(toCurrency);

        if (!from || !to) return 0;

        const fromValue = getRateValue(from, "buy");
        const toValue = getRateValue(to, "sell");

        if (!fromValue || !toValue || from.amount === 0 || to.amount === 0) return 0;

        const rateFrom = fromValue / from.amount;
        const rateTo = toValue / to.amount;

        return rateFrom / rateTo;
    }

    const rate = getRate();
    const rawResult = amount * rate;
    const result = (!isFinite(rawResult) || isNaN(rawResult)) ? "0,000" : replaceDotsWithCommas(rawResult.toFixed(3));

    function renderCurrencyOptions() {
        return allRates
            .filter(rate => rate.shortName !== baseCurrency.shortName)
            .map(rate => {
                const countryKey = toCountryKey(rate.country);
                const countryFlag = countryKey ? getFlagEmoji(countryKey) : "🏳️";

                const czCountryName =
                    countryKey && getData(countryKey)?.cz
                        ? getData(countryKey)!.cz
                        : rate.country ?? "";

                return { rate, countryFlag, czCountryName };
            })
            .sort((a, b) => a.czCountryName.localeCompare(b.czCountryName))
            .map(({ rate, countryFlag, czCountryName }) => (
                <option key={rate.shortName} value={rate.shortName}>
                    {countryFlag} {rate.shortName} – {czCountryName}
                </option>
            ));
    }

    const getCurrencyLabel = (shortName: string) => {
        const rate = findCurrency(shortName);
        const countryKey = toCountryKey(rate?.country ?? "");
        const flag = countryKey ? getFlagEmoji(countryKey) : "🏳️";
        const name = countryKey ? getData(countryKey)?.cz : rate?.country;
        return `${flag} ${shortName} – ${name}`;
    };

    return (
        <section className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl p-6 space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Převod měn</h2>

                <div className="relative inline-block text-sm text-gray-500 dark:text-gray-400">
                    <select
                        value={useVault ? "vault" : "noVault"}
                        onChange={(e) => setUseVault(e.target.value === "vault")}
                        onFocus={() => setVaultMenuState(true)}
                        onBlur={() => setVaultMenuState(false)}
                        className="appearance-none bg-transparent border-none pr-6 cursor-pointer focus:outline-none"
                    >
                        <option value="noVault">Bezhotovostní kurz</option>
                        <option value="vault">Hotovostní kurz</option>
                    </select>

                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-1">
                        {getMenuToggleArrow(vaultMenuState)}
                    </div>
                </div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex-1 space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Za</label>
                    <div className="flex flex-col gap-2">
                        {reversed ? (
                            <ExchangeCurrencySelect
                                value={selectedCurrency}
                                onChange={setSelectedCurrency}
                                options={renderCurrencyOptions()}
                            />
                        ) : (
                            <div className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium">
                                {getCurrencyLabel(baseCurrency.shortName)}
                            </div>
                        )}

                        <input
                            type="text"
                            value={amountRaw}
                            onChange={(e) => setAmountRaw(e.target.value)}
                            className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-right"
                            inputMode="decimal"
                            maxLength={15}
                        />
                    </div>
                </div>

                <div className="mt-4 md:mt-10">
                    <button
                        onClick={() => setReversed(!reversed)}
                        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-md transition"
                        title="Prohodit měny"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4 7h16M4 7l4-4m-4 4l4 4M20 17H4M20 17l-4 4m4-4l-4-4"
                            />
                        </svg>
                    </button>
                </div>

                <div className="flex-1 space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Dostanete</label>
                    <div className="flex flex-col gap-2">
                        {!reversed ? (
                            <ExchangeCurrencySelect
                                value={selectedCurrency}
                                onChange={setSelectedCurrency}
                                options={renderCurrencyOptions()}
                            />
                        ) : (
                            <div className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium">
                                {getCurrencyLabel(baseCurrency.shortName)}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-center">
                <div className="text-lg font-semibold">
                    = {result} {toCurrency}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                    Směnný kurz: 1 {fromCurrency} = {replaceDotsWithCommas(rate.toFixed(3))} {toCurrency}
                </div>
            </div>
        </section>
    )
}