/** @type {import('next').NextConfig} */

import crypto from 'crypto-browserify';

const nextConfig = {
    // webpack: (config, { isServer }) => {
    //     webpack: (config, { isServer }) => {
    //       if (!isServer) {
    //         config.node = {
    //           crypto: 'empty',
    //         };
    //       }
    //       return config;
    //     },
    // },
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.node = {
                crypto: 'empty',
            };
        }
        return config;
    },
};

export default nextConfig;