// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro,
//     componentTagger, VITE_* env injection, @ alias, etc.

import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  tanstackStart: {
    server: {
      entry: "server",
    },
  },

  vite: {
    plugins: [
      VitePWA({
  registerType: "autoUpdate",
  outDir: ".output/public",

        injectRegister: "auto",

        includeAssets: [
          "icons/apple-touch-icon.png",
          "icons/icon-192.png",
          "icons/icon-512.png",
        ],

        workbox: {
  maximumFileSizeToCacheInBytes: 15 * 1024 * 1024,
  globPatterns: [
    "**/*.{js,css,html,png,svg,ico,woff2}",
  ],
},

        manifest: {
          id: "/",
          name: "Udaipur Bohra Club",
          short_name: "UBC",
          description: "Official Udaipur Bohra Club App",

          theme_color: "#4c3624",
          background_color: "#fffaf2",

          display: "standalone",
          orientation: "portrait",
          start_url: "/",

          icons: [
            {
              src: "/icons/icon-192.png",
              sizes: "192x192",
              type: "image/png",
            },

            {
              src: "/icons/icon-512.png",
              sizes: "512x512",
              type: "image/png",
            },

            {
              src: "/icons/icon-512.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "maskable",
            },

            {
              src: "/icons/apple-touch-icon.png",
              sizes: "180x180",
              type: "image/png",
            },
          ],
        },

        devOptions: {
          enabled: true,
        },
      }),
    ],
  },
});