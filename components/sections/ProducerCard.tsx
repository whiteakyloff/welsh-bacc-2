"use client";

import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import { useHeldPress } from "@/hooks/useHeldPress";
import type { Producer } from "@/lib/content";
import { underlineLink } from "@/lib/linkStyles";

export function ProducerCard({ producer }: { producer: Producer }) {
    const pressProps = useHeldPress();

    return (
        // On desktop only the "Learn more" button is interactive: the card
        // ignores the pointer, so its hover effects run only while the button is
        // hovered. On phones the button's overlay covers the whole card, so a tap
        // anywhere lifts it and opens the producer's site.
        <article
            className="group pointer-events-none relative flex h-full flex-col max-[800px]:pointer-events-auto overflow-hidden rounded-[3px] bg-paper text-ink transition-[translate,box-shadow,scale] duration-[350ms] ease-in-out hover:-translate-y-2 hover:shadow-[0_18px_30px_rgba(15,43,31,.2)] active:scale-[0.98] active:duration-100 data-pressed:-translate-y-2 data-pressed:shadow-[0_18px_30px_rgba(15,43,31,.2)]"
            {...pressProps}
        >
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
                <div className="relative flex size-[148px] items-center justify-center rounded-full bg-paper p-2.5 shadow-[6px_8px_0_rgba(17,47,34,.18)] ring-[3px] ring-white/60 transition-transform duration-[450ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-[1.06] group-hover:-rotate-[5deg] group-data-pressed:scale-[1.06] group-data-pressed:-rotate-[5deg] max-[800px]:size-[122px] max-[800px]:p-2">
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
            <div className="flex flex-1 flex-col px-[23px] pb-[26px] pt-[23px] max-[1100px]:px-[18px] max-[1100px]:pb-[23px]">
                <p className="mb-[11px] text-[10px] font-bold uppercase tracking-[.14em] text-[#9a6f4b]">
                    {producer.location}
                </p>
                <h3 className="mb-3 min-h-[2lh] font-display text-[25px] font-normal leading-[1.15] max-[800px]:min-h-0">
                    {producer.name}
                </h3>
                <p className="mb-4 text-xs leading-[1.6]">{producer.description}</p>
                <button
                    type="button"
                    onClick={() =>
                        window.open(
                            producer.link,
                            "_blank",
                            "noopener,noreferrer",
                        )
                    }
                    className="pointer-events-auto mt-auto self-start cursor-pointer border-0 bg-transparent p-0"
                >
                    <span
                        className={`${underlineLink} group-hover:[&_span]:translate-x-0.5 group-hover:[&_span]:-translate-y-0.5 group-active:[&_span]:translate-x-1 group-active:[&_span]:-translate-y-1 group-data-pressed:[&_span]:translate-x-1 group-data-pressed:[&_span]:-translate-y-1`}
                    >
                        Learn more <Icon name="arrow_outward" />
                    </span>
                    {/* Phones: stretches the button over the whole card (the button itself isn't positioned) */}
                    <span
                        aria-hidden="true"
                        className="absolute inset-0 z-20 hidden max-[800px]:block"
                    />
                </button>
            </div>
        </article>
    );
}
