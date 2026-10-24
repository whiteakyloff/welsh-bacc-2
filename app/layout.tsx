import type { Metadata, Viewport } from "next";
import { Analytics } from "@/components/analytics/Analytics";
import { sectionColors } from "@/lib/theme";
import "./globals.css";

export const metadata: Metadata = {
    title: "Eat Welsh, Eat Well / Choose local. Support Wales.",
    description:
        "Discover Welsh food producers and make local, informed food choices with Eat Welsh, Eat Well.",
};

export const viewport: Viewport = {
    themeColor: sectionColors.deepGreen,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        <html lang="en" className="h-full antialiased">
            <body className="min-h-full flex flex-col">
                {children}
                <Analytics />
            </body>
        </html>
    );
}
