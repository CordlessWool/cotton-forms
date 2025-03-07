import { ObjectId } from "bson";
import * as v from "valibot";

export const TeamSchema = v.object({
  id: v.optional(v.string(), ObjectId.toString()),
  name: v.optional(v.string()),
  description: v.optional(v.string()),
});

export const TeamDatabaseSchema = v.object({
  ...v.omit(TeamSchema, ["id"]).entries,
  _id: v.string(),
  createdBy: v.string(),
});

export type Team = v.InferOutput<typeof TeamSchema>;
export type NewTeam = v.InferInput<typeof TeamSchema>;
export type TeamDatabase = v.InferOutput<typeof TeamDatabaseSchema>;
export type TeamId = Team["id"];
