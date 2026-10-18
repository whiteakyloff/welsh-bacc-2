import { useEffect } from "react";

// How many px before a section boundary the colour starts blending.
const BLEND_DISTANCE = 24;

function blendColors(from: string, to: string, amount: number) {
    const start = from.match(/[\da-f]{2}/gi);
    const end = to.match(/[\da-f]{2}/gi);
    if (!start || !end || start.length < 3 || end.length < 3) return to;

    const channels = start.slice(0, 3).map((channel, index) => {
        const value = Math.round(
            parseInt(channel, 16) * (1 - amount) +
                parseInt(end[index], 16) * amount,
        );
        return value.toString(16).padStart(2, "0");
    });
    return `#${channels.join("")}`;
}

/** Colour of the section at viewport height `y`, blended near the next boundary. */
function colorAt(sections: HTMLElement[], y: number) {
    const index = sections.findIndex(
        (element) => element.getBoundingClientRect().bottom > y + 1,
    );
    const section = sections[index];
    const nextSection = sections[index + 1];
    const color = section?.dataset.themeColor;
    const nextColor = nextSection?.dataset.themeColor;
    if (!section || !color || !nextColor) return color;

    const distanceToBoundary = section.getBoundingClientRect().bottom - y;
    if (distanceToBoundary >= BLEND_DISTANCE) return color;

    return blendColors(
        color,
        nextColor,
        1 - Math.max(0, distanceToBoundary) / BLEND_DISTANCE,
    );
}

/**
 * Keeps the browser UI matching the `data-theme-color` of the section under it,
 * blending smoothly between sections:
 * - `<meta name="theme-color">` for Chrome/Android and Safari up to 18.
 * - The `[data-theme-edge]` strips (see ThemeColorEdges) for Safari 26+, which
 *   ignores theme-color and tints its bars from fixed elements at the screen edges.
 */
export function useThemeColorSync() {
    useEffect(() => {
        const themeColor = document.querySelector<HTMLMetaElement>(
            'meta[name="theme-color"]',
        );
        const topEdge = document.querySelector<HTMLElement>(
            '[data-theme-edge="top"]',
        );
        const bottomEdge = document.querySelector<HTMLElement>(
            '[data-theme-edge="bottom"]',
        );
        const sections = Array.from(
            document.querySelectorAll<HTMLElement>("[data-theme-color]"),
        );
        if (sections.length === 0) return;

        let frame = 0;

        const updateThemeColor = () => {
            cancelAnimationFrame(frame);
            frame = requestAnimationFrame(() => {
                const top = colorAt(sections, 0);
                const bottom = colorAt(sections, window.innerHeight - 1);

                if (top && themeColor && themeColor.content !== top) {
                    themeColor.content = top;
                }
                if (top && topEdge) topEdge.style.backgroundColor = top;
                if (bottom && bottomEdge) {
                    bottomEdge.style.backgroundColor = bottom;
                }
            });
        };

        updateThemeColor();
        window.addEventListener("scroll", updateThemeColor, { passive: true });
        window.addEventListener("resize", updateThemeColor);
        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener("scroll", updateThemeColor);
            window.removeEventListener("resize", updateThemeColor);
        };
    }, []);
}
