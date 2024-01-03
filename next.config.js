/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home/dashboard",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
