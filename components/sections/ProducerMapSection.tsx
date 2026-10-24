"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import {
    mapCategoryColors,
    mapProducers,
    mapTowns,
    type MapCategory,
    type MapProducer,
} from "@/lib/content";
import { underlineLink } from "@/lib/linkStyles";
import { reveal } from "@/lib/reveal";
import { sectionColors } from "@/lib/theme";
import { MAP_HEIGHT, MAP_WIDTH, mapPosition, walesPath } from "@/lib/walesMap";

// Matches the breakpoint where the card drops below the map.
const STACKED_QUERY = "(max-width: 900px)";

// Labels around the coast, placed in open water (or over the border).
const seaLabels = [
    { name: "Irish Sea", lat: 53.05, lng: -5.05 },
    { name: "Cardigan Bay", lat: 52.45, lng: -4.75 },
    { name: "Bristol Channel", lat: 51.4, lng: -3.85 },
    { name: "England", lat: 52.6, lng: -2.78 },
];

const townLabelPlacement = {
    right: "-translate-x-[3px] -translate-y-1/2",
    left: "translate-x-[calc(-100%+3px)] -translate-y-1/2 flex-row-reverse",
};

const categories = Object.keys(mapCategoryColors) as MapCategory[];

const pad = (n: number) => String(n).padStart(2, "0");

/** "Aber Falls Distillery" → "AF": stands in for a logo we don't have yet. */
const initials = (name: string) =>
    name
        .split(" ")
        .slice(0, 2)
        .map((word) => word[0])
        .join("");

export function ProducerMapSection() {
    const [selected, setSelected] = useState(0);
    const producer = mapProducers[selected];
    const panelRef = useRef<HTMLDivElement>(null);

    // When the card sits below the map (phones), bring it into view after a
    // pin is tapped so the producer's details aren't left off-screen.
    const selectFromMap = (index: number) => {
        setSelected(index);
        if (!window.matchMedia(STACKED_QUERY).matches) return;
        const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)")
            .matches;
        panelRef.current?.scrollIntoView({
            behavior: smooth ? "smooth" : "auto",
            block: "nearest",
        });
    };
    const step = (by: number) =>
        setSelected(
            (index) => (index + by + mapProducers.length) % mapProducers.length,
        );

    return (
        <section
            data-theme-color={sectionColors.welshGreen}
            className="w-full bg-welsh-green shadow-[0_-2px_0_var(--color-welsh-green)] text-white px-[9vw] py-[100px] max-[1100px]:px-[7vw] max-[800px]:py-[70px]"
            id="discover"
        >
            <div data-reveal className={`mx-auto max-w-[1260px] ${reveal}`}>
                <Eyebrow>02 / Meet the makers</Eyebrow>
                <div className="mt-5 flex items-end justify-between gap-10 max-[800px]:block">
                    <h2 className="max-w-[650px] font-display text-[clamp(42px,5vw,68px)] font-normal leading-[.95] tracking-[-.05em] [&_em]:text-[#e45144]">
                        From Môn
                        <br />
                        <em>to Mynwy.</em>
                    </h2>
                    <p className="w-[315px] shrink-0 text-[15px] leading-[1.75] text-[#c7d2c7] max-[800px]:mt-[25px] max-[800px]:w-auto">
                        Fifteen Welsh producers, from sea salt on Anglesey to
                        wine in Monmouthshire. Tap a pin to meet the makers near
                        you.
                    </p>
                </div>
            </div>

            <div className="mx-auto mt-[60px] grid max-w-[1260px] grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] items-start gap-[6%] max-[900px]:grid-cols-1 max-[900px]:gap-10 max-[800px]:mt-10">
                <div>
                    <WalesMap selected={selected} onSelect={selectFromMap} />
                    <MapLegend />
                </div>
                <div
                    ref={panelRef}
                    data-reveal
                    className={`sticky top-[110px] max-[900px]:static max-[900px]:scroll-my-4 ${reveal}`}
                >
                    <ProducerPanel
                        producer={producer}
                        index={selected}
                        onStep={step}
                    />
                    <ProducerList selected={selected} onSelect={setSelected} />
                </div>
            </div>
        </section>
    );
}

function WalesMap({
    selected,
    onSelect,
}: {
    selected: number;
    onSelect: (index: number) => void;
}) {
    return (
        <div
            data-reveal
            className={`group/map relative mx-auto w-full max-w-[560px] ${reveal}`}
            style={{ aspectRatio: `${MAP_WIDTH} / ${MAP_HEIGHT}` }}
        >
            {/* Rings echoing the hero illustration */}
            <span
                aria-hidden="true"
                className="absolute left-1/2 top-1/2 size-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10"
            />
            <span
                aria-hidden="true"
                className="absolute left-1/2 top-1/2 size-[104%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/10"
            />

            <svg
                viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
                className="absolute inset-0 size-full overflow-visible"
                role="img"
                aria-label="Map of Wales showing where each producer is based"
            >
                <defs>
                    <pattern
                        id="map-sea-dots"
                        width="26"
                        height="26"
                        patternUnits="userSpaceOnUse"
                    >
                        <circle cx="13" cy="13" r="1.8" fill="#ffffff" />
                    </pattern>
                    <pattern
                        id="map-land-lines"
                        width="18"
                        height="18"
                        patternUnits="userSpaceOnUse"
                        patternTransform="rotate(-35)"
                    >
                        <line
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="18"
                            stroke="#244936"
                            strokeWidth="2"
                        />
                    </pattern>
                </defs>
                <rect
                    width={MAP_WIDTH}
                    height={MAP_HEIGHT}
                    fill="url(#map-sea-dots)"
                    opacity=".09"
                />
                {/* Flat offset shadow, like the hero dragon and badges */}
                <path
                    d={walesPath}
                    fill="#112f22"
                    opacity=".45"
                    transform="translate(12 16)"
                />
                <path
                    d={walesPath}
                    fill="#f6f1e7"
                    stroke="#fffcf6"
                    strokeWidth="4"
                    strokeLinejoin="round"
                />
                <path d={walesPath} fill="url(#map-land-lines)" opacity=".06" />
            </svg>

            {seaLabels.map((label) => (
                <span
                    key={label.name}
                    aria-hidden="true"
                    className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-display text-[13px] italic tracking-[.02em] text-[#9fb5a4] max-[800px]:text-[11px]"
                    style={mapPosition(label.lat, label.lng)}
                >
                    {label.name}
                </span>
            ))}

            {mapTowns.map((town) => (
                <span
                    key={town.name}
                    aria-hidden="true"
                    className={`absolute flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[.12em] text-welsh-green/60 max-[800px]:text-[8px] ${townLabelPlacement[town.label ?? "right"]}`}
                    style={{
                        ...mapPosition(town.lat, town.lng),
                        // Margins, not translate: the placement classes own that
                        marginLeft: town.nudge?.x,
                        marginTop: town.nudge?.y,
                    }}
                >
                    <i className="block size-1.5 rounded-full bg-welsh-green/45" />
                    {town.name}
                </span>
            ))}

            <Compass />

            {mapProducers.map((producer, index) => (
                <MapPin
                    key={producer.name}
                    producer={producer}
                    index={index}
                    active={index === selected}
                    onSelect={() => onSelect(index)}
                />
            ))}
        </div>
    );
}

function MapPin({
    producer,
    index,
    active,
    onSelect,
}: {
    producer: MapProducer;
    index: number;
    active: boolean;
    onSelect: () => void;
}) {
    const color = mapCategoryColors[producer.category];
    const offset = producer.pinOffset;

    return (
        // Outer span sits on the true location and pops the pin in when the
        // map is revealed; the button inside handles hover and selection
        // without inheriting that delay.
        <span
            className={`absolute -translate-x-1/2 -translate-y-1/2 scale-0 opacity-0 transition-[scale,opacity] duration-500 ease-[cubic-bezier(0.34,1.4,0.64,1)] group-data-[revealed=true]/map:scale-100 group-data-[revealed=true]/map:opacity-100 motion-reduce:scale-100 motion-reduce:opacity-100 ${active ? "z-30 hover:z-40" : "z-10 hover:z-40"}`}
            style={{
                ...mapPosition(producer.lat, producer.lng),
                transitionDelay: `${300 + index * 45}ms`,
            }}
        >
            <button
                type="button"
                onClick={onSelect}
                aria-label={`${producer.name}, ${producer.place}`}
                aria-pressed={active}
                data-pin
                style={
                    offset && {
                        translate: `${offset.x}px ${offset.y}px`,
                    }
                }
                className="group relative flex size-7 cursor-pointer items-center justify-center rounded-full border-0 bg-transparent p-0 max-[800px]:size-6"
            >
                {active && (
                    <span
                        aria-hidden="true"
                        className="absolute size-4 animate-pin-pulse rounded-full max-[800px]:size-3.5"
                        style={{ backgroundColor: color }}
                    />
                )}
                <span
                    aria-hidden="true"
                    className={`relative block rounded-full ring-deep-green shadow-[2px_3px_0_rgba(17,47,34,.3)] transition-[scale,box-shadow] duration-300 ease-[cubic-bezier(0.34,1.4,0.64,1)] ${
                        active
                            ? "size-[18px] ring-[3px] scale-110 shadow-[3px_4px_0_#d54a3d] max-[800px]:size-4"
                            : "size-3.5 ring-[2.5px] group-hover:scale-125 max-[800px]:size-3"
                    }`}
                    style={{ backgroundColor: color }}
                />
                <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute bottom-full left-1/2 mb-1.5 -translate-x-1/2 whitespace-nowrap bg-deep-green px-2.5 py-[7px] font-display text-[11px] font-bold leading-none text-white shadow-[3px_4px_0_#d54a3d] transition-[opacity,translate] duration-200 max-[800px]:hidden ${
                        active
                            ? // Hide while another pin is hovered, so only one name shows
                              "opacity-100 group-has-[[data-pin]:hover]/map:opacity-0 group-hover:opacity-100!"
                            : "translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
                    }`}
                >
                    {producer.name}
                </span>
            </button>
        </span>
    );
}

function Compass() {
    return (
        <div
            aria-hidden="true"
            className="absolute right-[2%] top-[3%] flex flex-col items-center gap-1 text-white/80 max-[800px]:right-0"
        >
            <span className="text-[10px] font-bold tracking-[.17em]">N</span>
            <svg viewBox="0 0 20 40" className="h-9 w-[18px] max-[800px]:h-7">
                <path d="M10 0 18 40 10 32 2 40Z" fill="#d54a3d" />
                <path d="M10 0 10 32 2 40Z" fill="#a8322a" />
            </svg>
        </div>
    );
}

function MapLegend() {
    return (
        <ul className="mx-auto mt-8 flex max-w-[560px] flex-wrap justify-center gap-x-5 gap-y-2.5 text-[10px] font-bold uppercase tracking-[.14em] text-[#c7d2c7]">
            {categories.map((category) => (
                <li key={category} className="flex items-center gap-2">
                    <span
                        className="size-2.5 rounded-full ring-2 ring-deep-green"
                        style={{ backgroundColor: mapCategoryColors[category] }}
                    />
                    {category}
                </li>
            ))}
        </ul>
    );
}

function ProducerPanel({
    producer,
    index,
    onStep,
}: {
    producer: MapProducer;
    index: number;
    onStep: (by: number) => void;
}) {
    const color = mapCategoryColors[producer.category];

    return (
        <article
            aria-live="polite"
            className="overflow-hidden rounded-[3px] bg-paper text-ink shadow-[0_18px_30px_rgba(15,43,31,.25)]"
        >
            <div
                className="group relative flex h-[200px] items-center justify-center overflow-hidden transition-colors duration-500 max-[800px]:h-[165px]"
                style={{ backgroundColor: color }}
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
                {/* Cream plate so every logo reads as the same kind of sticker */}
                <div
                    key={producer.name}
                    className="relative flex size-[148px] animate-art-in items-center justify-center rounded-full bg-paper p-2.5 shadow-[6px_8px_0_rgba(17,47,34,.18)] ring-[3px] ring-white/60 transition-transform duration-[450ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-[1.06] group-hover:-rotate-[5deg] max-[800px]:size-[122px] max-[800px]:p-2"
                >
                    {producer.badge ? (
                        <Image
                            src={producer.badge}
                            alt={`${producer.name} logo`}
                            width={128}
                            height={128}
                            className="size-full object-contain"
                        />
                    ) : (
                        <span
                            aria-hidden="true"
                            className="flex size-full items-center justify-center rounded-full border-2 border-dashed font-display text-[44px] tracking-[-.04em] text-welsh-green max-[800px]:text-[36px]"
                            style={{ borderColor: color }}
                        >
                            {initials(producer.name)}
                        </span>
                    )}
                </div>
                <span className="absolute left-[17px] top-[14px] bg-white/85 px-[9px] py-[6px] text-[9px] font-bold uppercase tracking-[.1em]">
                    {producer.product}
                </span>
            </div>

            <div
                key={producer.name}
                className="animate-item-in px-[26px] pb-[26px] pt-[24px] max-[800px]:px-5 max-[800px]:pb-[22px]"
            >
                <p className="mb-[11px] text-[10px] font-bold uppercase tracking-[.14em] text-[#9a6f4b]">
                    {producer.place}
                    {producer.county !== producer.place &&
                        ` · ${producer.county}`}
                </p>
                <h3 className="mb-3 font-display text-[30px] font-normal leading-[1.1] max-[800px]:text-[26px]">
                    {producer.name}
                </h3>
                <p className="mb-5 min-h-[3lh] text-[13px] leading-[1.6] text-muted max-[800px]:min-h-0">
                    {producer.description}
                </p>
                <div className="flex items-center justify-between gap-4">
                    <a
                        href={producer.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group"
                    >
                        <span
                            className={`${underlineLink} group-hover:[&_span]:translate-x-0.5 group-hover:[&_span]:-translate-y-0.5`}
                        >
                            Learn more <Icon name="arrow_outward" />
                        </span>
                    </a>
                    <div className="flex shrink-0 items-center gap-2">
                        <StepButton
                            label="Previous producer"
                            icon="arrow_back"
                            onClick={() => onStep(-1)}
                        />
                        <span className="min-w-[46px] text-center text-[10px] font-bold tracking-[.14em] text-muted">
                            {pad(index + 1)} / {pad(mapProducers.length)}
                        </span>
                        <StepButton
                            label="Next producer"
                            icon="arrow_forward"
                            onClick={() => onStep(1)}
                        />
                    </div>
                </div>
            </div>
        </article>
    );
}

function StepButton({
    label,
    icon,
    onClick,
}: {
    label: string;
    icon: "arrow_back" | "arrow_forward";
    onClick: () => void;
}) {
    return (
        <button
            type="button"
            aria-label={label}
            onClick={onClick}
            className="flex size-9 cursor-pointer items-center justify-center rounded-full border border-line bg-transparent p-0 text-welsh-green transition-[background-color,border-color,color,scale] duration-200 hover:border-welsh-green hover:bg-welsh-green hover:text-white active:scale-90"
        >
            <Icon name={icon} className="text-base" />
        </button>
    );
}

/** Every producer by name; desktop only, phones use the pins and arrows. */
function ProducerList({
    selected,
    onSelect,
}: {
    selected: number;
    onSelect: (index: number) => void;
}) {
    return (
        <ul className="mt-6 grid grid-cols-2 border-t border-white/15 max-[900px]:hidden">
            {mapProducers.map((producer, index) => (
                <li key={producer.name} className="border-b border-white/15">
                    <button
                        type="button"
                        onClick={() => onSelect(index)}
                        aria-pressed={index === selected}
                        className={`flex w-full cursor-pointer items-center gap-2.5 border-0 bg-transparent px-1 py-[11px] text-left text-xs transition-[color,padding] duration-200 hover:pl-2.5 ${
                            index === selected
                                ? "font-bold text-white"
                                : "text-[#c7d2c7] hover:text-white"
                        }`}
                    >
                        <span
                            className="size-2 shrink-0 rounded-full"
                            style={{
                                backgroundColor:
                                    mapCategoryColors[producer.category],
                            }}
                        />
                        <span className="truncate">{producer.name}</span>
                    </button>
                </li>
            ))}
        </ul>
    );
}
