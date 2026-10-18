import { Eyebrow } from "@/components/ui/Eyebrow";
import { reasons } from "@/lib/content";
import { reveal, revealBase, revealDelay } from "@/lib/reveal";
import { sectionColors } from "@/lib/theme";

export function WhyWelshSection() {
    return (
        <section
            data-theme-color={sectionColors.paper}
            data-reveal
            className={`mx-auto max-w-[1440px] px-[9vw] py-[100px] max-[1100px]:px-[7vw] max-[800px]:py-[70px] ${reveal}`}
            id="why-welsh"
        >
            <Eyebrow>03 / The difference</Eyebrow>
            <div className="mt-[30px] flex items-end justify-between gap-10 max-[800px]:block">
                <h2 className="max-w-[520px] font-display text-[clamp(42px,5vw,68px)] font-normal leading-[.95] tracking-[-.05em] [&_em]:text-[#e45144]">
                    Why choose
                    <br />
                    <em>Welsh?</em>
                </h2>
                <p className="w-[315px] shrink-0 text-[15px] leading-[1.75] text-muted max-[800px]:mt-[25px] max-[800px]:w-auto">
                    There is no one perfect way to eat well. A good place to
                    start is with small, realistic choices that connect you to
                    your local food community.
                </p>
            </div>
            <div className="mt-[70px] border-t border-line max-[800px]:mt-10">
                {reasons.map((reason, index) => (
                    <div
                        data-reveal
                        className={`group grid grid-cols-[100px_1.1fr_1.3fr_30px] items-center gap-[25px] border-b border-line py-[25px] max-[800px]:grid-cols-[35px_1fr_20px] max-[800px]:gap-[10px] ${revealBase} transition-[opacity,translate,background-color,padding] hover:bg-welsh-green/5 hover:pl-[14px]`}
                        style={revealDelay(index)}
                        key={reason.title}
                    >
                        <span className="text-xs text-[#d54a3d]">
                            {String(index + 1).padStart(2, "0")}
                        </span>
                        <h3 className="font-display text-[24px] font-normal">
                            {reason.title}
                        </h3>
                        <p className="max-w-[370px] text-[13px] leading-normal text-muted max-[800px]:col-[2/4]">
                            {reason.text}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
