import { Eyebrow } from "@/components/ui/Eyebrow";
import { producers } from "@/lib/content";
import { reveal, revealDelay } from "@/lib/reveal";
import { sectionColors } from "@/lib/theme";
import { ProducerCard } from "./ProducerCard";

// The full-width background must stay still (no reveal on the <section>
// itself), otherwise sliding it in exposes the section above. The upward
// shadow covers a sub-pixel gap that can show after scrolling to it.
export function DiscoverSection() {
    return (
        <section
            data-theme-color={sectionColors.welshGreen}
            className="w-full bg-welsh-green shadow-[0_-2px_0_var(--color-welsh-green)] text-white px-[9vw] py-[100px] max-[1100px]:px-[7vw] max-[800px]:py-[70px]"
            id="discover"
        >
            <Eyebrow data-reveal className={`mx-auto max-w-[1260px] ${reveal}`}>
                02 / Meet the makers
            </Eyebrow>
            <div
                data-reveal
                className={`mx-auto mt-5 flex max-w-[1260px] items-end justify-between gap-10 max-[800px]:block ${reveal}`}
            >
                <h2 className="max-w-[650px] font-display text-[clamp(42px,5vw,68px)] font-normal leading-[.95] tracking-[-.05em] [&_em]:text-[#e45144]">
                    A taste of <em>Wales</em>
                </h2>
                <p className="w-[300px] shrink-0 text-[13px] leading-[1.6] text-[#c7d2c7] max-[800px]:mt-[25px] max-[800px]:w-auto">
                    Three Welsh food names from our project research. Start
                    exploring, then look out for more local producers in your
                    area.
                </p>
            </div>
            <div className="mx-auto mt-[55px] grid max-w-[1260px] grid-cols-3 gap-[19px] max-[1100px]:gap-[14px] max-[800px]:mt-[35px] max-[800px]:grid-cols-1 max-[800px]:gap-5">
                {producers.map((producer, index) => (
                    <div
                        data-reveal
                        className={reveal}
                        style={revealDelay(index)}
                        key={producer.name}
                    >
                        <ProducerCard producer={producer} />
                    </div>
                ))}
            </div>
            <p
                data-reveal
                className={`mx-auto mt-[27px] max-w-[1260px] text-[10px] text-[#aebeaf] ${reveal}`}
            >
                These businesses are examples featured in our project research.
                Eat Welsh, Eat Well does not imply sponsorship or endorsement.
            </p>
        </section>
    );
}
