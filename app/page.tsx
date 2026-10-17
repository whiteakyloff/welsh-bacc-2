"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import logo from "../images/logo.png";
import dragonLogo from "../images/logo_dragon.png";
import instagramIcon from "../images/instagram_icon.png";

const instagramUrl = "https://www.instagram.com/eatwelsheatwell/";

const producers = [
    {
        name: "Davies Mumbles Bakery",
        category: "Bakery",
        location: "Mumbles",
        description:
            "A local bakery example from the campaign research — a reminder to look for Welsh food on your doorstep.",
        accent: "bakery",
        icon: "bakery_dining",
        link: "https://www.instagram.com/davies_of_mumbles_/",
    },
    {
        name: "Joe’s Ice Cream",
        category: "Treats",
        location: "Swansea",
        description:
            "A much-loved Welsh food name included in the project as an example of a local producer to discover.",
        accent: "icecream",
        icon: "icecream",
        link: "https://www.joes-icecream.com/",
    },
    {
        name: "Llaeth y Llan Dairy",
        category: "Dairy",
        location: "North Wales",
        description:
            "Explore Welsh dairy products and make a considered choice that supports local food production.",
        accent: "dairy",
        icon: "glass_cup",
        link: "https://villagedairy.co.uk/",
    },
];

const reasons = [
    {
        number: "01",
        title: "Keep local businesses visible",
        text: "Choosing Welsh products helps more people discover the farmers, producers and independent businesses around them.",
    },
    {
        number: "02",
        title: "Make a considered choice",
        text: "Look at labels, compare options and choose food that fits your needs, budget and what is available locally.",
    },
    {
        number: "03",
        title: "Discover more of Wales",
        text: "From bakeries to dairies, local food is a simple way to explore the people and places that make Wales special.",
    },
];

const navLinks = [
    { target: "about", label: "About" },
    { target: "discover", label: "Discover food" },
    { target: "why-welsh", label: "Why Welsh?" },
    { target: "get-involved", label: "Get involved" },
];

function Icon({ name, className = "" }: { name: string; className?: string }) {
    return (
        <span className={`material-symbols-outlined ${className}`} aria-hidden="true">
            {name}
        </span>
    );
}

const ease = "ease-[cubic-bezier(0.2,0.8,0.2,1)]";

// Scroll reveal settings — tweak these to change how sections appear.
const revealSettings = {
    // Positive bottom margin starts the reveal before the element enters the screen.
    rootMargin: "0px 0px 5% 0px",
    threshold: 0,
    duration: 500, // ms
    distance: 16, // px the element slides up from
    stagger: 50, // ms between items in a list (cards, reasons)
    easing: "cubic-bezier(0.2, 0.7, 0.2, 1)",
};

const revealVars = {
    "--reveal-duration": `${revealSettings.duration}ms`,
    "--reveal-distance": `${revealSettings.distance}px`,
    "--reveal-ease": revealSettings.easing,
    "--reveal-delay": "0ms",
} as CSSProperties;

const revealDelay = (index: number) =>
    ({
        "--reveal-delay": `${(index + 1) * revealSettings.stagger}ms`,
    }) as CSSProperties;

const revealBase =
    "opacity-0 translate-y-(--reveal-distance) data-[revealed=true]:opacity-100 data-[revealed=true]:translate-y-0 " +
    "duration-(--reveal-duration) ease-(--reveal-ease) delay-(--reveal-delay) " +
    "motion-reduce:opacity-100 motion-reduce:translate-y-0";

const reveal = `${revealBase} transition-[opacity,translate]`;

const bars = [
    { open: "rotate-45", closed: "-translate-y-1.5" },
    { open: "scale-x-50 opacity-0", closed: "" },
    { open: "-rotate-45", closed: "translate-y-1.5" },
];

const labelBase =
    "absolute bg-paper px-[18px] py-[15px] font-display text-xs font-bold leading-[1.15] text-ink " +
    "shadow-[4px_5px_0_#d54a3d] transition-[translate,rotate,box-shadow] duration-300 " +
    "hover:-translate-y-1 hover:shadow-[7px_8px_0_#d54a3d] " +
    "max-[800px]:px-[13px] max-[800px]:py-[11px] max-[800px]:text-[10px]";

export default function Home() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [pressedLink, setPressedLink] = useState<string | null>(null);
    const pressedTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

    // On touch devices :active ends on release, so hold the pressed look a bit longer.
    const holdPressed = (name: string) => {
        clearTimeout(pressedTimer.current);
        setPressedLink(name);
        pressedTimer.current = setTimeout(() => setPressedLink(null), 2000);
    };

    useEffect(() => () => clearTimeout(pressedTimer.current), []);

    const closeMenu = () => setMenuOpen(false);
    const scrollToSection = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        const elements =
            document.querySelectorAll<HTMLElement>("[data-reveal]");

        const showAll = () => {
            elements.forEach((element) => {
                element.dataset.revealed = "true";
            });
        };

        if (
            window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
            !("IntersectionObserver" in window)
        ) {
            showAll();
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    const element = entry.target as HTMLElement;
                    element.dataset.revealed = "true";
                    observer.unobserve(element);
                });
            },
            {
                root: null,
                rootMargin: revealSettings.rootMargin,
                threshold: revealSettings.threshold,
            },
        );

        elements.forEach((element) => observer.observe(element));

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (window.location.hash) {
            window.history.replaceState(
                null,
                "",
                `${window.location.pathname}${window.location.search}`,
            );
            window.scrollTo(0, 0);
        }
    }, []);

    useEffect(() => {
        const closeOnEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") setMenuOpen(false);
        };

        document.addEventListener("keydown", closeOnEscape);
        return () => document.removeEventListener("keydown", closeOnEscape);
    }, []);

    useEffect(() => {
        const themeColor = document.querySelector<HTMLMetaElement>(
            'meta[name="theme-color"]',
        );
        const sections = Array.from(
            document.querySelectorAll<HTMLElement>("[data-theme-color]"),
        );
        if (!themeColor || sections.length === 0) return;

        let frame = 0;
        const blendColors = (from: string, to: string, amount: number) => {
            const start = from.match(/[\da-f]{2}/gi);
            const end = to.match(/[\da-f]{2}/gi);
            if (!start || !end || start.length < 3 || end.length < 3) return to;

            const channels = start.slice(0, 3).map((channel, index) => {
                const value = Math.round(
                    parseInt(channel, 16) * (1 - amount) +
                        parseInt(end[index], 16) * amount,
                );
                return value.toString(16).padStart(2, "0");
            });
            return `#${channels.join("")}`;
        };

        const updateThemeColor = () => {
            cancelAnimationFrame(frame);
            frame = requestAnimationFrame(() => {
                const boundaryIndex = sections.findIndex(
                    (element) => element.getBoundingClientRect().bottom > 1,
                );
                const section = sections[boundaryIndex];
                const nextSection = sections[boundaryIndex + 1];
                let color = section?.dataset.themeColor;

                if (section && nextSection && color) {
                    const nextColor = nextSection.dataset.themeColor;
                    const distanceToBoundary =
                        section.getBoundingClientRect().bottom;
                    const blendDistance = 24;

                    if (nextColor && distanceToBoundary < blendDistance) {
                        color = blendColors(
                            color,
                            nextColor,
                            1 - Math.max(0, distanceToBoundary) / blendDistance,
                        );
                    }
                }

                if (color && themeColor.content !== color) {
                    themeColor.content = color;
                }
            });
        };

        updateThemeColor();
        window.addEventListener("scroll", updateThemeColor, { passive: true });
        window.addEventListener("resize", updateThemeColor);
        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener("scroll", updateThemeColor);
            window.removeEventListener("resize", updateThemeColor);
        };
    }, []);

    return (
        <main className="overflow-x-clip" style={revealVars}>
            <header className="absolute z-50 flex h-[86px] w-full items-center justify-between px-[5vw] text-white max-[800px]:px-[6vw]">
                <button
                    className="flex cursor-pointer items-center gap-2.5 border-0 bg-transparent p-0 text-left leading-none transition-transform duration-200 hover:-translate-y-0.5"
                    type="button"
                    onClick={() => {
                        closeMenu();
                        scrollToSection("top");
                    }}
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
                </button>
                <button
                    className={`relative hidden size-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/20 p-0
                        transition-[background-color,rotate,border-color] duration-[350ms] ${ease} max-[800px]:flex
                        ${menuOpen ? "rotate-90 bg-gold" : "bg-white/10 hover:bg-white/15"}`}
                    type="button"
                    aria-label={
                        menuOpen
                            ? "Close navigation menu"
                            : "Open navigation menu"
                    }
                    aria-expanded={menuOpen}
                    aria-controls="site-navigation"
                    onClick={() => setMenuOpen((open) => !open)}
                >
                    <span className="sr-only">
                        {menuOpen ? "Close menu" : "Open menu"}
                    </span>
                    {bars.map((bar, i) => (
                        <i
                            key={i}
                            aria-hidden="true"
                            className={`absolute block h-0.5 w-5 origin-center rounded-[2px]
                                transition-[translate,rotate,scale,opacity,background-color] duration-300 ${ease}
                                ${menuOpen ? `bg-ink ${bar.open}` : `bg-white ${bar.closed}`}`}
                        />
                    ))}
                </button>
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
                                ? "max-[800px]:visible max-[800px]:pointer-events-auto max-[800px]:translate-y-0 max-[800px]:scale-100 max-[800px]:opacity-100 max-[800px]:[transition:opacity_.3s_ease,translate_.3s_cubic-bezier(.2,.8,.2,1),scale_.3s_cubic-bezier(.2,.8,.2,1),visibility_0s_linear_0s]"
                                : "max-[800px]:invisible max-[800px]:pointer-events-none max-[800px]:-translate-y-3 max-[800px]:scale-[.97] max-[800px]:opacity-0 max-[800px]:[transition:opacity_.3s_ease,translate_.3s_cubic-bezier(.2,.8,.2,1),scale_.3s_cubic-bezier(.2,.8,.2,1),visibility_0s_linear_.3s]"
                        }`}
                >
                    {navLinks.map((link) => (
                        <button
                            key={link.target}
                            type="button"
                            onClick={() => {
                                closeMenu();
                                scrollToSection(link.target);
                            }}
                            className="cursor-pointer border-0 bg-transparent p-0 text-left opacity-90 transition-all hover:-translate-y-0.5 hover:opacity-100
                                max-[800px]:rounded-xl max-[800px]:p-[13px] max-[800px]:text-[13px]
                                max-[800px]:hover:translate-x-1 max-[800px]:hover:bg-[#e7f0e8]"
                        >
                            {link.label}
                        </button>
                    ))}
                    <a
                        className="group flex size-10 items-center justify-center rounded-full border border-gold/50 transition-all duration-200
                            min-[801px]:hover:border-gold min-[801px]:hover:bg-gold
                            max-[800px]:mt-1.5 max-[800px]:size-auto max-[800px]:justify-start max-[800px]:gap-3 max-[800px]:rounded-xl
                            max-[800px]:border-welsh-green/10 max-[800px]:bg-welsh-green/[.04] max-[800px]:p-2.5 max-[800px]:hover:bg-[#e7f0e8]"
                        href={instagramUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Follow us on Instagram"
                        onClick={closeMenu}
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
                                @eatwelsheatwell
                            </span>
                        </span>
                        <Icon
                            name="arrow_outward"
                            className="ml-auto mr-1.5 hidden text-lg text-[#d54a3d] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 max-[800px]:inline-block"
                        />
                    </a>
                </nav>
            </header>

            <section
                data-theme-color="#173b2d"
                className="relative flex min-h-[720px] overflow-hidden bg-deep-green px-[9vw] pb-20 pt-[150px] text-white max-[1100px]:min-h-[650px] max-[1100px]:px-[7vw] max-[800px]:min-h-0 max-[800px]:flex-col max-[800px]:pb-[55px] max-[800px]:pt-[130px]"
                id="top"
            >
                <div className="relative z-10 w-[48%] max-w-[610px] animate-rise-in max-[1100px]:w-[52%] max-[800px]:w-full">
                    <p className="text-[10px] font-bold uppercase tracking-[.17em] text-[#f1be69] animate-item-in [animation-delay:80ms]">
                        <span className="mr-3 inline-block h-px w-9 align-middle bg-[#f1be69]" />{" "}
                        A campaign for local food
                    </p>
                    <h1 className="my-[30px] mb-[25px] font-display text-[clamp(50px,7vw,92px)] font-normal leading-[.98] tracking-[-.05em] animate-item-in [animation-delay:180ms] max-[800px]:text-[clamp(47px,14vw,75px)] [&_em]:text-[#e45144]">
                        Good food.
                        <br />
                        <em>Good neighbours.</em>
                        <br />
                        Good Wales.
                    </h1>
                    <p className="max-w-[400px] text-base leading-[1.7] text-[#d4dfd6] max-[800px]:max-w-[330px] animate-item-in [animation-delay:300ms]">
                        Discover the people and produce behind Welsh food.
                        Choose local where you can, eat well and help Welsh
                        businesses grow.
                    </p>
                    <div className="mt-[35px] flex items-center gap-[25px] max-[800px]:flex-wrap max-[800px]:gap-[18px_24px] animate-item-in [animation-delay:420ms]">
                        <button
                            className="inline-flex cursor-pointer items-center gap-5 rounded border-0 px-[22px] py-[15px] text-xs font-bold tracking-[.03em] transition-all duration-200 hover:-translate-y-[3px] hover:shadow-lg [&_span]:transition-transform hover:[&_span]:translate-y-1 bg-gold text-ink"
                            type="button"
                            onClick={() => scrollToSection("discover")}
                        >
                            Discover Welsh food <Icon name="arrow_downward" />
                        </button>
                        <button
                            className="cursor-pointer border-0 bg-transparent p-0 text-xs font-bold [&_span]:ml-2 [&_span]:text-[19px] [&_span]:text-[#f1be69] [&_span]:transition-all hover:[&_span]:ml-3.5"
                            type="button"
                            onClick={() => scrollToSection("about")}
                        >
                            Our story <Icon name="arrow_forward" />
                        </button>
                    </div>
                    <div className="mt-[30px] flex items-center gap-[13px] text-[11px] leading-normal text-[#bfcec2] max-[800px]:my-[35px] max-[800px]:mb-10 animate-item-in [animation-delay:550ms] [&_strong]:text-white">
                        <Icon name="asterisk" className="animate-pulse-mark text-2xl text-[#e45144]" />
                        <p>
                            <strong>Small choices add up.</strong>
                            <br />
                            Start with one Welsh product this week.
                        </p>
                    </div>
                </div>
                <div
                    className="absolute right-[-1%] top-[15%] h-[88%] w-[52%] animate-art-in max-[800px]:relative max-[800px]:right-auto max-[800px]:top-auto max-[800px]:mx-[-4vw] max-[800px]:mb-[-55px] max-[800px]:mt-[35px] max-[800px]:h-[350px] max-[800px]:w-[calc(100%+8vw)] max-[800px]:shrink-0"
                    aria-label="Illustration of a Welsh dragon and fresh local produce"
                >
                    <div className="absolute left-[calc(50%-175px)] top-[21%] h-[350px] w-[350px] animate-sun-breathe rounded-full bg-[#edbd68] opacity-90 max-[1100px]:h-[310px] max-[1100px]:w-[310px] max-[1100px]:left-[calc(50%-155px)] max-[800px]:left-[calc(50%-122px)] max-[800px]:top-[17%] max-[800px]:h-[245px] max-[800px]:w-[245px]" />
                    <div className="absolute left-1/2 top-[43%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#f5c978]/30 max-[800px]:translate-x-0 max-[800px]:translate-y-0 h-[480px] w-[480px] max-[1100px]:h-[420px] max-[1100px]:w-[420px] max-[800px]:left-[calc(50%-175px)] max-[800px]:top-0 max-[800px]:h-[350px] max-[800px]:w-[350px]" />
                    <div className="absolute left-1/2 top-[43%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#f5c978]/30 max-[800px]:translate-x-0 max-[800px]:translate-y-0 h-[600px] w-[600px] max-[1100px]:h-[520px] max-[1100px]:w-[520px] max-[800px]:left-[calc(50%-217px)] max-[800px]:top-[-12%] max-[800px]:h-[435px] max-[800px]:w-[435px]" />
                    <Image
                        className="absolute left-[calc(50%-190px)] top-[18%] h-[380px] w-[380px] animate-dragon-float object-contain drop-shadow-[15px_21px_0_rgba(17,47,34,.3)] max-[1100px]:left-[calc(50%-165px)] max-[1100px]:h-[330px] max-[1100px]:w-[330px] max-[800px]:left-[calc(50%-135px)] max-[800px]:top-[12%] max-[800px]:h-[270px] max-[800px]:w-[270px]"
                        src={dragonLogo}
                        alt=""
                        width={500}
                        height={500}
                    />
                    <div
                        className={`${labelBase} right-[8%] top-[20%] rotate-6 hover:rotate-4 max-[800px]:top-[17%]`}
                    >
                        <Icon name="star_shine" className="mr-[7px] text-[#d54a3d]" />{" "}
                        Locally
                        <br />
                        made
                    </div>
                    <div
                        className={`${labelBase} bottom-[32%] left-[8%] -rotate-8 hover:-rotate-6 max-[800px]:bottom-[12%]`}
                    >
                        <Icon name="star_shine" className="mr-[7px] text-[#d54a3d]" />{" "}
                        Simply
                        <br />
                        Welsh
                    </div>
                </div>
            </section>

            <section
                data-theme-color="#fffcf6"
                data-reveal
                className={`mx-auto max-w-[1440px] px-[9vw] py-[100px] max-[1100px]:px-[7vw] max-[800px]:py-[70px] ${reveal}`}
                id="about"
            >
                <div className="text-[10px] font-bold uppercase tracking-[.17em] text-[#f1be69]">
                    01 / The idea
                </div>
                <div className="mt-[35px] grid grid-cols-2 gap-[12%] max-[800px]:mt-[25px] max-[800px]:grid-cols-1 max-[800px]:gap-[35px]">
                    <h2 className="font-display text-[clamp(40px,5vw,65px)] font-normal leading-[.98] tracking-[-.05em] [&_em]:text-[#e45144]">
                        Food is more than
                        <br />
                        <em>what’s on your plate.</em>
                    </h2>
                    <div>
                        <p className="!mt-0 font-display !text-[21px] !leading-[1.45] !text-ink">
                            Eat Welsh, Eat Well encourages people in Wales to
                            buy locally produced food more often and make
                            healthier, informed choices.
                        </p>
                        <p className="mt-0 max-w-[480px] text-[15px] leading-[1.75] text-muted">
                            It is a campaign about noticing what is around us:
                            the farmers, food producers and local businesses
                            that bring Welsh food to our tables. Through digital
                            content, community activity and this website, we
                            want to make discovering local food feel easy and
                            welcoming.
                        </p>
                        <button
                            className="mt-[15px] inline-block cursor-pointer border-0 bg-transparent p-0 text-xs font-bold text-welsh-green [&_span]:ml-2 [&_span]:text-[19px] [&_span]:inline-block [&_span]:text-[#f1be69] [&_span]:transition-transform [&_span]:duration-200 [&_span]:ease-out hover:[&_span]:translate-x-1.5"
                            type="button"
                            onClick={() => scrollToSection("why-welsh")}
                        >
                            Why choose Welsh? <Icon name="arrow_forward" />
                        </button>
                    </div>
                </div>
                <div className="mt-[76px] grid grid-cols-3 gap-[4%] border-t border-line pt-[22px] max-[800px]:mt-[50px] max-[800px]:gap-[18px] [&_strong]:my-[13px] [&_strong]:block [&_strong]:font-display [&_strong]:text-2xl [&_strong]:font-normal [&_span]:text-[11px] [&_span]:text-[#d54a3d] [&_p]:max-w-[180px] [&_p]:text-xs [&_p]:leading-normal [&_p]:text-muted">
                    <div>
                        <span>01</span>
                        <strong>Discover</strong>
                        <p>Find the Welsh producers and products near you.</p>
                    </div>
                    <div>
                        <span>02</span>
                        <strong>Choose</strong>
                        <p>
                            Make food choices that work for you and your budget.
                        </p>
                    </div>
                    <div>
                        <span>03</span>
                        <strong>Support</strong>
                        <p>Help local businesses and communities thrive.</p>
                    </div>
                </div>
            </section>

            <section
                data-theme-color="#244936"
                className="w-full bg-welsh-green text-white px-[9vw] py-[100px] max-[1100px]:px-[7vw] max-[800px]:py-[70px]"
                id="discover"
            >
                <div
                    data-reveal
                    className={`mx-auto max-w-[1260px] text-[10px] font-bold uppercase tracking-[.17em] text-[#f1be69] ${reveal}`}
                >
                    02 / Meet the makers
                </div>
                <div
                    data-reveal
                    className={`mx-auto mt-5 flex max-w-[1260px] items-end justify-between gap-10 max-[800px]:block ${reveal}`}
                >
                    <h2 className="max-w-[650px] font-display text-[clamp(42px,5vw,68px)] font-normal leading-[.95] tracking-[-.05em] [&_em]:text-[#e45144]">
                        A taste of <em>Wales</em>
                    </h2>
                    <p className="w-[300px] shrink-0 text-[13px] leading-[1.6] text-[#c7d2c7] max-[800px]:mt-[25px] max-[800px]:w-auto">
                        Three Welsh food names from our project research. Start
                        exploring, then look out for more local producers in
                        your area.
                    </p>
                </div>
                <div className="mx-auto mt-[55px] grid max-w-[1260px] grid-cols-3 gap-[19px] max-[1100px]:gap-[14px] max-[800px]:mt-[35px] max-[800px]:grid-cols-1 max-[800px]:gap-5">
                    {producers.map((producer, index) => (
                        <div
                            data-reveal
                            className={reveal}
                            style={revealDelay(index)}
                            key={producer.name}
                        >
                        <article className="group h-full overflow-hidden rounded-[3px] bg-paper text-ink transition-[translate,box-shadow] duration-[350ms] ease-in-out hover:-translate-y-2 hover:shadow-[0_18px_30px_rgba(15,43,31,.2)]">
                            <div
                                className={`relative flex h-[180px] items-center justify-center max-[800px]:h-[145px] ${producer.accent === "bakery" ? "bg-[#e8a35f]" : producer.accent === "icecream" ? "bg-[#e48b81]" : "bg-[#e4d38c]"}`}
                            >
                                <Icon
                                    name={producer.icon}
                                    className="text-[115px] leading-none text-white/80 transition-transform duration-[450ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-[1.08] group-hover:-rotate-[5deg]"
                                    />
                                <span className="absolute bottom-[14px] left-[17px] bg-white/85 px-[9px] py-[6px] text-[9px] font-bold uppercase tracking-[.1em] text-ink">
                                    {producer.category}
                                </span>
                            </div>
                            <div className="px-[23px] pb-[26px] pt-[23px] max-[1100px]:px-[18px] max-[1100px]:pb-[23px] [&_h3]:mb-3 [&_h3]:font-display [&_h3]:text-[25px] [&_p:not(:first-child)]:text-xs [&_p:not(:first-child)]:leading-[1.6]">
                                <p className="mb-[11px] text-[10px] font-bold uppercase tracking-[.14em] text-[#9a6f4b]">
                                    {producer.location}
                                </p>
                                <h3 className="font-display text-[24px] font-normal">
                                    {producer.name}
                                </h3>
                                <p>{producer.description}</p>
                                <a
                                    href={producer.link}
                                    target="_blank"
                                    rel="noreferrer"
                                    data-pressed={pressedLink === producer.name || undefined}
                                    onPointerDown={(event) => {
                                        if (event.pointerType === "touch") holdPressed(producer.name);
                                    }}
                                    className="relative mt-4 inline-flex items-center gap-2 pb-[7px] text-xs font-bold tracking-[.03em] text-welsh-green transition-[scale,color] duration-150 ease-out active:scale-[0.96] active:text-[#d54a3d] active:duration-75 active:before:h-[3px] active:before:scale-x-100 active:before:duration-75 active:[&_span]:translate-x-1 active:[&_span]:-translate-y-1 active:[&_span]:duration-75 data-pressed:scale-[0.96] data-pressed:text-[#d54a3d] data-pressed:duration-75 data-pressed:before:h-[3px] data-pressed:before:scale-x-100 data-pressed:before:duration-75 data-pressed:[&_span]:translate-x-1 data-pressed:[&_span]:-translate-y-1 data-pressed:[&_span]:duration-75 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-[#c8cfc5] before:absolute before:bottom-0 before:left-0 before:z-10 before:h-0.5 before:w-full before:origin-left before:scale-x-0 before:bg-[#d54a3d] before:transition-transform before:duration-300 before:ease-out group-hover:before:scale-x-100 [&_span]:inline-block [&_span]:text-[15px] [&_span]:text-[#d54a3d] [&_span]:transition-transform [&_span]:duration-300 [&_span]:ease-out group-hover:[&_span]:translate-x-0.5 group-hover:[&_span]:-translate-y-0.5"
                                >
                                    Learn more <Icon name="arrow_outward" />
                                </a>
                            </div>
                        </article>
                        </div>
                    ))}
                </div>
                <p
                    data-reveal
                    className={`mx-auto mt-[27px] max-w-[1260px] text-[10px] text-[#aebeaf] ${reveal}`}
                >
                    These businesses are examples featured in our project
                    research. Eat Welsh, Eat Well does not imply sponsorship or
                    endorsement.
                </p>
            </section>

            <section
                data-theme-color="#fffcf6"
                data-reveal
                className={`mx-auto max-w-[1440px] px-[9vw] py-[100px] max-[1100px]:px-[7vw] max-[800px]:py-[70px] ${reveal}`}
                id="why-welsh"
            >
                <div className="text-[10px] font-bold uppercase tracking-[.17em] text-[#f1be69]">
                    03 / The difference
                </div>
                <div className="mt-[30px] flex items-end justify-between gap-10 max-[800px]:block">
                    <h2 className="max-w-[520px] font-display text-[clamp(42px,5vw,68px)] font-normal leading-[.95] tracking-[-.05em] [&_em]:text-[#e45144]">
                        Why choose
                        <br />
                        <em>Welsh?</em>
                    </h2>
                    <p className="w-[315px] shrink-0 text-[15px] leading-[1.75] text-muted max-[800px]:mt-[25px] max-[800px]:w-auto">
                        There is no one perfect way to eat well. A good place to
                        start is with small, realistic choices that connect you
                        to your local food community.
                    </p>
                </div>
                <div className="mt-[70px] border-t border-line max-[800px]:mt-10">
                    {reasons.map((reason, index) => (
                        <div
                            data-reveal
                            className={`group grid grid-cols-[100px_1.1fr_1.3fr_30px] items-center gap-[25px] border-b border-line py-[25px] max-[800px]:grid-cols-[35px_1fr_20px] max-[800px]:gap-[10px] ${revealBase} transition-[opacity,translate,background-color,padding] hover:bg-welsh-green/5 hover:pl-[14px]`}
                            style={revealDelay(index)}
                            key={reason.number}
                        >
                            <span className="text-xs text-[#d54a3d]">
                                {reason.number}
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

            <section
                data-theme-color="#d95348"
                data-reveal
                className={`bg-[#d95348] text-white ${reveal}`}
            >
                <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-[14%] px-[9vw] py-[88px] max-[1100px]:gap-[8%] max-[1100px]:px-[7vw] max-[800px]:grid-cols-1 max-[800px]:gap-[45px] max-[800px]:py-[70px]">
                    <div>
                        <div className="text-[10px] font-bold uppercase tracking-[.17em] text-[#f1be69]">
                            04 / Eat well
                        </div>
                        <h2 className="mt-5 font-display text-[clamp(40px,5vw,65px)] font-normal leading-[.98] tracking-[-.05em] [&_em]:text-[#f5c978]">
                            Healthy choices
                            <br />
                            <em>made simple.</em>
                        </h2>
                        <p className="mt-[25px] max-w-[400px] text-sm leading-[1.7] text-[#f8d4cc]">
                            Try adding one more seasonal ingredient, checking
                            the label, or cooking with someone you love. Eating
                            well can be practical, personal and enjoyable.
                        </p>
                    </div>
                    <div className="border-t border-white/35">
                        <div className="grid grid-cols-[35px_1fr] border-b border-white/35 py-[19px]">
                            <Icon name="star_shine" className="text-xl text-[#f5c978]" />
                            <strong className="font-display text-xl font-normal">
                                Shop with curiosity
                            </strong>
                            <p className="col-start-2 mt-1.5 text-xs leading-[1.5] text-[#f8d4cc]">
                                Look for Welsh products in local shops and
                                supermarkets.
                            </p>
                        </div>
                        <div className="grid grid-cols-[35px_1fr] border-b border-white/35 py-[19px]">
                            <Icon name="star_shine" className="text-xl text-[#f5c978]" />
                            <strong className="font-display text-xl font-normal">
                                Keep it balanced
                            </strong>
                            <p className="col-start-2 mt-1.5 text-xs leading-[1.5] text-[#f8d4cc]">
                                Build meals around a mix of foods that suit your
                                lifestyle.
                            </p>
                        </div>
                        <div className="grid grid-cols-[35px_1fr] border-b border-white/35 py-[19px]">
                            <Icon name="star_shine" className="text-xl text-[#f5c978]" />
                            <strong className="font-display text-xl font-normal">
                                Make it affordable
                            </strong>
                            <p className="col-start-2 mt-1.5 text-xs leading-[1.5] text-[#f8d4cc]">
                                Compare prices and choose seasonal options when
                                they work for you.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section
                data-theme-color="#fffcf6"
                data-reveal
                className={`grid grid-cols-2 items-center gap-[14%] max-[800px]:grid-cols-1 max-[800px]:gap-[35px] mx-auto max-w-[1440px] px-[9vw] py-[100px] max-[1100px]:px-[7vw] max-[800px]:py-[70px] ${reveal}`}
                id="get-involved"
            >
                <div>
                    <div className="text-[10px] font-bold uppercase tracking-[.17em] text-[#f1be69]">
                        05 / Your next step
                    </div>
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
                        href={instagramUrl}
                        target="_blank"
                        rel="noreferrer"
                    >
                        Follow Us! <Icon name="arrow_outward" />
                    </a>
                </div>
                <div className="relative bg-cream p-[45px] before:absolute before:inset-y-0 before:left-0 before:w-[6px] before:bg-[#f1be69] max-[800px]:p-[30px] [&_p]:text-[13px] [&_p]:leading-[1.7] [&_p]:text-muted [&_h3]:my-[14px] [&_h3]:font-display [&_h3]:text-[30px]">
                    <Icon name="asterisk" className="animate-pulse-mark text-[28px] text-[#d54a3d]" />
                    <p className="mt-[27px] text-[10px] font-bold uppercase tracking-[.17em] text-[#9a6f4b]">
                        A future idea
                    </p>
                    <h3 className="font-display text-[24px] font-normal">
                        A Welsh food festival
                    </h3>
                    <p>
                        A possible family-friendly festival could bring Welsh
                        producers, food and community together. It is an idea
                        for the future, dependent on funding, volunteers and
                        support.
                    </p>
                    <span className="mt-7 block h-[2px] w-[45px] bg-[#d54a3d]" />
                </div>
            </section>

            <footer data-theme-color="#173b2d" className="flex items-center justify-between bg-deep-green px-[9vw] py-10 text-white max-[800px]:block max-[800px]:px-[7vw] max-[800px]:py-[35px]">
                <div className="flex items-center gap-[13px]">
                    <Image
                        src={logo}
                        alt=""
                        width={72}
                        height={72}
                    />
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
        </main>
    );
}
