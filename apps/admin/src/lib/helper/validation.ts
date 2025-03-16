import type { error } from "elysia";
import type { BaseIssue, BaseSchema } from "valibot";
import * as v from "valibot";

export const validate = <
  const TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>>,
>(
  schema: TSchema,
  data: unknown,
  err: typeof error,
) => {
  const result = v.safeParse(schema, data);
  if (!result.success) {
    throw err(400, result.issues);
  }

  return result.output;
};
