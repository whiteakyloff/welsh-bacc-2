import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { PressableDiv } from "@/components/ui/PressableDiv";
import { INSTAGRAM_URL } from "@/lib/content";
import { reveal } from "@/lib/reveal";
import { sectionColors } from "@/lib/theme";

export function GetInvolvedSection() {
    return (
        <section
            data-theme-color={sectionColors.paper}
            data-reveal
            className={`grid grid-cols-2 items-center gap-[14%] max-[800px]:grid-cols-1 max-[800px]:gap-[35px] mx-auto max-w-[1440px] px-[9vw] py-[100px] max-[1100px]:px-[7vw] max-[800px]:py-[70px] ${reveal}`}
            id="get-involved"
        >
            <div>
                <Eyebrow>05 / Your next step</Eyebrow>
                <h2 className="mt-5 font-display text-[clamp(40px,5vw,65px)] font-normal leading-[.98] tracking-[-.05em] [&_em]:text-[#e45144]">
                    Put Wales
                    <br />
                    <em>on your plate.</em>
                </h2>
                <p className="mt-[25px] max-w-[480px] text-[15px] leading-[1.75] text-muted">
                    Follow the campaign for producer spotlights, Welsh food
                    inspiration and ideas for making local choices part of
                    everyday life.
                </p>
                <a
                    className="mt-[18px] inline-flex items-center gap-5 rounded px-[22px] py-[15px] text-xs font-bold tracking-[.03em] transition-[translate,background-color,box-shadow] duration-200 ease-out hover:-translate-y-[3px] hover:shadow-lg [&_span]:transition-transform [&_span]:duration-200 hover:[&_span]:translate-x-1 bg-gold text-ink"
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noreferrer"
                >
                    Follow Us! <Icon name="arrow_outward" />
                </a>
            </div>

            <FestivalCard />
        </section>
    );
}

function FestivalCard() {
    return (
        // Pressing the card sends the asterisk into a fast spin.
        <PressableDiv
            anyPointer
            className="group relative bg-cream p-[45px] before:absolute before:inset-y-0 before:left-0 before:w-[6px] before:bg-[#f1be69] max-[800px]:p-[30px]"
        >
            <Icon
                name="asterisk"
                className="inline-block animate-pulse-mark text-[28px] text-[#d54a3d] group-data-pressed:animate-spin-burst"
            />
            <p className="mt-[27px] text-[13px] font-bold uppercase leading-[1.7] tracking-[.17em] text-muted">
                A future idea
            </p>
            <h3 className="my-[14px] font-display text-[30px] font-normal">
                A Welsh food festival
            </h3>
            <p className="text-[13px] leading-[1.7] text-muted">
                A possible family-friendly festival could bring Welsh producers,
                food and community together. It is an idea for the future,
                dependent on funding, volunteers and support.
            </p>
            <span className="mt-7 block h-[2px] w-[45px] bg-[#d54a3d]" />
        </PressableDiv>
    );
}
