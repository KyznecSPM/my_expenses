/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/my_expenses',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
