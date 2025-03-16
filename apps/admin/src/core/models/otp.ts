import { ObjectId } from "bson";
import * as v from "valibot";

export const OTPSchema = v.object({
  id: v.optional(v.string(), ObjectId.toString()),
  email: v.string(),
  token: v.string(),
  userId: v.string(),
  teamId: v.optional(v.string()),
  expiresAt: v.fallback(v.date(), new Date(Date.now() + 1000 * 60 * 5)),
});

export const OTPDatabaseSchema = v.object({
  ...v.omit(OTPSchema, ["id"]).entries,
  _id: v.string(),
});

export type OTPDatabase = v.InferOutput<typeof OTPDatabaseSchema>;
export type OTP = v.InferOutput<typeof OTPSchema>;
export type NewOTP = v.InferInput<typeof OTPSchema>;
export type OTPId = v.InferOutput<typeof OTPSchema>["id"];
