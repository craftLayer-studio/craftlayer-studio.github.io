import type {NextConfig} from 'next';

// GitHub Pages organization site: served from the domain root, static only.
const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
