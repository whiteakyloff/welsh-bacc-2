"use client";

import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import { useHeldPress } from "@/hooks/useHeldPress";
import type { Producer } from "@/lib/content";

// "Learn more" link: grey underline with a red bar that grows on card hover,
// plus a pressed state for both :active and the held touch press (data-pressed).
const learnMoreClassName = [
    "relative mt-4 inline-flex items-center gap-2 pb-[7px] text-xs font-bold tracking-[.03em] text-welsh-green transition-[scale,color] duration-150 ease-out",
    // Underline
    "after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-[#c8cfc5]",
    "before:absolute before:bottom-0 before:left-0 before:z-10 before:h-0.5 before:w-full before:origin-left before:scale-x-0 before:bg-[#d54a3d] before:transition-transform before:duration-300 before:ease-out group-hover:before:scale-x-100",
    // Arrow
    "[&_span]:inline-block [&_span]:text-[15px] [&_span]:text-[#d54a3d] [&_span]:transition-transform [&_span]:duration-300 [&_span]:ease-out group-hover:[&_span]:translate-x-0.5 group-hover:[&_span]:-translate-y-0.5",
    // Pressed
    "active:scale-[0.96] active:text-[#d54a3d] active:duration-75 active:before:h-[3px] active:before:scale-x-100 active:before:duration-75 active:[&_span]:translate-x-1 active:[&_span]:-translate-y-1 active:[&_span]:duration-75",
    "data-pressed:scale-[0.96] data-pressed:text-[#d54a3d] data-pressed:duration-75 data-pressed:before:h-[3px] data-pressed:before:scale-x-100 data-pressed:before:duration-75 data-pressed:[&_span]:translate-x-1 data-pressed:[&_span]:-translate-y-1 data-pressed:[&_span]:duration-75",
].join(" ");

export function ProducerCard({ producer }: { producer: Producer }) {
    const pressProps = useHeldPress();

    return (
        <article className="group h-full overflow-hidden rounded-[3px] bg-paper text-ink transition-[translate,box-shadow] duration-[350ms] ease-in-out hover:-translate-y-2 hover:shadow-[0_18px_30px_rgba(15,43,31,.2)]">
            <div
                className={`relative flex h-[200px] items-center justify-center overflow-hidden max-[800px]:h-[165px] ${producer.accentClassName}`}
            >
                {/* Rings echoing the hero illustration */}
                <span
                    aria-hidden="true"
                    className="absolute size-[210px] rounded-full border border-white/35 max-[800px]:size-[175px]"
                />
                <span
                    aria-hidden="true"
                    className="absolute size-[290px] rounded-full border border-white/20 max-[800px]:size-[240px]"
                />
                {/* Cream plate so every badge reads as the same kind of sticker */}
                <div className="relative flex size-[148px] items-center justify-center rounded-full bg-paper p-2.5 shadow-[6px_8px_0_rgba(17,47,34,.18)] ring-[3px] ring-white/60 transition-transform duration-[450ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-[1.06] group-hover:-rotate-[5deg] max-[800px]:size-[122px] max-[800px]:p-2">
                    <Image
                        src={producer.badge}
                        alt={`${producer.name} badge`}
                        width={128}
                        height={128}
                        className="size-full object-contain"
                    />
                </div>
                <span className="absolute left-[17px] top-[14px] bg-white/85 px-[9px] py-[6px] text-[9px] font-bold uppercase tracking-[.1em] text-ink">
                    {producer.category}
                </span>
            </div>
            <div className="px-[23px] pb-[26px] pt-[23px] max-[1100px]:px-[18px] max-[1100px]:pb-[23px]">
                <p className="mb-[11px] text-[10px] font-bold uppercase tracking-[.14em] text-[#9a6f4b]">
                    {producer.location}
                </p>
                <h3 className="mb-3 font-display text-[25px] font-normal">
                    {producer.name}
                </h3>
                <p className="text-xs leading-[1.6]">{producer.description}</p>
                <a
                    href={producer.link}
                    target="_blank"
                    rel="noreferrer"
                    className={learnMoreClassName}
                    {...pressProps}
                >
                    Learn more <Icon name="arrow_outward" />
                </a>
            </div>
        </article>
    );
}
