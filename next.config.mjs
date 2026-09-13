/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/independence-day',
        destination: '/',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
