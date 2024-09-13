/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        turbo: {
            resolveAlias: {
                buffer: 'buffer',
                crypto: 'crypto-browserify',
                stream: 'stream-browserify',
                os: 'os-browserify/browser',
                path: 'path-browserify',
            }
        }
    }
};

export default nextConfig;