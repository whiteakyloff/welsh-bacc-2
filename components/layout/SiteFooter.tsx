import Image from "next/image";
import logo from "@/images/logo-header.webp";
import { sectionColors } from "@/lib/theme";

export function SiteFooter() {
    return (
        <footer
            data-theme-color={sectionColors.deepGreen}
            className="flex items-center justify-between bg-deep-green px-[9vw] py-10 text-white max-[800px]:block max-[800px]:px-[7vw] max-[800px]:py-[35px]"
        >
            <div className="flex items-center gap-[13px]">
                <Image src={logo} alt="" width={72} height={72} />
                <div className="min-w-0">
                    <strong className="block font-display text-[19px] font-normal">
                        Eat Welsh, Eat Well
                    </strong>
                    <span className="mt-[6px] block text-[10px] text-[#b9c9bc]">
                        Choose local. Eat well. Support Wales.
                    </span>
                </div>
            </div>
            <p className="text-[10px] text-[#9caf9f] max-[800px]:mt-[25px]">
                © 2026 Eat Welsh, Eat Well
            </p>
        </footer>
    );
}
