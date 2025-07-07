// vite.config.ts
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],

  /** ♻️ Dev‑server options */
  server: {
    host: true,                     // listen on 0.0.0.0 (needed for Ngrok)
    allowedHosts: [
      "127.0.0.1",
      "9d3c-59-153-103-135.ngrok-free.app"
    ],
  },
});
