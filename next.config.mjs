/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com'
      },
      {
        protocol: 'https',
        hostname: 'netvvmmkvqmzzmsgzjgx.supabase.co'
      }
    ]
  }
  // productionBrowserSourceMaps: false
};

export default nextConfig;
