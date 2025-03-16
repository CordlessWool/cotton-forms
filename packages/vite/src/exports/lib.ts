import { loadEnv, type Plugin } from "vite";
import type { pluginDefenitions } from "../core/types";
import { DEFAULT_DEFINITION } from "../core/definitions";
import { generateFormUrl, prepareRequestHandler } from "../core/api";
import * as v from "valibot";
import { FormDefinitionKeyPatchSchema } from "@cotton-forms/server/client";

export default (_definition: pluginDefenitions): Plugin => {
  let env = loadEnv("", process.cwd());
  const definition = {
    ...DEFAULT_DEFINITION,
    ..._definition,
  };
  return {
    name: "rollup-cotton-form",
    configResolved(config) {
      env = loadEnv(config.mode, process.cwd());
    },
    async buildStart() {
      const client = prepareRequestHandler(
        definition.server,
        env.VITE_FORM_API_KEY,
      );

      const validated = v.parse(FormDefinitionKeyPatchSchema, definition);

      const { error } = await client.api.form
        .key({ key: definition.key })
        .define.put(validated);

      if (error) {
        console.error("Failed to send form definition");
        console.error(error);
      }
    },
    resolveId(id) {
      if (id === "$formhydrate") {
        return `\0$formhydrate`;
      }
      return null;
    },
    load(id) {
      if (id === "\0$formhydrate") {
        const formURL = generateFormUrl(definition.server, definition.key);
        return `export const url = "${formURL}";`;
      }
      return null;
    },
  } satisfies Plugin;
};
