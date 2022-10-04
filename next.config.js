/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    MY_GITHUB_PASSWORD: "Silkmilk1!",
    MY_PERSONAL_EMAIL: "kcdcox@gmail.com",
    MY_SHOPIFY_EMAIL: "kevin.d.cox@shopify.com",
  },
};

module.exports = nextConfig;
