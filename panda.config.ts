import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ["./app/**/*.{js,jsx,ts,tsx}"],

  // Files to exclude
  exclude: ["./app/_styled-system/**"],

  // Useful for theme customization
  theme: {
    extend: {
      semanticTokens: {
        colors: {
          bg: {
            value: { base: "{colors.gray.50}", _osDark: "{colors.gray.900}" },
          },
          bgHover: {
            value: { base: "{colors.gray.100}", _osDark: "{colors.gray.800}" },
          },
          bgWeak: {
            value: { base: "{colors.white}", _osDark: "{colors.gray.800}" },
          },
          border: {
            value: { base: "{colors.gray.300}", _osDark: "{colors.gray.600}" },
          },
          text: {
            value: { base: "{colors.gray.900}", _osDark: "{colors.gray.100}" },
          },
        },
        fonts: {
          body: { value: "sans-serif" },
        },
      },
    },
  },

  // The output directory for your css system
  outdir: "app/_styled-system",
});
