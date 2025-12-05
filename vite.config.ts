import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import federation from "@originjs/vite-plugin-federation";
import { PORT } from "./src/constants/env";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: "host_app",
      remotes: {
        remote_app: `http://localhost:${PORT}/assets/remoteEntry.js`,
      },
      shared: ["react", "react-dom"],
    }),
  ],
  server: {
    port: Number(PORT), // Your desired port
    strictPort: true, // Exit if port is already in use (optional)
    host: true, // Listen on all addresses (optional)
  },
  preview: {
    port: Number(PORT),
    strictPort: true,
  },
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});
