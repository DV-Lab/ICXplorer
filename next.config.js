/** @type {import('next').NextConfig} */
const nextTranslate = require("next-translate");
const intercept = require("intercept-stdout");

const nextConfig = nextTranslate({
  reactStrictMode: true,
  swcMinify: true,
  output: "standalone",
  publicRuntimeConfig: {
    TEAM_NAME: process.env.TEAM_NAME || "UNKNOWN",
    IS_DEV: process.env.NODE_ENV !== "production",
    MONGO_URI: process.env.MONGO_URI || "UNKNOWN",
    PROJECT_NAME: process.env.PROJECT_NAME || "XSCORE",
  },
});

/**
 * Hide warning of RecoilJS when hot reload
 */
intercept((text) => (text.includes("Duplicate atom key") ? "" : text));

module.exports = nextConfig;
