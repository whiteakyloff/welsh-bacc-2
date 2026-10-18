import { sectionColors } from "@/lib/theme";

const edgeClassName =
    "pointer-events-none fixed inset-x-0 z-[100] h-1";

/**
 * Thin fixed strips at the top and bottom of the screen, painted the colour of
 * the section beneath them by useThemeColorSync. Safari 26+ tints its toolbars
 * from fixed elements at the screen edges, so these steer that tint.
 */
export function ThemeColorEdges() {
    return (
        <>
            <div
                aria-hidden="true"
                data-theme-edge="top"
                className={`${edgeClassName} top-0`}
                style={{ backgroundColor: sectionColors.deepGreen }}
            />
            <div
                aria-hidden="true"
                data-theme-edge="bottom"
                className={`${edgeClassName} bottom-0`}
                style={{ backgroundColor: sectionColors.deepGreen }}
            />
        </>
    );
}
