import { ObjectId } from 'bson';
import * as v from 'valibot';

export const SessionSchema = v.object({
	id: v.optional(v.string(), ObjectId.toString()),
	token: v.string(),
	userId: v.string(),
	activeTeamId: v.optional(v.string()),
	expiresAt: v.date()
});

export const SessionDatabaseSchema = v.object({
	...v.omit(SessionSchema, ['id']).entries,
	_id: v.string()
});

export type SessionDatabase = v.InferOutput<typeof SessionDatabaseSchema>;
export type Session = v.InferOutput<typeof SessionSchema>;
export type NewSession = v.InferInput<typeof SessionSchema>;
