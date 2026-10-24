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

export const aboutSteps = [
    {
        title: "Discover",
        text: "Find the Welsh producers and products near you.",
    },
    {
        title: "Choose",
        text: "Make food choices that work for you and your budget.",
    },
    {
        title: "Support",
        text: "Help local businesses and communities thrive.",
    },
];

export type MapCategory =
    "Dairy" | "Drinks" | "Bakery" | "Farm" | "Seafood" | "Pantry";

/** Pin colour for each category on the producer map. */
export const mapCategoryColors: Record<MapCategory, string> = {
    Dairy: "#e4d38c",
    Drinks: "#7fb0c4",
    Bakery: "#e8a35f",
    Farm: "#9cc28a",
    Seafood: "#e48b81",
    Pantry: "#c9a3d6",
};

export type MapProducer = {
    name: string;
    category: MapCategory;
    /** What they make, shown as the card's tag. */
    product: string;
    place: string;
    county: string;
    lat: number;
    lng: number;
    description: string;
    link: string;
    /** Producer's own logo, shown on the map card. Initials stand in without one. */
    badge?: StaticImageData;
    /**
     * Nudges the pin this many px from its true spot so producers close
     * together don't sit on top of each other.
     */
    pinOffset?: { x: number; y: number };
};

// Locations are the producer's base (farm, dairy or distillery), rounded to
// roughly village level.
export const mapProducers: MapProducer[] = [
    {
        name: "Halen Môn",
        category: "Pantry",
        product: "Sea salt",
        place: "Brynsiencyn",
        county: "Anglesey",
        lat: 53.173,
        lng: -4.272,
        description:
            "Sea salt harvested from the Menai Strait at the Saltcote, where tours show how sea water becomes salt and finish with a tasting.",
        link: "https://www.halenmon.com/",
    },
    {
        name: "Aber Falls Distillery",
        category: "Drinks",
        product: "Whisky & gin",
        place: "Abergwyngregyn",
        county: "Gwynedd",
        lat: 53.239,
        lng: -4.016,
        description:
            "The first whisky distillery in North Wales for over a century, in an old slate works below the Rhaeadr Fawr waterfall.",
        link: "https://www.aberfallsdistillery.com/",
    },
    {
        name: "Llaeth y Llan",
        category: "Dairy",
        product: "Yogurt",
        place: "Llannefydd",
        county: "Conwy",
        lat: 53.222,
        lng: -3.556,
        description:
            "The Village Dairy: a family farm that has made yogurt from Welsh milk since 1985, now on shelves across Wales.",
        link: "https://villagedairy.co.uk/",
        badge: dairyBadge,
    },
    {
        name: "Purple Moose Brewery",
        category: "Drinks",
        product: "Ale",
        place: "Porthmadog",
        county: "Gwynedd",
        lat: 52.927,
        lng: -4.133,
        description:
            "Bragdy Mws Piws brews award-winning ales like Cwrw Eryri and Glaslyn by the Snowdonia coast.",
        link: "https://purplemoose.co.uk/",
    },
    {
        name: "Rhug Estate",
        category: "Farm",
        product: "Organic meat",
        place: "Corwen",
        county: "Denbighshire",
        lat: 52.987,
        lng: -3.418,
        description:
            "An organic farm since 1998, known for its bison herd, Aberdeen Angus beef and salt marsh lamb, with a farm shop off the A5.",
        link: "https://rhug.co.uk/",
    },
    {
        name: "Radnor Hills",
        category: "Drinks",
        product: "Spring water",
        place: "Knighton",
        county: "Powys",
        lat: 52.343,
        lng: -3.049,
        description:
            "A family-run soft drinks maker bottling spring water from boreholes minutes from its site on the Welsh border.",
        link: "https://www.radnorhills.co.uk/",
    },
    {
        name: "Tregroes Waffles",
        category: "Bakery",
        product: "Toffee waffles",
        place: "Llandysul",
        county: "Ceredigion",
        lat: 52.041,
        lng: -4.309,
        description:
            "Butter toffee sandwiched between thin waffles, baked in the Teifi Valley since 1983 by a bakery its staff own in trust.",
        link: "https://www.tregroeswaffles.co.uk/",
    },
    {
        name: "Caws Cenarth",
        category: "Dairy",
        product: "Cheese",
        place: "Boncath",
        county: "Teifi Valley",
        lat: 52.005,
        lng: -4.568,
        description:
            "Farmhouse Caerffili and the Brie-like Perl Wen from Glyneithinog farm, where you can watch the cheese being made.",
        link: "https://www.cawscenarth.co.uk/",
    },
    {
        name: "Calon Wen",
        category: "Dairy",
        product: "Organic milk",
        place: "Narberth",
        county: "Pembrokeshire",
        lat: 51.8,
        lng: -4.736,
        description:
            "A co-operative of organic dairy farms from across Wales, making milk, butter and cheese since 2000.",
        link: "https://www.calonwen-cymru.com/",
    },
    {
        name: "Coaltown Coffee",
        category: "Drinks",
        product: "Coffee",
        place: "Ammanford",
        county: "Carmarthenshire",
        lat: 51.79,
        lng: -3.993,
        description:
            "Speciality coffee roasted in a converted coal shed, bringing jobs back to a former mining town.",
        link: "https://www.coaltowncoffee.co.uk/",
    },
    {
        name: "Joe’s Ice Cream",
        category: "Dairy",
        product: "Ice cream",
        place: "Swansea",
        county: "Swansea",
        lat: 51.615,
        lng: -3.956,
        description:
            "Swansea’s favourite since 1922, still churning vanilla ice cream to Joe Cascarini’s original recipe.",
        link: "https://www.joes-icecream.com/",
        badge: joesBadge,
        pinOffset: { x: -10, y: -14 },
    },
    {
        name: "Davies Mumbles Bakery",
        category: "Bakery",
        product: "Bakery",
        place: "Mumbles",
        county: "Swansea",
        lat: 51.571,
        lng: -3.997,
        description:
            "A local bakery from our campaign research — a reminder to look for Welsh food on your doorstep.",
        link: "https://www.instagram.com/davies_of_mumbles_/",
        badge: bakeryBadge,
        pinOffset: { x: -4, y: 8 },
    },
    {
        name: "Penderyn Distillery",
        category: "Drinks",
        product: "Whisky",
        place: "Penderyn",
        county: "Rhondda Cynon Taf",
        lat: 51.759,
        lng: -3.531,
        description:
            "Wales’ first modern whisky distillery, on the southern edge of Bannau Brycheiniog, with tours of the stills.",
        link: "https://www.penderyn.wales/",
    },
    {
        name: "Black Mountains Smokery",
        category: "Seafood",
        product: "Smoked fish",
        place: "Crickhowell",
        county: "Powys",
        lat: 51.861,
        lng: -3.14,
        description:
            "A family smokehouse since 1996, oak-smoking salmon, trout, duck and cheese in the Usk valley.",
        link: "https://www.smoked-foods.co.uk/",
    },
    {
        name: "White Castle Vineyard",
        category: "Drinks",
        product: "Wine",
        place: "Llanvetherine",
        county: "Monmouthshire",
        lat: 51.856,
        lng: -2.929,
        description:
            "Award-winning Welsh wines grown on the slopes near Abergavenny, a Decanter gold medallist in 2021.",
        link: "https://www.whitecastlevineyard.com/",
    },
];

/**
 * Towns marked on the producer map to help people find their way. Towns near
 * the coast or border put their label on the left so it stays over land;
 * `nudge` moves the whole marker (dot and name) by that many px, off the
 * coastline or clear of pins.
 */
export const mapTowns: {
    name: string;
    lat: number;
    lng: number;
    label?: "left";
    nudge?: { x: number; y: number };
}[] = [
    { name: "Cardiff", lat: 51.481, lng: -3.179, label: "left" },
    { name: "Aberystwyth", lat: 52.415, lng: -4.082, nudge: { x: 10, y: 0 } },
    { name: "Brecon", lat: 51.947, lng: -3.391, label: "left" },
    { name: "Wrexham", lat: 53.046, lng: -2.993, label: "left" },
    { name: "Carmarthen", lat: 51.856, lng: -4.306 },
    { name: "Swansea", lat: 51.621, lng: -3.944, nudge: { x: 4, y: -10 } },
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
