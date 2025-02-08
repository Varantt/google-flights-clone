import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      path: "path-browserify",
      "@": "/src",
      "@app": "/src",
      "@types": "/src/types",
      "@components": "/src/components",
    },
  },
});
