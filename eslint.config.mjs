import nextConfig from "eslint-config-next";

const eslintConfig = [
  ...nextConfig,
  {
    rules: {
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "react-hooks/exhaustive-deps": "warn",
      // setState in effect is often legitimate for localStorage initialization
      "react-hooks/set-state-in-effect": "warn",
      // These can be acceptable in controlled scenarios
      "react-hooks/purity": "warn",
    },
  },
];

export default eslintConfig;
