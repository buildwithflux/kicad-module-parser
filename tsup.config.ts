// Copied verbatim from https://pauloe-me.medium.com/typescript-npm-package-publishing-a-beginners-guide-40b95908e69c

import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"], // Build for commonJS and ESmodules
  dts: true, // Generate declaration file (.d.ts)
  splitting: false,
  sourcemap: true,
  clean: true,
});
