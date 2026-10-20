import { SiteNav } from "@/components/layout/SiteNav";
import { inlineImage } from "@/lib/inlineImage";

// Inlined into the HTML so the logo paints together with the text instead of after a separate request.
const logoSrc = inlineImage("logo-header.webp");

export function SiteHeader() {
    return (
        <header className="absolute z-50 flex h-[86px] w-full items-center justify-between px-[5vw] text-white max-[800px]:px-[6vw]">
            <div className="flex items-center gap-2.5 leading-none">
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
            </div>
            <SiteNav />
        </header>
    );
}
