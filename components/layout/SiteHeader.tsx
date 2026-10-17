import { SiteNav } from "@/components/layout/SiteNav";
import { ScrollButton } from "@/components/ui/ScrollButton";
import { inlineImage } from "@/lib/inlineImage";

// Inlined into the HTML so the logo paints together with the text instead of after a separate request.
const logoSrc = inlineImage("logo-header.webp");

export function SiteHeader() {
    return (
        <header className="absolute z-50 flex h-[86px] w-full items-center justify-between px-[5vw] text-white max-[800px]:px-[6vw]">
            <ScrollButton
                target="top"
                className="flex cursor-pointer items-center gap-2.5 border-0 bg-transparent p-0 text-left leading-none transition-transform duration-200 hover:-translate-y-0.5"
                aria-label="Eat Welsh, Eat Well home"
            >
                {/* eslint-disable-next-line @next/next/no-img-element -- data URI, nothing for next/image to optimize */}
                <img
                    src={logoSrc}
                    alt="Eat Welsh, Eat Well dragon logo"
                    width={145}
                    height={160}
                    className="h-[52px] w-[52px] object-contain"
                />
                <span>
                    <strong className="block font-display text-[19px]">
                        Eat Welsh
                    </strong>
                    <small className="mt-[5px] block text-[9px] uppercase tracking-[3px] text-[#f1be69]">
                        Eat Well
                    </small>
                </span>
            </ScrollButton>
            <SiteNav />
        </header>
    );
}
