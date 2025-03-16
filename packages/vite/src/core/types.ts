import type { FormSchema } from "@cotton-forms/server/client";

export interface pluginDefenitions {
  server?: string;
  key: string;
  name?: string;
  description?: string;
  schema?: FormSchema;
}
