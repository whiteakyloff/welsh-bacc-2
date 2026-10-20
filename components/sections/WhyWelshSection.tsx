import { Eyebrow } from "@/components/ui/Eyebrow";
import { PressableDiv } from "@/components/ui/PressableDiv";
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
                    <PressableDiv
                        data-reveal
                        className={`group grid grid-cols-[100px_1.1fr_1.3fr_30px] items-center gap-[25px] border-b border-line py-[25px] max-[800px]:grid-cols-[35px_1fr_20px] max-[800px]:gap-[10px] ${revealBase} transition-[opacity,translate,background-color,padding] pr-[14px] hover:bg-welsh-green/5 hover:pl-[14px] hover:pr-0 data-pressed:bg-welsh-green/5 data-pressed:pl-[14px] data-pressed:pr-0 data-pressed:delay-0 data-pressed:duration-200`}
                        style={revealDelay(index)}
                        key={reason.title}
                    >
                        <span className="origin-left text-xs text-[#d54a3d] transition-transform duration-300 ease-[cubic-bezier(0.34,1.4,0.64,1)] group-hover:scale-125 group-data-pressed:scale-125">
                            {String(index + 1).padStart(2, "0")}
                        </span>
                        <h3 className="font-display text-[24px] font-normal">
                            {reason.title}
                        </h3>
                        <p className="max-w-[370px] text-[13px] leading-normal text-muted max-[800px]:col-[2/4]">
                            {reason.text}
                        </p>
                    </PressableDiv>
                ))}
            </div>
        </section>
    );
}
