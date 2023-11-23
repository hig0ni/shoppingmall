/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      domains: [
        'storage.googleapis.com'
    ],
    format: ['image/png', 'image/webp', 'image/jpeg', 'image/jpg']
    }
}


module.exports = nextConfig
