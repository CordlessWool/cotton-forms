import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/exports/lib.ts"],
  format: ["cjs", "esm"],
  dts: true,
  clean: true,
  splitting: false,
});
