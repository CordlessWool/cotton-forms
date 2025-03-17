import * as v from "valibot";
import { ObjectId } from "bson";

export const FromRecordSchema = v.object({
  id: v.optional(v.string(), () => ObjectId.toString()),
  formId: v.string(),
  userId: v.string(),
  uniqueness: v.string(),
  createdAt: v.optional(v.date(), () => new Date()),
  labels: v.array(v.tuple([v.string(), v.string()])),
  data: v.record(v.string(), v.any()),
});

export const FormRecordDatabaseSchema = v.object({
  ...v.omit(FromRecordSchema, ["id"]).entries,
  _id: v.string(),
});

export type NewFormRecord = v.InferInput<typeof FromRecordSchema>;
export type FormRecord = v.InferOutput<typeof FromRecordSchema>;
export type FormRecordDatabase = v.InferOutput<typeof FormRecordDatabaseSchema>;
