// vite.config.js
import path from "path";
const windiPreprocess = require("svelte-windicss-preprocess");
const svelte = require("@svitejs/vite-plugin-svelte");
const { defineConfig } = require("vite");

module.exports = defineConfig(({ command, mode }) => {
  const isProduction = mode === "production";
  return {
    optimizeDeps: {
      exclude: ["@roxi/routify"],
    },
    resolve: {
      alias: {
        svelte: path.resolve(__dirname, "node_modules/svelte"),
      },
    },
    plugins: [
      svelte({
        preprocess: [
          windiPreprocess.preprocess({
            verbose: true,
            silent: false,
            debug: true,
            transformCSS: "pre",
            config: "tailwind.config.js", // tailwind config file path (optional)
            compile: false, // false: interpretation mode; true: compilation mode
            prefix: "windi-", // set compilation mode style prefix
            globalPreflight: true, // set preflight style is global or scoped
            globalUtility: true, // set utility style is global or scoped
          }),
        ],
        hot: !isProduction,
        emitCss: false,
      }),
    ],
    build: {
      minify: isProduction,
    },
  };
});
