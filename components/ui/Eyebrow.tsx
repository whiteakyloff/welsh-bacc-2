import type { HTMLAttributes } from "react";

/** Small uppercase label above a section heading, e.g. "01 / The idea". */
export function Eyebrow({
    className = "",
    ...props
}: HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={`text-[10px] font-bold uppercase tracking-[.17em] text-[#f1be69] ${className}`}
            {...props}
        />
    );
}
