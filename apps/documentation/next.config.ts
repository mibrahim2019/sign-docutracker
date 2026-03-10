import type { NextConfig } from 'next';

import nextra from 'nextra';

const nextConfig: NextConfig = {
  transpilePackages: [
    '@docutracker/assets',
    '@docutracker/lib',
    '@docutracker/tailwind-config',
    '@docutracker/trpc',
    '@docutracker/ui',
  ],
};

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
  codeHighlight: true,
});

export default withNextra(nextConfig);
