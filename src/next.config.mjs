/** @type {import('next').NextConfig} */

const nextConfig = {
    webpack: (config, { isServer }) => {
        if (!isServer) {
            // Cấu hình cho môi trường client-side
            config.resolve.fallback = {
                ...config.resolve.fallback,
                crypto: false,  
                stream: false,
            };
        }

        return config;
    },
};

export default nextConfig;