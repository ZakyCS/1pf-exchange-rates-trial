export function getChangeColor(change: number) {
    if (change > 0) return "text-green-600";
    if (change < 0) return "text-red-600";
    return "text-gray-500";
}

export function getChangeArrow(change: number, className = "w-6 h-6 inline-block") {
    if (change > 0) {
        return (
            <svg
                className={className + " text-green-500"}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
            </svg>
        );
    }
    if (change < 0) {
        return (
            <svg
                className={className + " text-red-500"}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
        );
    }
    return (
        <svg
            className={className + " text-gray-500"}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
        </svg>
    );
}

export function formatChangeWithSign(change: number) {
    const sign = change > 0 ? "+" : change < 0 ? "−" : "\u00A0";
    const colorClass = change > 0 ? "text-green-600" : change < 0 ? "text-red-600" : "text-gray-500";

    return (
        <div className={`inline-flex font-semibold text-lg ${colorClass} select-none`}>
            <span className="inline-block w-4 font-mono">{sign}</span>
            <span>{Math.abs(change).toFixed(2)} %</span>
        </div>
    );
}