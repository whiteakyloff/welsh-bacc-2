import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { eatWellTips } from "@/lib/content";
import { reveal } from "@/lib/reveal";
import { sectionColors } from "@/lib/theme";

export function EatWellSection() {
    return (
        <section
            data-theme-color={sectionColors.coral}
            data-reveal
            className={`bg-[#d95348] text-white ${reveal}`}
        >
            <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-[14%] px-[9vw] py-[88px] max-[1100px]:gap-[8%] max-[1100px]:px-[7vw] max-[800px]:grid-cols-1 max-[800px]:gap-[45px] max-[800px]:py-[70px]">
                <div>
                    <Eyebrow>04 / Eat well</Eyebrow>
                    <h2 className="mt-5 font-display text-[clamp(40px,5vw,65px)] font-normal leading-[.98] tracking-[-.05em] [&_em]:text-[#f5c978]">
                        Healthy choices
                        <br />
                        <em>made simple.</em>
                    </h2>
                    <p className="mt-[25px] max-w-[400px] text-sm leading-[1.7] text-[#f8d4cc]">
                        Try adding one more seasonal ingredient, checking the
                        label, or cooking with someone you love. Eating well can
                        be practical, personal and enjoyable.
                    </p>
                </div>
                <div className="border-t border-white/35">
                    {eatWellTips.map((tip) => (
                        <div
                            key={tip.title}
                            className="grid grid-cols-[35px_1fr] border-b border-white/35 py-[19px]"
                        >
                            <Icon name="star_shine" className="text-xl text-[#f5c978]" />
                            <strong className="font-display text-xl font-normal">
                                {tip.title}
                            </strong>
                            <p className="col-start-2 mt-1.5 text-xs leading-[1.5] text-[#f8d4cc]">
                                {tip.text}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
