import type { CSSProperties } from "react";

import { Eyebrow } from "@/components/ui/Eyebrow";
import { aboutSteps } from "@/lib/content";
import { reveal } from "@/lib/reveal";
import { sectionColors } from "@/lib/theme";

// Mobile only: each step becomes a sticky card that shrinks and dims as the
// next one slides over it (see useStackedCards).
const stackCard =
    "max-[800px]:sticky max-[800px]:top-[calc(24px+var(--stack-index)*14px)] max-[800px]:flex max-[800px]:min-h-[60svh] max-[800px]:flex-col max-[800px]:justify-between max-[800px]:overflow-hidden max-[800px]:rounded-[10px] max-[800px]:p-[28px] max-[800px]:text-white " +
    "max-[800px]:origin-top max-[800px]:scale-[calc(1-var(--stack-progress,0)*.08)] max-[800px]:shadow-[0_-10px_30px_rgba(15,43,31,.22),inset_0_0_0_1px_rgba(255,255,255,.08)] " +
    "max-[800px]:after:pointer-events-none max-[800px]:after:absolute max-[800px]:after:inset-0 max-[800px]:after:bg-black max-[800px]:after:opacity-[calc(var(--stack-progress,0)*.3)] max-[800px]:after:content-['']";

export function AboutSection() {
    return (
        <section
            data-theme-color={sectionColors.paper}
            data-reveal
            className={`mx-auto max-w-[1440px] px-[9vw] py-[100px] max-[1100px]:px-[7vw] max-[800px]:py-[70px] ${reveal}`}
            id="about"
        >
            <Eyebrow>01 / The idea</Eyebrow>
            <div className="mt-[35px] grid grid-cols-2 gap-[12%] max-[800px]:mt-[25px] max-[800px]:grid-cols-1 max-[800px]:gap-[35px]">
                <h2 className="font-display text-[clamp(40px,5vw,65px)] font-normal leading-[.98] tracking-[-.05em] [&_em]:text-[#e45144]">
                    Food is more than
                    <br />
                    <em>what’s on your plate.</em>
                </h2>
                <div>
                    <p className="font-display text-[21px] leading-[1.45] text-ink max-[800px]:text-[19px]">
                        Eat Welsh, Eat Well encourages people in Wales to buy
                        locally produced food more often and make healthier,
                        informed choices.
                    </p>
                    <p className="mt-[18px] max-w-[480px] text-[15px] leading-[1.75] text-muted">
                        It is a campaign about noticing what is around us: the
                        farmers, food producers and local businesses that bring
                        Welsh food to our tables. Through digital content,
                        community activity and this website, we want to make
                        discovering local food feel easy and welcoming.
                    </p>
                </div>
            </div>
            <div className="mt-[76px] grid grid-cols-3 gap-[4%] border-t border-line pt-[22px] max-[800px]:mt-[50px] max-[800px]:flex max-[800px]:flex-col max-[800px]:gap-[18px] max-[800px]:border-0 max-[800px]:pt-0">
                {aboutSteps.map((step, index) => (
                    <div
                        key={step.title}
                        data-stack-card
                        style={{ "--stack-index": index } as CSSProperties}
                        className={`${stackCard} ${step.accentClassName}`}
                    >
                        {/* Mobile card decoration: soft light from the top corner */}
                        <span
                            aria-hidden="true"
                            className="absolute inset-0 hidden bg-[radial-gradient(circle_at_15%_0%,rgba(255,255,255,.16),transparent_55%)] max-[800px]:block"
                        />

                        <div className="relative max-[800px]:flex max-[800px]:items-start max-[800px]:justify-between">
                            <span className="text-[11px] text-[#d54a3d] max-[800px]:font-display max-[800px]:text-[76px] max-[800px]:leading-[.8] max-[800px]:tracking-[-.05em] max-[800px]:text-white">
                                {String(index + 1).padStart(2, "0")}
                            </span>
                            <span className="hidden rounded-full border border-white/30 px-3 py-1 text-[10px] uppercase tracking-[.18em] text-white/75 max-[800px]:block">
                                Step {index + 1} of {aboutSteps.length}
                            </span>
                        </div>

                        <div className="relative">
                            <strong className="my-[13px] block font-display text-2xl font-normal max-[800px]:mb-[14px] max-[800px]:mt-0 max-[800px]:text-[44px] max-[800px]:leading-none max-[800px]:tracking-[-.04em]">
                                {step.title}
                            </strong>
                            <p className="max-w-[180px] text-xs leading-normal text-muted max-[800px]:max-w-[240px] max-[800px]:border-t max-[800px]:border-white/20 max-[800px]:pt-[14px] max-[800px]:text-[15px] max-[800px]:leading-[1.55] max-[800px]:text-white/80">
                                {step.text}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
