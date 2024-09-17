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
                "csv-parse": "csv-parse/lib/sync",
                
            }
        },
        ppr: false,
    }
};

export default nextConfig;