"use client";

import { useClearHashOnLoad } from "@/hooks/useClearHashOnLoad";
import { usePlayOnView } from "@/hooks/usePlayOnView";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useStackedCards } from "@/hooks/useStackedCards";
import { useThemeColorSync } from "@/hooks/useThemeColorSync";

/** Page-wide scroll behaviour. Renders nothing. */
export function PageEffects() {
    useScrollReveal();
    usePlayOnView();
    useClearHashOnLoad();
    useThemeColorSync();
    useStackedCards();
    return null;
}
