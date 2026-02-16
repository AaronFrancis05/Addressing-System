/** @type {import('next').NextConfig} */
const nextConfig = {
  //   images: {
  //     domains: [
  //       "avatars.githubusercontent.com",
  //       "lh3.googleusercontent.com",
  //       "example.com",
  //     ],
  //   },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com", // Google profile images
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com", // GitHub profile images
      },
      {
        protocol: "https",
        hostname: "example.com", // Your fallback (though it's not real)
      },
    ],
  },
};

export default nextConfig;
