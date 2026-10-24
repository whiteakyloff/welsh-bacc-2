"use client";

import type { ButtonHTMLAttributes } from "react";
import { CLARITY_PROJECT_ID, resetConsent } from "@/lib/consent";

/** Reopens the consent banner so the visitor can change their choice. */
export function CookieSettingsButton(
    props: ButtonHTMLAttributes<HTMLButtonElement>,
) {
    if (!CLARITY_PROJECT_ID) return null;

    return <button type="button" onClick={resetConsent} {...props} />;
}
