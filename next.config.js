/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

const withTM = require('next-transpile-modules')(['styled-components/native'])

module.exports = withTM(nextConfig)

module.exports = nextConfig
