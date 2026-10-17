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

/**
 * Keeps `<meta name="theme-color">` matching the `data-theme-color` of the
 * section at the top of the viewport, blending smoothly between sections.
 */
export function useThemeColorSync() {
    useEffect(() => {
        const themeColor = document.querySelector<HTMLMetaElement>(
            'meta[name="theme-color"]',
        );
        const sections = Array.from(
            document.querySelectorAll<HTMLElement>("[data-theme-color]"),
        );
        if (!themeColor || sections.length === 0) return;

        let frame = 0;

        const updateThemeColor = () => {
            cancelAnimationFrame(frame);
            frame = requestAnimationFrame(() => {
                const boundaryIndex = sections.findIndex(
                    (element) => element.getBoundingClientRect().bottom > 1,
                );
                const section = sections[boundaryIndex];
                const nextSection = sections[boundaryIndex + 1];
                let color = section?.dataset.themeColor;

                if (section && nextSection && color) {
                    const nextColor = nextSection.dataset.themeColor;
                    const distanceToBoundary =
                        section.getBoundingClientRect().bottom;

                    if (nextColor && distanceToBoundary < BLEND_DISTANCE) {
                        color = blendColors(
                            color,
                            nextColor,
                            1 - Math.max(0, distanceToBoundary) / BLEND_DISTANCE,
                        );
                    }
                }

                if (color && themeColor.content !== color) {
                    themeColor.content = color;
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
