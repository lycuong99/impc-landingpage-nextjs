/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ["en", "vi"],
    defaultLocale: "en",
  },
  env: {
    BASE_URL: process.env.BASE_URL,
    SERVER_URL: process.env.SERVER_URL,
    API_TOKEN: process.env.API_TOKEN,
  },
  images: {
    domains: [process.env.BASE_URL, process.env.SERVER_URL, "localhost", process.env.SERVER_DOMAIN],
  },
};

module.exports = nextConfig;
