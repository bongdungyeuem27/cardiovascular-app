/* eslint-disable import/no-extraneous-dependencies */
import react from "@vitejs/plugin-react"
import million from "million/compiler"
import { visualizer } from "rollup-plugin-visualizer"
import type { PluginOption } from "vite"
import { defineConfig } from "vite"
import type { VitePWAOptions } from "vite-plugin-pwa"
import { VitePWA } from "vite-plugin-pwa"
import tsconfigPaths from "vite-tsconfig-paths"

const pwaOptions: Partial<VitePWAOptions> = {
  registerType: "autoUpdate",
  manifest: {
    short_name: "Diagnosis of diabetes",
    name: "Diagnosis of diabetes",
    lang: "vi",
    start_url: "/",
    background_color: "#FFFFFF",
    theme_color: "#FFFFFF",
    dir: "ltr",
    display: "standalone",
    prefer_related_applications: false,
    icons: [
      {
        src: "/assets/favicon.svg",
        purpose: "any",
        sizes: "48x48 72x72 96x96 128x128 256x256",
      },
    ],
  },
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    million.vite({ auto: true }),
    react(),
    // checker({
    //   typescript: true,
    //   biome: false,
    //   enableBuild: false,
    // }),
    tsconfigPaths(),
    visualizer({ template: "sunburst" }) as unknown as PluginOption,
    VitePWA(pwaOptions),
  ],
  server: {
    open: false,
  },
})
