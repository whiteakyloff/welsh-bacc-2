"use client";

import type { HTMLAttributes } from "react";
import { useHeldPress } from "@/hooks/useHeldPress";

/** A div that keeps a pressed state after a tap; style it with `data-pressed:`. */
export function PressableDiv({
    anyPointer,
    ...props
}: HTMLAttributes<HTMLDivElement> & { anyPointer?: boolean }) {
    const pressProps = useHeldPress({ anyPointer });

    return <div {...props} {...pressProps} />;
}
