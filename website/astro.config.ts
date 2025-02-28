import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  vite: {
    // @ts-expect-error - Plugin type mismatch between different Vite versions
    plugins: [tailwindcss()],
    server: {
      fs: {
        allow: [".."],
      },
    },
  },
});
