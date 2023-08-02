/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    env: process.env.ENV,
    file: {
      lottory: process.env.FILE_LOTTORY,
    },
  },
}

module.exports = nextConfig
