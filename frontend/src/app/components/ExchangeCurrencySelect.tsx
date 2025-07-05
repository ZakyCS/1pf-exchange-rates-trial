import React, {useState} from "react";
import {getMenuToggleArrow} from "@/libs/menuToggle";

export default function ExchangeCurrencySelect({value, onChange, options}: { value: string, onChange: (v: string) => void, options: React.ReactNode}) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <select
                value={value}
                onChange={e => onChange(e.target.value)}
                onFocus={() => setIsOpen(true)}
                onBlur={() => setIsOpen(false)}
                className="w-full appearance-none border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-gray-800 text-base pr-8"
            >
                {options}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
                {getMenuToggleArrow(isOpen)}
            </div>
        </div>
    );
}