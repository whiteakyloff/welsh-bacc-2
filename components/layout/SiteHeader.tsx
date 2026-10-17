"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import instagramIcon from "@/images/instagram_icon.png";
import logo from "@/images/logo.png";
import { Icon } from "@/components/ui/Icon";
import { ScrollButton } from "@/components/ui/ScrollButton";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL, navLinks } from "@/lib/content";

const ease = "ease-[cubic-bezier(0.2,0.8,0.2,1)]";

// The three hamburger bars and the transform each takes in the open (X) / closed state.
const menuBars = [
    { open: "rotate-45", closed: "-translate-y-1.5" },
    { open: "scale-x-50 opacity-0", closed: "" },
    { open: "-rotate-45", closed: "translate-y-1.5" },
];

const mobileNavTransition =
    "max-[800px]:[transition:opacity_.3s_ease,translate_.3s_cubic-bezier(.2,.8,.2,1),scale_.3s_cubic-bezier(.2,.8,.2,1),visibility_0s_linear_0s]";
const mobileNavTransitionClosing =
    "max-[800px]:[transition:opacity_.3s_ease,translate_.3s_cubic-bezier(.2,.8,.2,1),scale_.3s_cubic-bezier(.2,.8,.2,1),visibility_0s_linear_.3s]";

export function SiteHeader() {
    const [menuOpen, setMenuOpen] = useState(false);
    const closeMenu = () => setMenuOpen(false);

    useEffect(() => {
        const closeOnEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") setMenuOpen(false);
        };

        document.addEventListener("keydown", closeOnEscape);
        return () => document.removeEventListener("keydown", closeOnEscape);
    }, []);

    return (
        <header className="absolute z-50 flex h-[86px] w-full items-center justify-between px-[5vw] text-white max-[800px]:px-[6vw]">
            <ScrollButton
                target="top"
                onClick={closeMenu}
                className="flex cursor-pointer items-center gap-2.5 border-0 bg-transparent p-0 text-left leading-none transition-transform duration-200 hover:-translate-y-0.5"
                aria-label="Eat Welsh, Eat Well home"
            >
                <Image
                    src={logo}
                    alt="Eat Welsh, Eat Well dragon logo"
                    width={58}
                    height={58}
                    className="h-[52px] w-[52px] object-contain"
                    priority
                />
                <span>
                    <strong className="block font-display text-[19px]">
                        Eat Welsh
                    </strong>
                    <small className="mt-[5px] block text-[9px] uppercase tracking-[3px] text-[#f1be69]">
                        Eat Well
                    </small>
                </span>
            </ScrollButton>

            <MenuToggle open={menuOpen} onToggle={() => setMenuOpen((open) => !open)} />

            <nav
                id="site-navigation"
                aria-label="Main navigation"
                className={`flex items-center gap-[31px] text-xs font-bold tracking-[.03em] max-[1100px]:gap-[18px]
                    max-[800px]:absolute max-[800px]:inset-x-[5vw] max-[800px]:top-[78px] max-[800px]:z-50
                    max-[800px]:flex-col max-[800px]:items-stretch max-[800px]:gap-[3px] max-[800px]:origin-top
                    max-[800px]:rounded-[18px] max-[800px]:border max-[800px]:border-welsh-green/10
                    max-[800px]:bg-paper/95 max-[800px]:p-2.5 max-[800px]:text-ink max-[800px]:shadow-2xl
                    ${
                        menuOpen
                            ? `max-[800px]:visible max-[800px]:pointer-events-auto max-[800px]:translate-y-0 max-[800px]:scale-100 max-[800px]:opacity-100 ${mobileNavTransition}`
                            : `max-[800px]:invisible max-[800px]:pointer-events-none max-[800px]:-translate-y-3 max-[800px]:scale-[.97] max-[800px]:opacity-0 ${mobileNavTransitionClosing}`
                    }`}
            >
                {navLinks.map((link) => (
                    <ScrollButton
                        key={link.target}
                        target={link.target}
                        onClick={closeMenu}
                        className="cursor-pointer border-0 bg-transparent p-0 text-left opacity-90 transition-all hover:-translate-y-0.5 hover:opacity-100
                            max-[800px]:rounded-xl max-[800px]:p-[13px] max-[800px]:text-[13px]
                            max-[800px]:hover:translate-x-1 max-[800px]:hover:bg-[#e7f0e8]"
                    >
                        {link.label}
                    </ScrollButton>
                ))}
                <InstagramLink onClick={closeMenu} />
            </nav>
        </header>
    );
}

function MenuToggle({ open, onToggle }: { open: boolean; onToggle: () => void }) {
    return (
        <button
            className={`relative hidden size-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/20 p-0
                transition-[background-color,rotate,border-color] duration-[350ms] ${ease} max-[800px]:flex
                ${open ? "rotate-90 bg-gold" : "bg-white/10 hover:bg-white/15"}`}
            type="button"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
            aria-controls="site-navigation"
            onClick={onToggle}
        >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            {menuBars.map((bar, i) => (
                <i
                    key={i}
                    aria-hidden="true"
                    className={`absolute block h-0.5 w-5 origin-center rounded-[2px]
                        transition-[translate,rotate,scale,opacity,background-color] duration-300 ${ease}
                        ${open ? `bg-ink ${bar.open}` : `bg-white ${bar.closed}`}`}
                />
            ))}
        </button>
    );
}

/** Round icon button on desktop; full-width card with handle inside the mobile menu. */
function InstagramLink({ onClick }: { onClick: () => void }) {
    return (
        <a
            className="group flex size-10 items-center justify-center rounded-full border border-gold/50 transition-all duration-200
                min-[801px]:hover:border-gold min-[801px]:hover:bg-gold
                max-[800px]:mt-1.5 max-[800px]:size-auto max-[800px]:justify-start max-[800px]:gap-3 max-[800px]:rounded-xl
                max-[800px]:border-welsh-green/10 max-[800px]:bg-welsh-green/[.04] max-[800px]:p-2.5 max-[800px]:hover:bg-[#e7f0e8]"
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="Follow us on Instagram"
            onClick={onClick}
        >
            <span className="flex items-center justify-center max-[800px]:size-9 max-[800px]:rounded-[10px] max-[800px]:bg-gold">
                <Image
                    src={instagramIcon}
                    alt=""
                    className="size-[18px] invert transition-[filter] duration-200 min-[801px]:group-hover:invert-0 max-[800px]:invert-0"
                    width={18}
                    height={18}
                />
            </span>
            <span className="hidden flex-col leading-tight max-[800px]:flex">
                <span className="text-[13px]">Follow us on Instagram</span>
                <span className="mt-0.5 text-[11px] font-normal text-muted">
                    {INSTAGRAM_HANDLE}
                </span>
            </span>
            <Icon
                name="arrow_outward"
                className="ml-auto mr-1.5 hidden text-lg text-[#d54a3d] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 max-[800px]:inline-block"
            />
        </a>
    );
}
