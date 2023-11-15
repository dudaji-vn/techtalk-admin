/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/dashboard/lectures",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
