import nextConfig from "eslint-config-next/core-web-vitals";

const config = [
  ...nextConfig,
  {
    ignores: [".next/**", "out/**", "node_modules/**"],
  },
];

export default config;
