import { ObjectId } from "bson";
import * as v from "valibot";

export const APIKeySchema = v.object({
  id: v.optional(v.string(), () => ObjectId.toString()),
  token: v.string(),
  userId: v.string(),
  teamId: v.string(),
  createdAt: v.optional(v.date(), () => new Date()),
});

export const APIKeyDatabaseSchema = v.object({
  ...v.omit(APIKeySchema, ["id"]).entries,
  _id: v.string(),
});

export type APIKey = v.InferOutput<typeof APIKeySchema>;
export type NewAPIKey = v.InferInput<typeof APIKeySchema>;
export type ApiKeyDatabase = v.InferOutput<typeof APIKeyDatabaseSchema>;
