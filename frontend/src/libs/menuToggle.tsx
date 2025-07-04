export function getMenuToggleArrow(open: boolean) {
    const className = "inline-block w-4 h-4 ml-1";

    if (open) {
        return (
            <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M6 15l6-6 6 6H6z" />
            </svg>
        );
    }

    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M6 9l6 6 6-6H6z" />
        </svg>
    );
}