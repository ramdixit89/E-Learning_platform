import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
  },
  server: {
    historyApiFallback: true, // Ensures React Router works correctly
  },
  preview: {
    port: 5000,
  },
});
