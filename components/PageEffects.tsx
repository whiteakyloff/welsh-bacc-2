"use client";

import { useClearHashOnLoad } from "@/hooks/useClearHashOnLoad";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useThemeColorSync } from "@/hooks/useThemeColorSync";

/** Page-wide scroll behaviour. Renders nothing. */
export function PageEffects() {
    useScrollReveal();
    useClearHashOnLoad();
    useThemeColorSync();
    return null;
}
