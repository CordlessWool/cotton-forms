import * as v from 'valibot';
import { IdSchema, ObjectIdSchema } from './helper';
import { ObjectId } from 'bson';

export const ApiKeySchema = v.object({
	id: v.optional(IdSchema, () => ObjectId.toString()),
	token: v.string(),
	userId: IdSchema,
	teamId: IdSchema,
	createdAt: v.optional(v.date(), () => new Date())
});

export const ApiKeyDatabaseSchema = v.object({
	...v.omit(ApiKeySchema, ['id', 'teamId', 'userId']).entries,
	_id: ObjectIdSchema,
	userId: ObjectIdSchema,
	teamId: ObjectIdSchema
});

export type ApiKey = v.InferOutput<typeof ApiKeySchema>;
export type NewApiKey = v.InferInput<typeof ApiKeySchema>;
export type ApiKeyDatabase = v.InferOutput<typeof ApiKeyDatabaseSchema>;
