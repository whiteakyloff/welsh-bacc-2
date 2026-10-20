// Underlined text link, used by "Learn more". Put it
// inside a `group`: the grey underline gets a red bar that grows on group
// hover, and both :active and the held touch press (data-pressed, see
// useHeldPress) show a pressed state. Arrow motion is left to each caller.
export const underlineLink = [
    "relative inline-flex items-center gap-2 pb-[7px] text-xs font-bold tracking-[.03em] text-welsh-green transition-[scale,color] duration-150 ease-out",
    // Underline
    "after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-[#c8cfc5]",
    "before:absolute before:bottom-0 before:left-0 before:z-10 before:h-0.5 before:w-full before:origin-left before:scale-x-0 before:bg-[#d54a3d] before:transition-transform before:duration-300 before:ease-out group-hover:before:scale-x-100",
    // Arrow
    "[&_span]:inline-block [&_span]:text-[15px] [&_span]:text-[#d54a3d] [&_span]:transition-transform [&_span]:duration-300 [&_span]:ease-out",
    // Pressed
    "group-active:scale-[0.96] group-active:text-[#d54a3d] group-active:duration-75 group-active:before:h-[3px] group-active:before:scale-x-100 group-active:before:duration-75 group-active:[&_span]:duration-75",
    "group-data-pressed:scale-[0.96] group-data-pressed:text-[#d54a3d] group-data-pressed:duration-75 group-data-pressed:before:h-[3px] group-data-pressed:before:scale-x-100 group-data-pressed:before:duration-75 group-data-pressed:[&_span]:duration-75",
].join(" ");
