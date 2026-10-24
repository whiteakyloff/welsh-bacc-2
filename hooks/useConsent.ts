import { useSyncExternalStore } from "react";
import { readConsent, subscribeConsent } from "@/lib/consent";

/**
 * The visitor's analytics choice: "granted", "denied", null (not chosen yet)
 * or undefined while rendering on the server, where storage can't be read.
 */
export function useConsent() {
    return useSyncExternalStore(subscribeConsent, readConsent, () => undefined);
}
