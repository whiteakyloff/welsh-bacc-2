import { useEffect } from "react";
import { revealSettings } from "@/lib/reveal";

/**
 * Marks every `[data-reveal]` element with `data-revealed="true"` once it
 * scrolls into view, which triggers the reveal transition.
 */
export function useScrollReveal() {
    useEffect(() => {
        const elements =
            document.querySelectorAll<HTMLElement>("[data-reveal]");

        const showAll = () => {
            elements.forEach((element) => {
                element.dataset.revealed = "true";
            });
        };

        if (
            window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
            !("IntersectionObserver" in window)
        ) {
            showAll();
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    const element = entry.target as HTMLElement;
                    element.dataset.revealed = "true";
                    observer.unobserve(element);
                });
            },
            {
                root: null,
                rootMargin: revealSettings.rootMargin,
                threshold: revealSettings.threshold,
            },
        );

        elements.forEach((element) => observer.observe(element));

        return () => observer.disconnect();
    }, []);
}
