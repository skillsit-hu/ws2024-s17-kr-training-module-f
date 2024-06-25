import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/03_module_f/deploy",
  build: {
    outDir: "deploy",
  },
});
