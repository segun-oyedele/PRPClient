/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production"
const prodPath = isProd ? "/prp" : ""

const nextConfig = {
  reactStrictMode: true,
  basePath: prodPath,
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    iisPath: prodPath,
    jwtSecretKey: "XwYYh4ihttaTbfBAL6Cq23YkABxpkH",
  },
}

module.exports = nextConfig
