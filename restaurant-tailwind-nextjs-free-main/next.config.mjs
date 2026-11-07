/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['www.commande-pizzatime.fr','recette-catalogue.aureskonnect.com'],
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
  