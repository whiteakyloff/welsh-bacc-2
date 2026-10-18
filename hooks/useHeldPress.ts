import { useEffect, useRef, useState } from "react";

export const HOLD_MS = 2000;

// Only one element looks pressed at a time: a new press releases the last one.
let releaseActive: ((interrupted: boolean) => void) | undefined;

type HeldPressOptions = {
    /** Also hold the press for mouse/pen, not just touch. */
    anyPointer?: boolean;
    /** Called when the press ends early: another press, or a scroll. */
    onInterrupt?: () => void;
};

/**
 * On touch devices `:active` ends on release, so this keeps a "pressed" flag
 * on for a while longer. Spread `pressProps` onto the element and style it
 * with `data-pressed:`.
 */
export function useHeldPress({
    anyPointer,
    onInterrupt,
}: HeldPressOptions = {}) {
    const [pressed, setPressed] = useState(false);
    const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
    const interruptRef = useRef(onInterrupt);

    useEffect(() => {
        interruptRef.current = onInterrupt;
    });

    // Stable across renders so it can be compared with releaseActive.
    const [release] = useState(() => {
        const releaseThis = (interrupted: boolean) => {
            clearTimeout(timer.current);
            setPressed(false);
            if (releaseActive === releaseThis) releaseActive = undefined;
            if (interrupted) interruptRef.current?.();
        };
        return releaseThis;
    });

    useEffect(
        () => () => {
            clearTimeout(timer.current);
            if (releaseActive === release) releaseActive = undefined;
        },
        [release],
    );

    const pressProps = {
        "data-pressed": pressed || undefined,
        onPointerDown: (event: React.PointerEvent) => {
            if (!anyPointer && event.pointerType !== "touch") return;
            if (releaseActive && releaseActive !== release) releaseActive(true);
            releaseActive = release;
            clearTimeout(timer.current);
            setPressed(true);
            timer.current = setTimeout(() => release(false), HOLD_MS);
        },
        // The browser cancels the pointer when the touch turns into a scroll,
        // so swiping past an element doesn't leave it looking pressed.
        onPointerCancel: () => release(true),
    };

    return pressProps;
}
