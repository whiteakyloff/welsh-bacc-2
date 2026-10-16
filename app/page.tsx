"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import logo from "../images/logo.png";
import dragonLogo from "../images/logo_dragon.png";

const instagramUrl = "https://www.instagram.com/eatwelsheatwell/";

const producers = [
    {
        name: "Davies Mumbles Bakery",
        category: "Bakery",
        location: "Mumbles",
        description:
            "A local bakery example from the campaign research — a reminder to look for Welsh food on your doorstep.",
        accent: "bakery",
        link: "https://www.instagram.com/davies_of_mumbles_/",
    },
    {
        name: "Joe’s Ice Cream",
        category: "Treats",
        location: "Swansea",
        description:
            "A much-loved Welsh food name included in the project as an example of a local producer to discover.",
        accent: "icecream",
        link: "https://www.joes-icecream.com/",
    },
    {
        name: "Llaeth y Llan Dairy",
        category: "Dairy",
        location: "North Wales",
        description:
            "Explore Welsh dairy products and make a considered choice that supports local food production.",
        accent: "dairy",
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
    { href: "#about", label: "About" },
    { href: "#discover", label: "Discover food" },
    { href: "#why-welsh", label: "Why Welsh?" },
    { href: "#get-involved", label: "Get involved" },
];

const ease = "ease-[cubic-bezier(0.2,0.8,0.2,1)]";

const bars = [
    { open: "rotate-45", closed: "-translate-y-2.5" },
    { open: "scale-x-50 opacity-0", closed: "" },
    { open: "-rotate-45", closed: "translate-y-2.5" },
];

const labelBase =
    "absolute bg-paper px-[18px] py-[15px] font-display text-xs font-bold leading-[1.15] text-ink " +
    "shadow-[4px_5px_0_#d54a3d] transition-[translate,rotate,box-shadow] duration-300 " +
    "hover:-translate-y-1 hover:shadow-[7px_8px_0_#d54a3d] " +
    "max-[800px]:px-[13px] max-[800px]:py-[11px] max-[800px]:text-[10px]";

export default function Home() {
    const [menuOpen, setMenuOpen] = useState(false);

    const closeMenu = () => setMenuOpen(false);

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
                rootMargin: "0px 0px -40px 0px",
                threshold: 0,
            },
        );

        elements.forEach((element) => observer.observe(element));

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const closeOnEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") setMenuOpen(false);
        };

        document.addEventListener("keydown", closeOnEscape);
        return () => document.removeEventListener("keydown", closeOnEscape);
    }, []);

    return (
        <main className="overflow-x-clip">
            <header className="absolute z-50 flex h-[86px] w-full items-center justify-between px-[5vw] text-white max-[800px]:px-[6vw]">
                <a
                    className="flex items-center gap-2.5 leading-none transition-transform duration-200 hover:-translate-y-0.5"
                    href="#top"
                    onClick={closeMenu}
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
                </a>
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
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={closeMenu}
                            className="opacity-90 transition-all hover:-translate-y-0.5 hover:opacity-100
                                max-[800px]:rounded-xl max-[800px]:p-[13px] max-[800px]:text-[13px]
                                max-[800px]:hover:translate-x-1 max-[800px]:hover:bg-[#e7f0e8]"
                        >
                            {link.label}
                        </a>
                    ))}
                    <a
                        className="rounded-full bg-gold px-[18px] py-3 text-ink transition-all hover:-translate-y-1 hover:bg-[#ffda8a] hover:shadow-lg max-[800px]:mt-2 max-[800px]:rounded-xl max-[800px]:text-center"
                        href={instagramUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={closeMenu}
                    >
                        Follow us <span aria-hidden="true">↗</span>
                    </a>
                </nav>
            </header>

            <section
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
                        <a
                            className="inline-flex items-center gap-5 rounded px-[22px] py-[15px] text-xs font-bold tracking-[.03em] transition-all duration-200 hover:-translate-y-[3px] hover:shadow-lg [&_span]:transition-transform hover:[&_span]:translate-x-1 bg-gold text-ink"
                            href="#discover"
                        >
                            Discover Welsh food <span>↓</span>
                        </a>
                        <a
                            className="text-xs font-bold [&_span]:ml-2 [&_span]:text-[19px] [&_span]:text-[#f1be69] [&_span]:transition-all hover:[&_span]:ml-3.5"
                            href="#about"
                        >
                            Our story <span>→</span>
                        </a>
                    </div>
                    <div className="mt-[30px] flex items-center gap-[13px] text-[11px] leading-normal text-[#bfcec2] max-[800px]:my-[35px] max-[800px]:mb-10 animate-item-in [animation-delay:550ms] [&_strong]:text-white">
                        <span className="animate-pulse-mark text-2xl text-[#e45144]">
                            ✳
                        </span>
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
                        className={`${labelBase} right-[8%] top-[20%] rotate-6 hover:rotate-4 max-[800px]:right-[20%] max-[800px]:top-[17%]`}
                    >
                        <span className="mr-[7px] text-[#d54a3d]">✦</span>{" "}
                        Locally
                        <br />
                        made
                    </div>
                    <div
                        className={`${labelBase} bottom-[32%] left-[8%] -rotate-8 hover:-rotate-6 max-[800px]:bottom-[12%] max-[800px]:left-[20%]`}
                    >
                        <span className="mr-[7px] text-[#d54a3d]">✦</span>{" "}
                        Simply
                        <br />
                        Welsh
                    </div>
                </div>
            </section>

            <section
                data-reveal
                className="mx-auto max-w-[1440px] px-[9vw] py-[100px] max-[1100px]:px-[7vw] max-[800px]:py-[70px] opacity-0 translate-y-6 data-[revealed=true]:opacity-100 data-[revealed=true]:translate-y-0 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)] motion-reduce:opacity-100 motion-reduce:translate-y-0"
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
                        <a
                            className="mt-[15px] inline-block text-xs font-bold text-welsh-green [&_span]:ml-2 [&_span]:text-[19px] [&_span]:text-[#f1be69] hover:[&_span]:ml-3.5"
                            href="#why-welsh"
                        >
                            Why choose Welsh? <span>→</span>
                        </a>
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
                data-reveal
                className="w-full bg-welsh-green text-white px-[9vw] py-[100px] max-[1100px]:px-[7vw] max-[800px]:py-[70px] opacity-0 translate-y-6 data-[revealed=true]:opacity-100 data-[revealed=true]:translate-y-0 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)] motion-reduce:opacity-100 motion-reduce:translate-y-0"
                id="discover"
            >
                <div className="mx-auto flex max-w-[1260px] items-end justify-between gap-10 max-[800px]:block">
                    <div>
                        <div className="text-[10px] font-bold uppercase tracking-[.17em] text-[#f1be69]">
                            02 / Meet the makers
                        </div>
                        <h2 className="mt-5 max-w-[650px] font-display text-[clamp(42px,5vw,68px)] font-normal leading-[.95] tracking-[-.05em] [&_em]:text-[#e45144]">
                            A taste of <em>Wales</em>
                        </h2>
                    </div>
                    <p className="w-[300px] shrink-0 text-[13px] leading-[1.6] text-[#c7d2c7] max-[800px]:mt-[25px] max-[800px]:w-auto">
                        Three Welsh food names from our project research. Start
                        exploring, then look out for more local producers in
                        your area.
                    </p>
                </div>
                <div className="mx-auto mt-[55px] grid max-w-[1260px] grid-cols-3 gap-[19px] max-[1100px]:gap-[14px] max-[800px]:mt-[35px] max-[800px]:grid-cols-1 max-[800px]:gap-5">
                    {producers.map((producer, index) => (
                        <article
                            data-reveal
                            className={`group overflow-hidden rounded-[3px] bg-paper text-ink opacity-0 translate-y-6 data-[revealed=true]:opacity-100 data-[revealed=true]:translate-y-0 transition-[opacity,transform,box-shadow] duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)] hover:-translate-y-2 hover:shadow-[0_18px_30px_rgba(15,43,31,.2)] motion-reduce:opacity-100 motion-reduce:translate-y-0 ${index === 0 ? "delay-[80ms]" : index === 1 ? "delay-[160ms]" : "delay-[240ms]"}`}
                            key={producer.name}
                        >
                            <div
                                className={`relative flex h-[180px] items-center justify-center max-[800px]:h-[145px] ${producer.accent === "bakery" ? "bg-[#e8a35f]" : producer.accent === "icecream" ? "bg-[#e48b81]" : "bg-[#e4d38c]"}`}
                            >
                                <span
                                    className="text-[115px] leading-none text-white/80 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-[5deg]"
                                    aria-hidden="true"
                                >
                                    {producer.accent === "bakery"
                                        ? "✣"
                                        : producer.accent === "icecream"
                                          ? "◒"
                                          : "◌"}
                                </span>
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
                                    className="mt-3 inline-block border-b border-[#c8cfc5] pb-[6px] text-[11px] font-bold [&_span]:ml-3 [&_span]:text-[#d54a3d]"
                                >
                                    Learn more <span>↗</span>
                                </a>
                            </div>
                        </article>
                    ))}
                </div>
                <p className="mx-auto mt-[27px] max-w-[1260px] text-[10px] text-[#aebeaf]">
                    These businesses are examples featured in our project
                    research. Eat Welsh, Eat Well does not imply sponsorship or
                    endorsement.
                </p>
            </section>

            <section
                data-reveal
                className="mx-auto max-w-[1440px] px-[9vw] py-[100px] max-[1100px]:px-[7vw] max-[800px]:py-[70px] opacity-0 translate-y-6 data-[revealed=true]:opacity-100 data-[revealed=true]:translate-y-0 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)] motion-reduce:opacity-100 motion-reduce:translate-y-0"
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
                            className={`group grid grid-cols-[100px_1.1fr_1.3fr_30px] items-center gap-[25px] border-b border-line py-[25px] max-[800px]:grid-cols-[35px_1fr_20px] max-[800px]:gap-[10px] opacity-0 translate-y-6 data-[revealed=true]:opacity-100 data-[revealed=true]:translate-y-0 transition-[opacity,transform,background-color,padding] duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)] hover:bg-welsh-green/5 hover:pl-[14px] motion-reduce:opacity-100 motion-reduce:translate-y-0 ${index === 0 ? "delay-[80ms]" : index === 1 ? "delay-[160ms]" : "delay-[240ms]"}`}
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
                            <span className="mr-3 text-right text-xl text-[#d54a3d] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
                                ↗
                            </span>
                        </div>
                    ))}
                </div>
            </section>

            <section
                data-reveal
                className="bg-[#d95348] text-white opacity-0 translate-y-6 data-[revealed=true]:opacity-100 data-[revealed=true]:translate-y-0 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)] motion-reduce:opacity-100 motion-reduce:translate-y-0"
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
                            <span className="text-xl text-[#f5c978]">✦</span>
                            <strong className="font-display text-xl font-normal">
                                Shop with curiosity
                            </strong>
                            <p className="col-start-2 mt-1.5 text-xs leading-[1.5] text-[#f8d4cc]">
                                Look for Welsh products in local shops and
                                supermarkets.
                            </p>
                        </div>
                        <div className="grid grid-cols-[35px_1fr] border-b border-white/35 py-[19px]">
                            <span className="text-xl text-[#f5c978]">✦</span>
                            <strong className="font-display text-xl font-normal">
                                Keep it balanced
                            </strong>
                            <p className="col-start-2 mt-1.5 text-xs leading-[1.5] text-[#f8d4cc]">
                                Build meals around a mix of foods that suit your
                                lifestyle.
                            </p>
                        </div>
                        <div className="grid grid-cols-[35px_1fr] border-b border-white/35 py-[19px]">
                            <span className="text-xl text-[#f5c978]">✦</span>
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
                data-reveal
                className="grid grid-cols-2 items-center gap-[14%] max-[800px]:grid-cols-1 max-[800px]:gap-[35px] mx-auto max-w-[1440px] px-[9vw] py-[100px] max-[1100px]:px-[7vw] max-[800px]:py-[70px] opacity-0 translate-y-6 data-[revealed=true]:opacity-100 data-[revealed=true]:translate-y-0 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)] motion-reduce:opacity-100 motion-reduce:translate-y-0"
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
                        className="mt-[18px] inline-flex items-center gap-5 rounded px-[22px] py-[15px] text-xs font-bold tracking-[.03em] transition-[transform,background-color,box-shadow] duration-200 ease-out hover:-translate-y-[3px] hover:shadow-lg [&_span]:transition-transform [&_span]:duration-200 hover:[&_span]:translate-x-1 bg-gold text-ink"
                        href={instagramUrl}
                        target="_blank"
                        rel="noreferrer"
                    >
                        Follow @eatwelsheatwell <span>↗</span>
                    </a>
                </div>
                <div className="relative bg-cream p-[45px] before:absolute before:inset-y-0 before:left-0 before:w-[6px] before:bg-[#f1be69] max-[800px]:p-[30px] [&_p]:text-[13px] [&_p]:leading-[1.7] [&_p]:text-muted [&_h3]:my-[14px] [&_h3]:font-display [&_h3]:text-[30px]">
                    <span className="text-[28px] text-[#d54a3d]">✳</span>
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

            <footer className="flex items-center justify-between bg-deep-green px-[9vw] py-10 text-white max-[800px]:block max-[800px]:px-[7vw] max-[800px]:py-[35px]">
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
                <div className="flex gap-[27px] text-[11px] text-[#d4dfd6] max-[800px]:mt-[25px] max-[800px]:flex-wrap">
                    <a href="#about">About</a>
                    <a href="#discover">Discover food</a>
                    <a href={instagramUrl} target="_blank" rel="noreferrer">
                        Instagram ↗
                    </a>
                </div>
                <p className="text-[10px] text-[#9caf9f] max-[800px]:mt-[25px]">
                    © 2026 Eat Welsh, Eat Well
                </p>
            </footer>
        </main>
    );
}