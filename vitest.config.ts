import { defineConfig } from "vitest/config";

export default defineConfig({
  css: {
    postcss: {
      plugins: [],
    },
  },
  test: {
    include: ["app/__tests__/**/*.test.{ts,tsx}"],
  },
});
