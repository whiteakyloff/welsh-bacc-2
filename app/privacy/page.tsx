import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { CookieSettingsButton } from "@/components/analytics/CookieSettingsButton";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from "@/lib/content";
import { inlineImage } from "@/lib/inlineImage";

export const metadata: Metadata = {
    title: "Privacy policy / Eat Welsh, Eat Well",
    description:
        "How Eat Welsh, Eat Well uses Microsoft Clarity analytics and cookies, and the choices you have.",
};

const LAST_UPDATED = "24 October 2026";

const logoSrc = inlineImage("logo-header.webp");

// Cookies Clarity sets once analytics are accepted, from Microsoft's Clarity
// cookie documentation.
const clarityCookies = [
    {
        name: "_clck",
        purpose:
            "Keeps your Clarity user ID and settings for this site, so return visits count as the same visitor.",
    },
    {
        name: "_clsk",
        purpose: "Joins the pages you view in one visit into a single session.",
    },
    {
        name: "CLID",
        purpose:
            "Records when Clarity first saw this browser on any site that uses it.",
    },
    {
        name: "MUID",
        purpose:
            "Microsoft’s browser ID, used across Microsoft sites for analytics, advertising and other operations.",
    },
    {
        name: "ANONCHK, MR, SM",
        purpose:
            "Microsoft cookies that keep MUID up to date and in sync. Clarity doesn’t use them for advertising.",
    },
];

export default function PrivacyPage() {
    return (
        <main className="flex-1 bg-paper">
            <header
                id="top"
                className="bg-deep-green px-[9vw] pb-[70px] pt-[34px] text-white max-[1100px]:px-[7vw] max-[800px]:pb-[50px]"
            >
                <div className="mx-auto flex max-w-[1260px] items-center justify-between gap-6">
                    <Link
                        href="/"
                        className="flex items-center gap-2.5 leading-none"
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element -- data URI, nothing for next/image to optimize */}
                        <img
                            src={logoSrc}
                            alt=""
                            width={145}
                            height={160}
                            className="size-[52px] object-contain"
                        />
                        <span>
                            <strong className="block font-display text-[19px]">
                                Eat Welsh
                            </strong>
                            <small className="mt-[5px] block text-[9px] uppercase tracking-[3px] text-[#f1be69]">
                                Eat Well
                            </small>
                        </span>
                    </Link>
                    <Link
                        href="/"
                        className="text-xs font-bold tracking-[.03em] opacity-90 transition-[opacity,translate] hover:-translate-x-0.5 hover:opacity-100 [&_span]:mr-2 [&_span]:text-[#f1be69]"
                    >
                        <Icon name="arrow_back" />
                        Back to the site
                    </Link>
                </div>
                <div className="mx-auto mt-[80px] max-w-[1260px] max-[800px]:mt-[55px]">
                    <Eyebrow>Your data</Eyebrow>
                    <h1 className="mt-5 font-display text-[clamp(46px,6vw,80px)] font-normal leading-[.95] tracking-[-.05em] [&_em]:text-[#e45144]">
                        Privacy <em>policy.</em>
                    </h1>
                    <p className="mt-6 text-xs text-[#b9c9bc]">
                        Last updated {LAST_UPDATED}
                    </p>
                </div>
            </header>

            <article className="mx-auto max-w-[1260px] px-[9vw] py-[80px] max-[1100px]:px-[7vw] max-[800px]:py-[55px] min-[1400px]:px-0">
                <div className="grid grid-cols-[260px_minmax(0,720px)] gap-[8%] max-[900px]:grid-cols-1 max-[900px]:gap-10">
                    <aside className="self-start bg-cream p-6 before:mb-4 before:block before:h-[3px] before:w-10 before:bg-[#d54a3d] min-[901px]:sticky min-[901px]:top-8">
                        <p className="font-display text-[21px] leading-tight">
                            The short version
                        </p>
                        <ul className="mt-4 space-y-3 text-[13px] leading-[1.6] text-muted [&_li]:pl-4 [&_li]:-indent-4 [&_li]:before:mr-2 [&_li]:before:text-[#d54a3d] [&_li]:before:content-['✦']">
                            <li>No accounts, forms or newsletters.</li>
                            <li>
                                Analytics only run if you click “Accept
                                analytics”.
                            </li>
                            <li>We never sell your data.</li>
                            <li>You can change your choice at any time.</li>
                        </ul>
                        <CookieSettingsButton className="mt-5 cursor-pointer rounded border-0 bg-gold px-4 py-[11px] text-xs font-bold tracking-[.03em] text-ink transition-[translate,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-md">
                            Change cookie settings
                        </CookieSettingsButton>
                    </aside>

                    <div className="text-[15px] leading-[1.75] text-muted [&_a]:font-bold [&_a]:text-welsh-green [&_a]:underline [&_a]:decoration-[#c8cfc5] [&_a]:underline-offset-[3px] [&_a:hover]:decoration-[#d54a3d] [&_strong]:text-ink">
                        <Section title="Who we are">
                            <p>
                                Eat Welsh, Eat Well is a campaign encouraging
                                people in Wales to buy local food and make
                                informed choices. In this policy, “we” and “us”
                                means the team behind the campaign, who are
                                responsible for this website.
                            </p>
                            <p>
                                For anything about your data, message us on
                                Instagram at{" "}
                                <a
                                    href={INSTAGRAM_URL}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    {INSTAGRAM_HANDLE}
                                </a>
                                .
                            </p>
                        </Section>

                        <Section title="What we collect">
                            <p>
                                You can use this site without telling us
                                anything about yourself. There are no accounts,
                                sign-up forms or comment boxes.
                            </p>
                            <p>
                                <strong>If you accept analytics cookies</strong>
                                , we use{" "}
                                <a
                                    href="https://clarity.microsoft.com/"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Microsoft Clarity
                                </a>{" "}
                                to understand how the site is used. Clarity
                                records:
                            </p>
                            <ul className="list-disc space-y-1.5 pl-5 marker:text-[#d54a3d]">
                                <li>
                                    the pages you visit and how long you stay;
                                </li>
                                <li>
                                    clicks, taps, scrolling and mouse movement,
                                    used for heatmaps and session replays;
                                </li>
                                <li>
                                    your device type, browser, operating system
                                    and screen size;
                                </li>
                                <li>
                                    your approximate location (country or
                                    region), worked out from your IP address;
                                </li>
                                <li>the site that linked you here.</li>
                            </ul>
                            <p>
                                Clarity hides text typed into fields and other
                                sensitive content by default. We can’t identify
                                you by name from this data, and we don’t try to.
                            </p>
                            <p>
                                If you choose “No thanks”, Clarity doesn’t load
                                at all and none of the above is collected.
                            </p>
                        </Section>

                        <Section title="Why we use it">
                            <p>
                                Analytics show us which parts of the site people
                                find useful and where they get stuck, so we can
                                make it easier to discover Welsh food. We don’t
                                use it for advertising.
                            </p>
                            <p>
                                Our legal basis is your <strong>consent</strong>{" "}
                                (UK GDPR Article 6(1)(a), and the Privacy and
                                Electronic Communications Regulations for
                                cookies). You can withdraw it at any time, and
                                withdrawing doesn’t affect what was collected
                                before.
                            </p>
                        </Section>

                        <Section title="Cookies and local storage">
                            <p>
                                We save your cookie choice in your browser’s
                                local storage (as{" "}
                                <code className="text-[13px] text-ink">
                                    eat-welsh-analytics-consent
                                </code>
                                ) so we don’t ask on every visit. This is needed
                                for the site to respect your choice and stays
                                until you clear it.
                            </p>
                            <p>
                                If you accept analytics, Clarity sets these
                                cookies:
                            </p>
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[420px] border-collapse text-left text-[13px] leading-normal">
                                    <thead>
                                        <tr className="border-b-2 border-ink text-[10px] uppercase tracking-[.14em] text-ink">
                                            <th className="py-3 pr-4 font-bold">
                                                Cookie
                                            </th>
                                            <th className="py-3 font-bold">
                                                Purpose
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {clarityCookies.map((cookie) => (
                                            <tr
                                                key={cookie.name}
                                                className="border-b border-line align-top"
                                            >
                                                <td className="whitespace-nowrap py-3 pr-4 font-bold text-ink">
                                                    {cookie.name}
                                                </td>
                                                <td className="py-3">
                                                    {cookie.purpose}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <p>
                                How long each cookie lasts is set by Microsoft;
                                see the{" "}
                                <a
                                    href="https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-cookies"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Clarity cookie documentation
                                </a>{" "}
                                for the current list.
                            </p>
                        </Section>

                        <Section title="Who else handles data">
                            <p>
                                <strong>Microsoft</strong> runs Clarity and
                                stores its data on Microsoft servers, which may
                                be outside the UK, including in the United
                                States. Microsoft protects these transfers with
                                legal safeguards described in the{" "}
                                <a
                                    href="https://privacy.microsoft.com/privacystatement"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Microsoft Privacy Statement
                                </a>
                                .
                            </p>
                            <p>
                                <strong>GitHub</strong> hosts this site through
                                GitHub Pages and may log visitors’ IP addresses
                                for security, whether or not you accept
                                analytics. See the{" "}
                                <a
                                    href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    GitHub Privacy Statement
                                </a>
                                .
                            </p>
                            <p>
                                We don’t share data with anyone else, and we
                                never sell it.
                            </p>
                        </Section>

                        <Section title="How long it’s kept">
                            <p>
                                Clarity keeps session recordings for 30 days.
                                Heatmaps, summary statistics and any recordings
                                we mark to keep are stored for up to 13 months.
                                After that, Microsoft deletes them, including
                                from backups.
                            </p>
                        </Section>

                        <Section title="Your choices and rights">
                            <p>
                                You can change your mind whenever you like with{" "}
                                <strong>Cookie settings</strong> at the bottom
                                of every page. If you withdraw consent, we
                                delete Clarity’s cookies from your browser and
                                stop it loading. You can also block or clear
                                cookies in your browser settings.
                            </p>
                            <p>
                                Under UK data protection law, you have the right
                                to ask for a copy of your data, to have it
                                corrected or deleted, to restrict or object to
                                how it’s used, and to withdraw consent. Because
                                we can’t link Clarity data to your name, we may
                                need details such as the date and device you
                                used to find it.
                            </p>
                            <p>
                                If you’re unhappy with how we’ve handled your
                                data, you can complain to the Information
                                Commissioner’s Office at{" "}
                                <a
                                    href="https://ico.org.uk/make-a-complaint/"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    ico.org.uk
                                </a>{" "}
                                or on 0303 123 1113.
                            </p>
                        </Section>

                        <Section title="Other websites">
                            <p>
                                This site links to producers’ websites and to
                                Instagram. They have their own privacy policies,
                                which we don’t control.
                            </p>
                        </Section>

                        <Section title="Changes to this policy">
                            <p>
                                If we change how we use data, we’ll update this
                                page and the date at the top.
                            </p>
                        </Section>
                    </div>
                </div>
            </article>
            <SiteFooter />
        </main>
    );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
    return (
        <section className="border-t border-line py-9 first:border-0 first:pt-0 [&_p+p]:mt-4 [&_p+ul]:mt-3 [&_ul+p]:mt-4 [&_p+div]:mt-4 [&_div+p]:mt-4">
            <h2 className="mb-4 font-display text-[28px] font-normal leading-tight tracking-[-.02em] text-ink">
                {title}
            </h2>
            {children}
        </section>
    );
}
