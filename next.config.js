/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home/lectures',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
