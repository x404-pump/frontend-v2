/** @type {import('next').NextConfig} */
import path from 'path';

const nextConfig = {
    webpack: (config, { isServer }) => {
        // Polyfills for Node.js core modules
        if (!isServer) {
            config.resolve.fallback = {
                crypto: "crypto-browserify",
                stream: require.resolve('stream-browserify'),
                os: require.resolve('os-browserify/browser'),
                path: require.resolve('path-browserify'),
                fs: false,
            };
        }

        return config;
    },
};

export default nextConfig;