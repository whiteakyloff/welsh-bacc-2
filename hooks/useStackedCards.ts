import { useEffect } from "react";

// Only stack on small screens; wider layouts show the cards side by side.
const STACK_QUERY = "(max-width: 800px)";

/**
 * Drives the mobile card stack. Each `[data-stack-card]` is sticky (see CSS);
 * as the next card in the same group slides over it, this sets
 * `--stack-progress` (0 → 1) on the covered card so CSS can shrink and dim it.
 */
export function useStackedCards() {
    useEffect(() => {
        const cards = Array.from(
            document.querySelectorAll<HTMLElement>("[data-stack-card]"),
        );
        if (cards.length === 0) return;

        const stackQuery = window.matchMedia(STACK_QUERY);
        const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        );
        let frame = 0;

        const update = () => {
            frame = 0;
            const active = stackQuery.matches && !reducedMotion.matches;

            cards.forEach((card) => {
                const next = card.nextElementSibling;
                if (!active || !(next instanceof HTMLElement)) {
                    card.style.removeProperty("--stack-progress");
                    return;
                }

                const current = card.getBoundingClientRect();
                const covering = next.getBoundingClientRect();
                const progress = Math.min(
                    Math.max((current.bottom - covering.top) / current.height, 0),
                    1,
                );
                card.style.setProperty("--stack-progress", progress.toFixed(3));
            });
        };

        const schedule = () => {
            if (!frame) frame = requestAnimationFrame(update);
        };

        update();
        window.addEventListener("scroll", schedule, { passive: true });
        window.addEventListener("resize", schedule);
        stackQuery.addEventListener("change", schedule);
        reducedMotion.addEventListener("change", schedule);

        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener("scroll", schedule);
            window.removeEventListener("resize", schedule);
            stackQuery.removeEventListener("change", schedule);
            reducedMotion.removeEventListener("change", schedule);
        };
    }, []);
}
