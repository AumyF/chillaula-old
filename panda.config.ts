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
            value: { base: "{colors.gray.100}", _osDark: "{colors.gray.900}" },
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
