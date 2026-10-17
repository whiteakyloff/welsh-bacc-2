"use client";

import type { ButtonHTMLAttributes } from "react";
import type { SectionId } from "@/lib/content";
import { scrollToSection } from "@/lib/scroll";

type ScrollButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    target: SectionId;
};

/** Button that smooth-scrolls to a section on the page. */
export function ScrollButton({ target, onClick, ...props }: ScrollButtonProps) {
    return (
        <button
            type="button"
            onClick={(event) => {
                onClick?.(event);
                scrollToSection(target);
            }}
            {...props}
        />
    );
}
