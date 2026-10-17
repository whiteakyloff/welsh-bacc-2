import { readFileSync } from "node:fs";
import path from "node:path";

/** Reads an image from /images at build time and returns it as a data URI, so it ships inside the HTML. */
export function inlineImage(fileName: string, mimeType = "image/webp") {
    const data = readFileSync(path.join(process.cwd(), "images", fileName));
    return `data:${mimeType};base64,${data.toString("base64")}`;
}
