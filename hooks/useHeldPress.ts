import { useEffect, useRef, useState } from "react";

const HOLD_MS = 2000;

/**
 * On touch devices `:active` ends on release, so this keeps a "pressed" flag
 * on for a while longer. Spread `pressProps` onto the element and style it
 * with `data-pressed:`.
 */
export function useHeldPress() {
    const [pressed, setPressed] = useState(false);
    const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

    useEffect(() => () => clearTimeout(timer.current), []);

    const pressProps = {
        "data-pressed": pressed || undefined,
        onPointerDown: (event: React.PointerEvent) => {
            if (event.pointerType !== "touch") return;
            clearTimeout(timer.current);
            setPressed(true);
            timer.current = setTimeout(() => setPressed(false), HOLD_MS);
        },
    };

    return pressProps;
}
