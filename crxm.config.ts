import {
  defineConfig,
  reactWatch,
  tsBundlerWatch,
  esbuildCSSPlugin,
  tsBundler,
} from "crx-monkey-next";

export default defineConfig({
  manifest: "./manifest.ts",
  popup_in_userscript: true,
  watch: {
    "\\.(ts|js)x$": reactWatch({
      esbuild: {
        plugins: [esbuildCSSPlugin()],
      },
    }),
    "\\.(ts|js)$": tsBundlerWatch({
      esbuild: {
        plugins: [esbuildCSSPlugin()],
      },
    }),
  },
  build: {
    "\\.(ts|js|tsx|jsx)$": tsBundler({
      esbuild: {
        plugins: [esbuildCSSPlugin()],
      },
    }),
  },
});
