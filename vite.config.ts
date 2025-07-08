
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],

  /**Dev‑server options*/
  server: {
    host: true,
    allowedHosts: [
      "127.0.0.1",
      "00f83e10b671.ngrok-free.app"
    ],
  },
});
