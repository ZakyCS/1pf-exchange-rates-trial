export function getDbToggle() {
    if (typeof window !== "undefined") {
        return sessionStorage.getItem("useDb") !== "false";
    }

    return true;
}