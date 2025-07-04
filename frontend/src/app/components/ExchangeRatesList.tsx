"use client"

import {useMemo, useState} from "react";
import {ExchangeRate} from "@/libs/exchangeRates";
import {getData, getFlagEmoji, toCountryKey} from "@/libs/countryCodes";
import {formatChangeWithSign, getChangeArrow, getChangeColor} from "@/libs/rateMove";
import {getSortArrow, SortColumn, SortDirection, sortRates, toggleDirection} from "@/libs/sorting";
import {useRouter} from "next/navigation";

export default function ExchangeRatesList({rates}: { rates: ExchangeRate[] }) {
    const router = useRouter();

    const [query, setQuery] = useState("");
    const [sortColumn, setSortColumn] = useState<SortColumn>(SortColumn.COUNTRY);
    const [sortDirection, setSortDirection] = useState<SortDirection>(SortDirection.ASC);

    function handleSort(column: SortColumn) {
        if (sortColumn === column) {
            setSortDirection(toggleDirection(sortDirection));
        } else {
            setSortColumn(column);
            setSortDirection(SortDirection.ASC);
        }
    }

    const filtered: ExchangeRate[] = useMemo(() => {
        const lower = query.toLowerCase();

        let result = rates.filter((rate) => {
            const countryKey = toCountryKey(rate.country);
            const czName = countryKey ? getData(countryKey)?.cz.toLowerCase() : null;

            return (
                rate.country.toLowerCase().includes(lower) ||
                rate.name.toLowerCase().includes(lower) ||
                rate.shortName.toLowerCase().includes(lower) ||
                (czName ? czName.includes(lower) : false)
            );
        });

        return sortRates(result, sortColumn, sortDirection)
    }, [query, sortColumn, sortDirection]);

    return (
        <main className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-semibold mb-6 text-center">Kurzovní lístek</h1>

            <input
                type="text"
                placeholder="Vyhledávat podle názvu nebo měny"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="w-full border border-gray-300 rounded-2xl px-4 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Search exchange rates"
                autoComplete="off"
            />

            <div className="rounded-xl relative border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900">
                <table className="w-full table-fixed border-separate border-spacing-0 rounded-xl">
                    <thead className="bg-gray-300 dark:bg-gray-800 top-0 z-10">
                    <tr>
                        <th className="table-cell-border rounded-tl-xl text-left">
                            <span className="pl-3">Měna</span>
                        </th>
                        <th onClick={() => handleSort(SortColumn.COUNTRY)} className="table-cell-border text-left">
                            <div className="pl-2 flex items-center">
                                <span>Stát</span>
                                {getSortArrow(sortColumn === SortColumn.COUNTRY ? sortDirection : null)}
                            </div>
                        </th>
                        <th onClick={() => handleSort(SortColumn.CNB_MID)} className="table-cell-border text-right cursor-pointer select-none">
                            <div className="pr-2 flex items-center justify-end">
                                <span>ČNB Střed</span>
                                {getSortArrow(sortColumn === SortColumn.CNB_MID ? sortDirection : null)}
                            </div>
                        </th>
                        <th onClick={() => handleSort(SortColumn.MOVE)} className="table-cell-border text-right rounded-tr-xl">
                            <div className="pr-2 flex items-center justify-end">
                                <span>Změna</span>
                                {getSortArrow(sortColumn === SortColumn.MOVE ? sortDirection : null)}
                            </div>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {filtered.length === 0 && (
                        <tr>
                            <td colSpan={4} className="text-center text-gray-500 py-6">
                                Nebyla nalezena žádná odpovídající měna.
                            </td>
                        </tr>
                    )}
                    {filtered.map((rate, index) => {
                        const isLast = index === filtered.length -1;

                        const countryKey = toCountryKey(rate.country);
                        const countryFlag = countryKey ? getFlagEmoji(countryKey) : "🏳️";
                        const czCountryName = countryKey ? getData(countryKey)?.cz : rate.country;

                        const cnbMid = Number(rate.cnbMid / rate.amount).toFixed(3);
                        const changeNum = Number(rate.move);
                        return (
                            <tr
                                key={rate.shortName}
                                className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                                onClick={() => router.push(`/detail/${rate.shortName}`)}
                            >
                                <td className={`table-cell-border text-2xl ${isLast ? "rounded-bl-xl" : ""}`}>
                                    <div className="flex items-center">
                                        <span className="mr-2">{countryFlag}</span>
                                        <span className="text-lg">{rate.shortName}</span>
                                    </div>
                                </td>
                                <td className="table-cell-border font-medium">{czCountryName}</td>
                                <td className="table-cell-border text-right">{Number(cnbMid).toLocaleString("cs-CZ")} Kč</td>
                                <td className={`table-cell-border text-right ${getChangeColor(changeNum)} font-semibold ${isLast ? "rounded-br-xl" : ""}`}>
                                    <span className="w-8 h-8 mr-2">{getChangeArrow(changeNum)}</span>
                                    {formatChangeWithSign(changeNum, true)}
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        </main>
    )
}