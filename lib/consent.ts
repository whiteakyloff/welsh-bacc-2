// Analytics consent: the visitor's choice is kept in localStorage and shared
// with the banner, the Clarity loader and the "Cookie settings" buttons.

/** Microsoft Clarity project ID, set at build time. No ID, no analytics. */
export const CLARITY_PROJECT_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;

export type Consent = "granted" | "denied";

const STORAGE_KEY = "eat-welsh-analytics-consent";
const CHANGE_EVENT = "analytics-consent-change";

declare global {
    interface Window {
        clarity?: (...args: unknown[]) => void;
    }
}

/** The stored choice, or null when the visitor hasn't chosen yet. */
export function readConsent(): Consent | null {
    try {
        const value = localStorage.getItem(STORAGE_KEY);
        return value === "granted" || value === "denied" ? value : null;
    } catch {
        // Storage blocked (private mode, strict settings): ask every visit.
        return null;
    }
}

function writeConsent(value: Consent | null) {
    try {
        if (value) localStorage.setItem(STORAGE_KEY, value);
        else localStorage.removeItem(STORAGE_KEY);
    } catch {
        // Nothing to do: the choice still applies for this page view.
    }
    window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function grantConsent() {
    writeConsent("granted");
}

export function denyConsent() {
    const wasTracking = Boolean(window.clarity);
    writeConsent("denied");
    if (!wasTracking) return;

    // Clarity is already running: erase its cookies, then reload so the
    // script is gone for the rest of the visit.
    window.clarity?.("consent", false);
    window.location.reload();
}

/** Forget the choice so the banner asks again. */
export function resetConsent() {
    writeConsent(null);
}

/** For useSyncExternalStore: fires on our own changes and other tabs'. */
export function subscribeConsent(onChange: () => void) {
    window.addEventListener(CHANGE_EVENT, onChange);
    window.addEventListener("storage", onChange);
    return () => {
        window.removeEventListener(CHANGE_EVENT, onChange);
        window.removeEventListener("storage", onChange);
    };
}
