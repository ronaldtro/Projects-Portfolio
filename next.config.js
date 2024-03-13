/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    env: {
        ADMIN: process.env.ADMIN
    }
}

module.exports = nextConfig
