import Image from "next/image";
import { ScrollButton } from "@/components/ui/ScrollButton";
import logo from "@/images/logo-header.webp";
import { sectionColors } from "@/lib/theme";

export function SiteFooter() {
    return (
        <footer
            data-theme-color={sectionColors.deepGreen}
            className="flex items-center gap-4 bg-deep-green px-[9vw] py-10 text-white max-[800px]:px-[7vw] max-[800px]:py-[35px]"
        >
            {/* Back to top: the header isn't sticky, so this saves a long scroll up. */}
            <ScrollButton
                target="top"
                className="shrink-0 cursor-pointer rounded-full border-0 bg-transparent p-0"
                aria-label="Back to top"
            >
                <LogoSeal />
            </ScrollButton>
            <div className="min-w-0">
                <strong className="block font-display text-[19px] font-normal">
                    Eat Welsh, Eat Well
                </strong>
                <span className="mt-[6px] block text-[10px] text-[#b9c9bc]">
                    Choose local. Eat well. Support Wales.{" "}
                    <span className="text-[#9caf9f]">© 2026</span>
                </span>
            </div>
        </footer>
    );
}

/**
 * The dragon inside a ring of "back to top" text, like a stamp, so the logo
 * reads as something to press. The ring turns slowly all the time.
 */
function LogoSeal() {
    return (
        <span className="relative block size-[88px] shrink-0">
            <svg
                viewBox="0 0 100 100"
                aria-hidden="true"
                className="absolute inset-0 size-full text-[#f1be69] animate-[seal-turn_18s_linear_infinite]"
            >
                <defs>
                    <path
                        id="logo-seal-ring"
                        d="M50,50 m-40,0 a40,40 0 1,1 80,0 a40,40 0 1,1 -80,0"
                    />
                </defs>
                <text
                    fill="currentColor"
                    fontSize="9"
                    fontWeight="700"
                    letterSpacing="2"
                >
                    <textPath
                        href="#logo-seal-ring"
                        textLength="249"
                        lengthAdjust="spacing"
                    >
                        BACK TO TOP ✦ BACK TO TOP ✦{" "}
                    </textPath>
                </text>
            </svg>
            <Image
                src={logo}
                alt=""
                width={44}
                height={44}
                className="absolute inset-[22px] size-[44px] object-contain"
            />
        </span>
    );
}
