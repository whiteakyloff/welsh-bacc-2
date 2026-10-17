import type { SectionId } from "./content";

export function scrollToSection(id: SectionId) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}
