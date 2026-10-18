"use client";

import type { ButtonHTMLAttributes } from "react";
import { useHeldPress } from "@/hooks/useHeldPress";
import type { SectionId } from "@/lib/content";
import { scrollToSection } from "@/lib/scroll";

type ScrollButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    target: SectionId;
};

/** Button that smooth-scrolls to a section on the page. Supports `data-pressed:` styles. */
export function ScrollButton({ target, onClick, ...props }: ScrollButtonProps) {
    const pressProps = useHeldPress();

    return (
        <button
            type="button"
            onClick={(event) => {
                onClick?.(event);
                scrollToSection(target);
            }}
            {...pressProps}
            {...props}
        />
    );
}
