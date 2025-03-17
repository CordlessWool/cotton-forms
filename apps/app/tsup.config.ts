import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/exports/client.ts"],
  format: ["cjs", "esm"],
  external: ["valibot", "bson"],
  dts: true,
  clean: true,
  splitting: false,
});
