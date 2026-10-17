import type { CSSProperties } from "react";

// Scroll reveal settings — tweak these to change how sections appear.
export const revealSettings = {
    // Positive bottom margin starts the reveal before the element enters the screen.
    rootMargin: "0px 0px 5% 0px",
    threshold: 0,
    duration: 500, // ms
    distance: 16, // px the element slides up from
    stagger: 50, // ms between items in a list (cards, reasons)
    easing: "cubic-bezier(0.2, 0.7, 0.2, 1)",
    badgeDelay: 350, // ms after the hero art starts before the first label pops in
    badgeStagger: 200, // ms between the first and second label
};

/** CSS variables consumed by the reveal classes; set once on the page root. */
export const revealVars = {
    "--reveal-duration": `${revealSettings.duration}ms`,
    "--reveal-distance": `${revealSettings.distance}px`,
    "--reveal-ease": revealSettings.easing,
    "--reveal-delay": "0ms",
    "--badge-delay": `${revealSettings.badgeDelay}ms`,
    "--badge-stagger": `${revealSettings.badgeStagger}ms`,
} as CSSProperties;

/** Staggered delay for the nth item in a list. */
export const revealDelay = (index: number) =>
    ({
        "--reveal-delay": `${(index + 1) * revealSettings.stagger}ms`,
    }) as CSSProperties;

/**
 * Hidden-until-revealed styles, without a transition property so callers can
 * add their own. Pair with the `data-reveal` attribute (see useScrollReveal).
 */
export const revealBase =
    "opacity-0 translate-y-(--reveal-distance) data-[revealed=true]:opacity-100 data-[revealed=true]:translate-y-0 " +
    "duration-(--reveal-duration) ease-(--reveal-ease) delay-(--reveal-delay) " +
    "motion-reduce:opacity-100 motion-reduce:translate-y-0";

export const reveal = `${revealBase} transition-[opacity,translate]`;
