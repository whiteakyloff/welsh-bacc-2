import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS === "true";
const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const basePath =
    isGithubActions && repositoryName ? `/${repositoryName}` : undefined;

const nextConfig: NextConfig = {
    /* config options here */
    output: "export",
    // Emit privacy/index.html rather than privacy.html next to a privacy/
    // folder, which GitHub Pages would answer with a 404.
    trailingSlash: true,

    allowedDevOrigins: ["192.168.0.93"],
    images: {
        unoptimized: true,
    },
    basePath,
    assetPrefix: basePath ? `${basePath}/` : undefined,
    turbopack: {
        rules: {
            "*.css": {
                loaders: ["@tailwindcss/turbopack"],
                as: "*.css",
            },
        },
    },
};

export default nextConfig;
