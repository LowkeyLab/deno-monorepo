// @ts-check
import { defineConfig } from "astro/config";
import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  integrations: [preact()],
  site: "https://example.com",
  vite: {
    server: {
      fs: {
        allow: [".."],
      },
    },
  },
});
