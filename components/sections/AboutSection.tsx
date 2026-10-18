import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { ScrollButton } from "@/components/ui/ScrollButton";
import { aboutSteps } from "@/lib/content";
import { underlineLink } from "@/lib/linkStyles";
import { reveal } from "@/lib/reveal";
import { sectionColors } from "@/lib/theme";

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
                    <p className="!mt-0 font-display !text-[21px] !leading-[1.45] !text-ink">
                        Eat Welsh, Eat Well encourages people in Wales to buy
                        locally produced food more often and make healthier,
                        informed choices.
                    </p>
                    <p className="mt-0 max-w-[480px] text-[15px] leading-[1.75] text-muted">
                        It is a campaign about noticing what is around us: the
                        farmers, food producers and local businesses that bring
                        Welsh food to our tables. Through digital content,
                        community activity and this website, we want to make
                        discovering local food feel easy and welcoming.
                    </p>
                    <ScrollButton
                        target="why-welsh"
                        className="group mt-[15px] block cursor-pointer border-0 bg-transparent p-0"
                    >
                        <span
                            className={`${underlineLink} group-hover:[&_span]:translate-x-1 group-active:[&_span]:translate-x-1.5 group-data-pressed:[&_span]:translate-x-1.5`}
                        >
                            Why choose Welsh? <Icon name="arrow_forward" />
                        </span>
                    </ScrollButton>
                </div>
            </div>
            <div className="mt-[76px] grid grid-cols-3 gap-[4%] border-t border-line pt-[22px] max-[800px]:mt-[50px] max-[800px]:gap-[18px]">
                {aboutSteps.map((step, index) => (
                    <div key={step.title}>
                        <span className="text-[11px] text-[#d54a3d]">
                            {String(index + 1).padStart(2, "0")}
                        </span>
                        <strong className="my-[13px] block font-display text-2xl font-normal">
                            {step.title}
                        </strong>
                        <p className="max-w-[180px] text-xs leading-normal text-muted">
                            {step.text}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
