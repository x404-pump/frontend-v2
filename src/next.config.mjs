/** @type {import('next').NextConfig} */

const nextConfig = {
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'Content-Security-Policy',
                        value: "upgrade-insecure-requests"
                    }
                ],
            },
        ]
    },
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
    }
};

export default nextConfig;