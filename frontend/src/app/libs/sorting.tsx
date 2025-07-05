import {ExchangeRate} from "@/app/libs/exchangeRates";
import {getData, toCountryKey} from "@/app/libs/countryCodes";

export enum SortColumn {
    COUNTRY = "country",
    CNB_MID = "cnbMid",
    MOVE = "move",
}

export enum SortDirection {
    ASC = "asc",
    DESC = "desc",
}

export function toggleDirection(dir: SortDirection): SortDirection {
    return dir === SortDirection.ASC ? SortDirection.DESC : SortDirection.ASC;
}

export function getComparator(column: SortColumn, direction: SortDirection = SortDirection.ASC): (a: ExchangeRate, b: ExchangeRate) => number {
    return (a, b) => {
        const getSortingValue = (value: typeof a): string | number => {
            switch (column) {
                case SortColumn.COUNTRY: {
                    const key = toCountryKey(value.country);
                    const czName = key ? getData(key)?.cz : null;
                    return czName ?? value.country;
                }
                case SortColumn.CNB_MID:
                    return value.amount ? (value.cnbMid / value.amount) : value.cnbMid;
                case SortColumn.MOVE:
                    return value.move;
            }
        }

        const aValue = getSortingValue(a);
        const bValue = getSortingValue(b)

        if (typeof aValue === "number" && typeof bValue === "number") {
            return direction === SortDirection.ASC ? (aValue - bValue) : (bValue - aValue);
        }

        return direction === SortDirection.ASC
            ? (aValue as string).localeCompare(bValue as string)
            : (bValue as string).localeCompare(aValue as string);
    };
}

export function sortRates(rates: ExchangeRate[], column: SortColumn, direction: SortDirection): ExchangeRate[] {
    return rates.sort(getComparator(column, direction));
}

export function getSortArrow(direction: SortDirection | null) {
    const className = "inline-block w-6 h-6 ml-1";

    if (direction === SortDirection.ASC) {
        return (
            <svg className={className} viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 14l5-5 5 5H7z" />
            </svg>
        );
    }

    if (direction === SortDirection.DESC) {
        return (
            <svg className={className} viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 10l5 5 5-5H7z" />
            </svg>
        );
    }

    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M7 10l5-5 5 5H7z" />
            <path d="M7 14l5 5 5-5H7z" />
        </svg>
    );
}