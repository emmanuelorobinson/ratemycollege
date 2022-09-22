/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['res.cloudinary.com'],
 }
}

const withTM = require('next-transpile-modules')(['styled-components/native'])

module.exports = withTM(nextConfig)

module.exports = nextConfig
