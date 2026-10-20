import type { StaticImageData } from "next/image";
import bakeryBadge from "@/images/bakery-badge.webp";
import dairyBadge from "@/images/dairy-badge.webp";
import joesBadge from "@/images/joes-badge.webp";

// Copy and data shown on the page. Edit text here rather than in the components.

export const INSTAGRAM_URL = "https://www.instagram.com/eatwelsheatwell/";
export const INSTAGRAM_HANDLE = "@eatwelsheatwell";

export type SectionId =
    "top" | "about" | "discover" | "why-welsh" | "get-involved";

export const navLinks: { target: SectionId; label: string }[] = [
    { target: "about", label: "About" },
    { target: "discover", label: "Discover food" },
    { target: "why-welsh", label: "Why Welsh?" },
    { target: "get-involved", label: "Get involved" },
];

export type AboutStep = {
    title: string;
    text: string;
    /** Tailwind background class for the step's card in the mobile stack. */
    accentClassName: string;
};

export const aboutSteps: AboutStep[] = [
    {
        title: "Discover",
        text: "Find the Welsh producers and products near you.",
        accentClassName: "max-[800px]:bg-deep-green",
    },
    {
        title: "Choose",
        text: "Make food choices that work for you and your budget.",
        accentClassName: "max-[800px]:bg-[#2f5a6e]",
    },
    {
        title: "Support",
        text: "Help local businesses and communities thrive.",
        accentClassName: "max-[800px]:bg-[#d95348]",
    },
];

export type Producer = {
    name: string;
    category: string;
    location: string;
    description: string;
    /** Tailwind background class for the card's illustration panel. */
    accentClassName: string;
    /** Producer's own badge, shown on the card's illustration panel. */
    badge: StaticImageData;
    link: string;
};

export const producers: Producer[] = [
    {
        name: "Davies Mumbles Bakery",
        category: "Bakery",
        location: "Mumbles",
        description:
            "A local bakery example from the campaign research — a reminder to look for Welsh food on your doorstep.",
        accentClassName: "bg-[#e8a35f]",
        badge: bakeryBadge,
        link: "https://www.instagram.com/davies_of_mumbles_/",
    },
    {
        name: "Joe’s Ice Cream",
        category: "Treats",
        location: "Swansea",
        description:
            "A much-loved Welsh food name included in the project as an example of a local producer to discover.",
        accentClassName: "bg-[#e48b81]",
        badge: joesBadge,
        link: "https://www.joes-icecream.com/",
    },
    {
        name: "Llaeth y Llan Dairy",
        category: "Dairy",
        location: "North Wales",
        description:
            "Explore Welsh dairy products and make a considered choice that supports local food production.",
        accentClassName: "bg-[#e4d38c]",
        badge: dairyBadge,
        link: "https://villagedairy.co.uk/",
    },
];

export const reasons = [
    {
        title: "Keep local businesses visible",
        text: "Choosing Welsh products helps more people discover the farmers, producers and independent businesses around them.",
    },
    {
        title: "Make a considered choice",
        text: "Look at labels, compare options and choose food that fits your needs, budget and what is available locally.",
    },
    {
        title: "Discover more of Wales",
        text: "From bakeries to dairies, local food is a simple way to explore the people and places that make Wales special.",
    },
];

export const eatWellTips = [
    {
        title: "Shop with curiosity",
        text: "Look for Welsh products in local shops and supermarkets.",
    },
    {
        title: "Keep it balanced",
        text: "Build meals around a mix of foods that suit your lifestyle.",
    },
    {
        title: "Make it affordable",
        text: "Compare prices and choose seasonal options when they work for you.",
    },
];
