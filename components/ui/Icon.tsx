// Material Symbols Outlined paths (viewBox 0 -960 960 960), inlined so icons
// paint with the HTML instead of waiting on a multi-megabyte icon font.
const paths = {
    arrow_downward:
        "M440-800v487L216-537l-56 57 320 320 320-320-56-57-224 224v-487h-80Z",
    arrow_forward:
        "M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z",
    arrow_outward:
        "m256-240-56-56 384-384H240v-80h480v480h-80v-344L256-240Z",
    asterisk:
        "M440-120v-264L254-197l-57-57 187-186H120v-80h264L197-706l57-57 186 187v-264h80v264l186-187 57 57-187 186h264v80H576l187 186-57 57-186-187v264h-80Z",
    star_shine:
        "M852-212 732-332l56-56 120 120-56 56ZM708-692l-56-56 120-120 56 56-120 120Zm-456 0L132-812l56-56 120 120-56 56ZM108-212l-56-56 120-120 56 56-120 120Zm246-75 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-361Z",
};

export type IconName = keyof typeof paths;

type IconProps = {
    /** Material Symbols icon name, e.g. "arrow_forward". */
    name: IconName;
    className?: string;
};

export function Icon({ name, className = "" }: IconProps) {
    return (
        <span className={`icon ${className}`} aria-hidden="true">
            <svg viewBox="0 -960 960 960" fill="currentColor">
                <path d={paths[name]} />
            </svg>
        </span>
    );
}
