import { PageEffects } from "@/components/PageEffects";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { AboutSection } from "@/components/sections/AboutSection";
import { DiscoverSection } from "@/components/sections/DiscoverSection";
import { EatWellSection } from "@/components/sections/EatWellSection";
import { GetInvolvedSection } from "@/components/sections/GetInvolvedSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { WhyWelshSection } from "@/components/sections/WhyWelshSection";
import { revealVars } from "@/lib/reveal";

export default function Home() {
    return (
        <main className="overflow-x-clip bg-paper" style={revealVars}>
            <PageEffects />
            <SiteHeader />
            <HeroSection />
            <AboutSection />
            <DiscoverSection />
            <WhyWelshSection />
            <EatWellSection />
            <GetInvolvedSection />
            <SiteFooter />
        </main>
    );
}
