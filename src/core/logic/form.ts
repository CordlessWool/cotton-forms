import type { FormSchema } from "$core/models/form/index";
import type { AnyRecord } from "@cotton-forms/common";

export const convertFormSchemaToLabels = (
  schema: FormSchema[],
): [string, string][] => {
  return schema.map((schema) => {
    return [schema.name, schema.label ?? schema.name];
  });
};

export const calculateFormLabels = (
  schema: FormSchema[] | undefined,
  data: AnyRecord,
): [string, string][] => {
  if (schema && schema.length !== 0) {
    return convertFormSchemaToLabels(schema);
  } else {
    const keys = Object.keys(data);
    return keys.map((key) => [key, key]);
  }
};

export const compareSchema = (
  schema1: FormSchema[],
  schema2: FormSchema[],
): boolean => {
  return JSON.stringify(schema1) === JSON.stringify(schema2);
};
