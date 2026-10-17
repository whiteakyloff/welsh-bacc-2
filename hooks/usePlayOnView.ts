import { useEffect } from "react";

// How much of the element must be on screen before its animations start.
const PLAY_THRESHOLD = 0.25;

/**
 * Marks every `[data-play-on-view]` element with `data-in-view="true"` once
 * enough of it is on screen. CSS keeps its animations paused until then.
 */
export function usePlayOnView() {
    useEffect(() => {
        const elements = document.querySelectorAll<HTMLElement>(
            "[data-play-on-view]",
        );

        const play = (element: HTMLElement) => {
            element.dataset.inView = "true";
        };

        if (
            window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
            !("IntersectionObserver" in window)
        ) {
            elements.forEach(play);
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    play(entry.target as HTMLElement);
                    observer.unobserve(entry.target);
                });
            },
            { threshold: PLAY_THRESHOLD },
        );

        elements.forEach((element) => observer.observe(element));

        return () => observer.disconnect();
    }, []);
}
