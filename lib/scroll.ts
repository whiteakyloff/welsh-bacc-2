import type { SectionId } from "./content";

// How long scrolling must be quiet before we treat the smooth scroll as done.
const SETTLE_MS = 150;
// Extra scrolls allowed when the first one stops short.
const MAX_RETRIES = 2;
// px of slack before the section counts as "not there yet".
const TOLERANCE = 4;

/**
 * Smooth-scrolls to a section. Mobile Safari sometimes ends a smooth scroll
 * early (e.g. while its toolbars resize), so once scrolling settles we check
 * where the section landed and scroll again if it fell short. Any touch or
 * wheel input from the user cancels the correction.
 */
export function scrollToSection(id: SectionId) {
    const element = document.getElementById(id);
    if (!element) return;

    let retries = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const stop = () => {
        clearTimeout(timer);
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("touchstart", stop);
        window.removeEventListener("wheel", stop);
    };

    const check = () => {
        const offset = element.getBoundingClientRect().top;
        const atBottom =
            window.innerHeight + window.scrollY >=
            document.documentElement.scrollHeight - 1;

        if (
            Math.abs(offset) <= TOLERANCE ||
            atBottom ||
            retries >= MAX_RETRIES
        ) {
            stop();
            return;
        }

        retries += 1;
        element.scrollIntoView({ behavior: "smooth" });
        onScroll();
    };

    function onScroll() {
        clearTimeout(timer);
        timer = setTimeout(check, SETTLE_MS);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("touchstart", stop, { passive: true });
    window.addEventListener("wheel", stop, { passive: true });

    element.scrollIntoView({ behavior: "smooth" });
    onScroll();
}
