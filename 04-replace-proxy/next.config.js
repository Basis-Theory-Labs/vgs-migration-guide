/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: { domains: ['developers.basistheory.com'] }
}

module.exports = nextConfig
