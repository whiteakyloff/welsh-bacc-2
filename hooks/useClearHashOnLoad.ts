import { useEffect } from "react";

/** Drops any `#section` hash from the URL on load so the page always opens at the top. */
export function useClearHashOnLoad() {
    useEffect(() => {
        if (!window.location.hash) return;

        window.history.replaceState(
            null,
            "",
            `${window.location.pathname}${window.location.search}`,
        );
        window.scrollTo(0, 0);
    }, []);
}
