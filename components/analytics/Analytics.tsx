"use client";

import Link from "next/link";
import Script from "next/script";
import { useConsent } from "@/hooks/useConsent";
import { CLARITY_PROJECT_ID, denyConsent, grantConsent } from "@/lib/consent";

/**
 * Microsoft Clarity, loaded only after the visitor accepts analytics cookies,
 * plus the banner that asks. Renders nothing without a Clarity project ID.
 */
export function Analytics() {
    const consent = useConsent();
    if (!CLARITY_PROJECT_ID) return null;

    if (consent === "granted") return <ClarityScript id={CLARITY_PROJECT_ID} />;
    if (consent === null) return <ConsentBanner />;
    return null;
}

// Clarity's install snippet, followed by its Consent API v2 call. Ad storage
// stays denied: the banner only asks about analytics.
function ClarityScript({ id }: { id: string }) {
    return (
        <Script id="microsoft-clarity" strategy="afterInteractive">
            {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script",${JSON.stringify(id)});
window.clarity("consentv2",{ad_Storage:"denied",analytics_Storage:"granted"});`}
        </Script>
    );
}

function ConsentBanner() {
    return (
        <div
            role="region"
            aria-label="Cookie consent"
            className="fixed bottom-5 left-5 z-[60] w-[380px] animate-rise-in bg-paper p-[22px] text-ink shadow-[5px_6px_0_#d54a3d,0_18px_40px_rgba(15,43,31,.25)] max-[800px]:inset-x-4 max-[800px]:bottom-4 max-[800px]:w-auto"
        >
            <p className="font-display text-[19px] leading-tight">
                Help us improve the site?
            </p>
            <p className="mt-2.5 text-xs leading-[1.6] text-muted">
                With your OK, we use Microsoft Clarity to see how people use
                these pages, like where they click and scroll. It sets cookies,
                and you can change your mind at any time.{" "}
                <Link
                    href="/privacy"
                    className="font-bold text-welsh-green underline decoration-[#c8cfc5] underline-offset-[3px] transition-colors hover:decoration-[#d54a3d]"
                >
                    Privacy policy
                </Link>
            </p>
            <div className="mt-4 flex gap-2.5">
                <button
                    type="button"
                    onClick={grantConsent}
                    className="cursor-pointer rounded border-0 bg-gold px-4 py-[11px] text-xs font-bold tracking-[.03em] text-ink transition-[translate,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-md"
                >
                    Accept analytics
                </button>
                <button
                    type="button"
                    onClick={denyConsent}
                    className="cursor-pointer rounded border border-line bg-transparent px-4 py-[11px] text-xs font-bold tracking-[.03em] text-welsh-green transition-colors duration-200 hover:border-welsh-green"
                >
                    No thanks
                </button>
            </div>
        </div>
    );
}
