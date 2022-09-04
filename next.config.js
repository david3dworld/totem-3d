/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['shop.totem-universe.io', 'backend.totem-universe.io'],
  },
  env: {
    EMAIL_JS_SERVER: process.env.EMAIL_JS_SERVER,
    EMAIL_JS_LICENSOR_TEMPLATE: process.env.EMAIL_JS_LICENSOR_TEMPLATE,
    EMAIL_JS_CONTACT_TEMPLATE: process.env.EMAIL_JS_CONTACT_TEMPLATE,
    EMAIL_JS_PUBLIC_KEY: process.env.EMAIL_JS_PUBLIC_KEY
  },
  webpack5: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    return config;
  },
}

module.exports = nextConfig
