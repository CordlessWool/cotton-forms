import { treaty, type Treaty } from "@elysiajs/eden";
import type { App } from "@cotton-forms/server/client";

export const prepareRequestHandler = (
  server: string,
  apiKey: string,
): Treaty.Create<App> => {
  return treaty<App>(server, {
    headers: {
      "x-api-key": apiKey,
    },
  });
};

export const generateFormUrl = (server: string, apiKey: string) => {
  return new URL(`/f/${apiKey}/`, server).href;
};
