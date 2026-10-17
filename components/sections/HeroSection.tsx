import Image from "next/image";
import type { ReactNode } from "react";
import dragonLogo from "@/images/logo_dragon.png";
import { Icon } from "@/components/ui/Icon";
import { ScrollButton } from "@/components/ui/ScrollButton";
import { sectionColors } from "@/lib/theme";

export function HeroSection() {
    return (
        <section
            data-theme-color={sectionColors.deepGreen}
            className="relative flex min-h-[720px] overflow-hidden bg-deep-green px-[9vw] pb-20 pt-[150px] text-white max-[1100px]:min-h-[650px] max-[1100px]:px-[7vw] max-[800px]:min-h-0 max-[800px]:flex-col max-[800px]:pb-[55px] max-[800px]:pt-[130px]"
            id="top"
        >
            <div className="relative z-10 w-[48%] max-w-[610px] animate-rise-in max-[1100px]:w-[52%] max-[800px]:w-full">
                <p className="text-[10px] font-bold uppercase tracking-[.17em] text-[#f1be69] animate-item-in [animation-delay:80ms]">
                    <span className="mr-3 inline-block h-px w-9 align-middle bg-[#f1be69]" />{" "}
                    A campaign for local food
                </p>
                <h1 className="my-[30px] mb-[25px] font-display text-[clamp(50px,7vw,92px)] font-normal leading-[.98] tracking-[-.05em] animate-item-in [animation-delay:180ms] max-[800px]:text-[clamp(47px,14vw,75px)] [&_em]:text-[#e45144]">
                    Good food.
                    <br />
                    <em>Good neighbours.</em>
                    <br />
                    Good Wales.
                </h1>
                <p className="max-w-[400px] text-base leading-[1.7] text-[#d4dfd6] max-[800px]:max-w-[330px] animate-item-in [animation-delay:300ms]">
                    Discover the people and produce behind Welsh food. Choose
                    local where you can, eat well and help Welsh businesses
                    grow.
                </p>
                <div className="mt-[35px] flex items-center gap-[25px] max-[800px]:flex-wrap max-[800px]:gap-[18px_24px] animate-item-in [animation-delay:420ms]">
                    <ScrollButton
                        target="discover"
                        className="inline-flex cursor-pointer items-center gap-5 rounded border-0 px-[22px] py-[15px] text-xs font-bold tracking-[.03em] transition-all duration-200 hover:-translate-y-[3px] hover:shadow-lg [&_span]:transition-transform hover:[&_span]:translate-y-1 bg-gold text-ink"
                    >
                        Discover Welsh food <Icon name="arrow_downward" />
                    </ScrollButton>
                    <ScrollButton
                        target="about"
                        className="cursor-pointer border-0 bg-transparent p-0 text-xs font-bold [&_span]:ml-2 [&_span]:text-[19px] [&_span]:text-[#f1be69] [&_span]:transition-all hover:[&_span]:ml-3.5"
                    >
                        Our story <Icon name="arrow_forward" />
                    </ScrollButton>
                </div>
                <div className="mt-[30px] flex items-center gap-[13px] text-[11px] leading-normal text-[#bfcec2] max-[800px]:my-[35px] max-[800px]:mb-10 animate-item-in [animation-delay:550ms] [&_strong]:text-white">
                    <Icon name="asterisk" className="animate-pulse-mark text-2xl text-[#e45144]" />
                    <p>
                        <strong>Small choices add up.</strong>
                        <br />
                        Start with one Welsh product this week.
                    </p>
                </div>
            </div>

            <HeroArt />
        </section>
    );
}

/** Dragon, sun and rings illustration with two floating badges. */
function HeroArt() {
    return (
        <div
            className="absolute right-[-1%] top-[15%] h-[88%] w-[52%] animate-art-in max-[800px]:relative max-[800px]:right-auto max-[800px]:top-auto max-[800px]:mx-[-4vw] max-[800px]:mb-[-55px] max-[800px]:mt-[35px] max-[800px]:h-[350px] max-[800px]:w-[calc(100%+8vw)] max-[800px]:shrink-0"
            aria-label="Illustration of a Welsh dragon and fresh local produce"
        >
            {/* Sun */}
            <div className="absolute left-[calc(50%-175px)] top-[21%] h-[350px] w-[350px] animate-sun-breathe rounded-full bg-[#edbd68] opacity-90 max-[1100px]:h-[310px] max-[1100px]:w-[310px] max-[1100px]:left-[calc(50%-155px)] max-[800px]:left-[calc(50%-122px)] max-[800px]:top-[17%] max-[800px]:h-[245px] max-[800px]:w-[245px]" />
            {/* Rings */}
            <div className="absolute left-1/2 top-[43%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#f5c978]/30 max-[800px]:translate-x-0 max-[800px]:translate-y-0 h-[480px] w-[480px] max-[1100px]:h-[420px] max-[1100px]:w-[420px] max-[800px]:left-[calc(50%-175px)] max-[800px]:top-0 max-[800px]:h-[350px] max-[800px]:w-[350px]" />
            <div className="absolute left-1/2 top-[43%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#f5c978]/30 max-[800px]:translate-x-0 max-[800px]:translate-y-0 h-[600px] w-[600px] max-[1100px]:h-[520px] max-[1100px]:w-[520px] max-[800px]:left-[calc(50%-217px)] max-[800px]:top-[-12%] max-[800px]:h-[435px] max-[800px]:w-[435px]" />
            <Image
                className="absolute left-[calc(50%-190px)] top-[18%] h-[380px] w-[380px] animate-dragon-float object-contain drop-shadow-[15px_21px_0_rgba(17,47,34,.3)] max-[1100px]:left-[calc(50%-165px)] max-[1100px]:h-[330px] max-[1100px]:w-[330px] max-[800px]:left-[calc(50%-135px)] max-[800px]:top-[12%] max-[800px]:h-[270px] max-[800px]:w-[270px]"
                src={dragonLogo}
                alt=""
                width={500}
                height={500}
            />
            <HeroBadge className="right-[8%] top-[20%] rotate-6 hover:rotate-4 max-[800px]:top-[17%]">
                Locally
                <br />
                made
            </HeroBadge>
            <HeroBadge className="bottom-[32%] left-[8%] -rotate-8 hover:-rotate-6 max-[800px]:bottom-[12%]">
                Simply
                <br />
                Welsh
            </HeroBadge>
        </div>
    );
}

function HeroBadge({ className, children }: { className: string; children: ReactNode }) {
    return (
        <div
            className={`absolute bg-paper px-[18px] py-[15px] font-display text-xs font-bold leading-[1.15] text-ink shadow-[4px_5px_0_#d54a3d] transition-[translate,rotate,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[7px_8px_0_#d54a3d] max-[800px]:px-[13px] max-[800px]:py-[11px] max-[800px]:text-[10px] ${className}`}
        >
            <Icon name="star_shine" className="mr-[7px] text-[#d54a3d]" />{" "}
            {children}
        </div>
    );
}
