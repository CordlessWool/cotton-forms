import { ObjectId } from "bson";
import * as v from "valibot";

export const UserTeamSchema = v.object({
  teamId: v.string(),
  role: v.literal("owner", "dev"),
});

export const UserSchema = v.object({
  id: v.optional(v.string(), () => ObjectId.toString()),
  email: v.string(),
  name: v.string(),
  teams: v.optional(v.array(UserTeamSchema)),
  defaultTeamId: v.optional(v.string()),
  createdAt: v.optional(v.date(), () => new Date()),
  updatedAt: v.optional(v.date(), () => new Date()),
  image: v.optional(v.string()),
});

export const OTPSignInSchema = v.object({
  email: v.pipe(v.string(), v.email()),
});

export const OTPSignUpSchema = v.object({
  email: v.pipe(v.string(), v.email()),
  name: v.string(),
});

export const OTPVerificationSchema = v.object({
  email: v.string(),
  otp: v.string(),
});

export const UserDatabaseSchema = v.object({
  ...v.omit(UserSchema, ["id"]).entries,
  _id: v.string(),
  createdAt: v.date(),
  updatedAt: v.date(),
});

export type OTPSignIn = v.InferOutput<typeof OTPSignInSchema>;
export type OTPSignUp = v.InferOutput<typeof OTPSignUpSchema>;
export type UserDatabase = v.InferOutput<typeof UserDatabaseSchema>;
export type OTPVerification = v.InferInput<typeof OTPVerificationSchema>;
export type UserTeam = v.InferOutput<typeof UserTeamSchema>;
export type User = v.InferOutput<typeof UserSchema>;
export type NewUser = v.InferInput<typeof UserSchema>;
export type UserId = User["id"];
