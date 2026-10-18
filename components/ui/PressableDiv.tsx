"use client";

import type { HTMLAttributes } from "react";
import { useHeldPress } from "@/hooks/useHeldPress";

/** A div that keeps a pressed state after a tap; style it with `data-pressed:`. */
export function PressableDiv(props: HTMLAttributes<HTMLDivElement>) {
    const pressProps = useHeldPress();

    return <div {...props} {...pressProps} />;
}
