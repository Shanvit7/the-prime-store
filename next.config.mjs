/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'placeimg.com',
          port: '',
        },
        {
          protocol: 'https',
          hostname: 'i.imgur.com',
          port: '',
        },
        {
          protocol: 'https',
          hostname: 'www.clarin.com',
          port: '',
        },
      ],
    },
  };
  
  export default nextConfig;