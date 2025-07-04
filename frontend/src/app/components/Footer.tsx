"use client"

import { MonitorIcon, MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const THEMES_OPTIONS = [
    {
        label: "Light",
        id: "light",
        icon: <SunIcon className="h-4 w-4" />,
    },
    {
        label: "Dark",
        id: "dark",
        icon: <MoonIcon className="h-4 w-4" />,
    },
    {
        label: "System",
        id: "system",
        icon: <MonitorIcon className="h-4 w-4" />,
    },
]

export function Footer() {
    return (
        <footer className="mt-24 border-t border-zinc-100 px-0 py-4 dark:border-zinc-800">
            <div className="flex items-center justify-between">
                <a href="https://github.com/ZakyCS" className="text-xs text-zinc-500" target="_blank">
                    © 2025 Vojtěch Dolenský
                </a>
                <div className="text-xs text-zinc-400">
                    <ThemeSwitch />
                </div>
            </div>
        </footer>
    )
}

function ThemeSwitch() {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme, resolvedTheme } = useTheme()

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    return (
        <div className="flex space-x-2">
            {THEMES_OPTIONS.map(({ label, id, icon }) => (
                <button
                    key={id}
                    type="button"
                    onClick={() => setTheme(id)}
                    className={`p-2 rounded-md transition-colors ${
                        theme === id
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
                    }`}
                    aria-label={`Switch to ${label} theme`}
                    title={`${label}${theme === 'system' ? ` (${resolvedTheme})` : ''}`}
                >
                    {icon}
                </button>
            ))}
        </div>
    );
}