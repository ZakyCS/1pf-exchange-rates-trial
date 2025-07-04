const CountryCode = {
    AUSTRALIA: { code: "AU", cz: "Austrálie" },
    SOUTH_AFRICA: { code: "ZA", cz: "Jihoafrická republika" },
    CANADA: { code: "CA", cz: "Kanada" },
    SWITZERLAND: { code: "CH", cz: "Švýcarsko" },
    DENMARK: { code: "DK", cz: "Dánsko" },
    EU: { code: "EU", cz: "Evropská unie" },
    GREAT_BRITAIN: { code: "GB", cz: "Velká Británie" },
    HONG_KONG: { code: "HK", cz: "Hongkong" },
    CROATIA: { code: "HR", cz: "Chorvatsko" },
    HUNGARY: { code: "HU", cz: "Maďarsko" },
    JAPAN: { code: "JP", cz: "Japonsko" },
    NORWAY: { code: "NO", cz: "Norsko" },
    NEW_ZEALAND: { code: "NZ", cz: "Nový Zéland" },
    POLAND: { code: "PL", cz: "Polsko" },
    ROMANIA: { code: "RO", cz: "Rumunsko" },
    SWEDEN: { code: "SE", cz: "Švédsko" },
    TUNISIA: { code: "TN", cz: "Tunisko" },
    TURKEY: { code: "TR", cz: "Turecko" },
    USA: { code: "US", cz: "Spojené státy" },
    BULGARIA: { code: "BG", cz: "Bulharsko" },
    CZECHIA: { code: "CZ", cz: "Česko" }
};

type CountryKey = keyof typeof CountryCode;
type CountryData = (typeof CountryCode)[CountryKey];

export function toCountryKey(country: string): CountryKey | null {
    const key = country.trim().toUpperCase().replaceAll(" ", "_") as CountryKey;
    return key in CountryCode ? key : null;
}

export function getData(countryKey: CountryKey): CountryData | null {
    return CountryCode[countryKey];
}

export function getFlagEmoji(countyKey: CountryKey): string | undefined {
    return getData(countyKey)?.code
        .split("")
        .map((char) => String.fromCodePoint(127397 + char.charCodeAt(0)))
        .join("");
}