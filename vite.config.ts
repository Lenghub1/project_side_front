import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
// import removeConsole from "vite-plugin-remove-console";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfigPaths(), svgr()], // removeConsole()
  assetsInclude: ["**/*.md"]
  // server: {
  //   proxy: {
  //     // "/api": "https://stg.maryai.so",
  //   },
  // },
  // build: {
  //   outDir: "build",
  // },
});
