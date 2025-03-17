import * as v from 'valibot';
import { nanoid } from 'nanoid';
import { ObjectId } from 'bson';
import { IdSchema, ObjectIdSchema } from '../helper';

export enum FieldType {
	text = 'text',
	number = 'number',
	boolean = 'boolean',
	email = 'email',
	date = 'date',
	color = 'color',
	url = 'url'
}

const BasicFieldSchema = v.object({
	type: v.enum(FieldType),
	label: v.optional(v.string()),
	name: v.string(),
	required: v.optional(v.boolean())
});

export const FieldTextSchema = v.object({
	...BasicFieldSchema.entries,
	type: v.literal(FieldType.text),
	minLength: v.optional(v.number()),
	maxLength: v.optional(v.number())
});
export type FieldText = v.InferInput<typeof FieldTextSchema>;

export const FieldNumberSchema = v.object({
	...BasicFieldSchema.entries,
	type: v.literal(FieldType.number),
	min: v.optional(v.number()),
	max: v.optional(v.number())
});
export type FieldNumber = v.InferInput<typeof FieldNumberSchema>;

export const FieldBooleanSchema = v.object({
	...BasicFieldSchema.entries,
	type: v.literal(FieldType.boolean)
});
export type FieldBoolean = v.InferInput<typeof FieldBooleanSchema>;

export const FieldEmailSchema = v.object({
	...BasicFieldSchema.entries,
	type: v.literal(FieldType.email)
});
export type FieldEmail = v.InferInput<typeof FieldEmailSchema>;

export const FieldDateSchema = v.object({
	...BasicFieldSchema.entries,
	type: v.literal(FieldType.date),
	min: v.optional(v.date()),
	max: v.optional(v.date())
});
export type FieldDate = v.InferInput<typeof FieldDateSchema>;

export const FieldColorSchema = v.object({
	...BasicFieldSchema.entries,
	type: v.literal(FieldType.color)
});
export type FieldColor = v.InferInput<typeof FieldColorSchema>;

export const FieldURLSchema = v.object({
	...BasicFieldSchema.entries,
	type: v.literal(FieldType.url)
});
export type FieldURL = v.InferInput<typeof FieldURLSchema>;

export const FieldSchema = v.union([
	FieldTextSchema,
	FieldNumberSchema,
	FieldBooleanSchema,
	FieldEmailSchema,
	FieldDateSchema,
	FieldColorSchema,
	FieldURLSchema
]);

export type Fields = v.InferInput<typeof FieldSchema>;

export const FormDefinitionSchema = v.object({
	id: v.optional(IdSchema, () => ObjectId.toString()),
	key: v.optional(v.pipe(v.string(), v.nanoid()), () => nanoid()),
	name: v.optional(v.string()),
	description: v.optional(v.string()),
	origins: v.optional(v.array(v.string())),
	schema: v.optional(v.array(FieldSchema)),
	uniqueKeys: v.optional(v.array(v.string()))
});

export const FormDefinitionPatchSchema = v.partial(
	v.omit(FormDefinitionSchema, ['key', 'uniqueKeys'])
);
export const FormDefinitionDatabaseSchema = v.object({
	...v.omit(FormDefinitionSchema, ['id']).entries,
	_id: ObjectIdSchema,
	teamId: ObjectIdSchema,
	createdAt: v.optional(v.date(), () => new Date()),
	updatedAt: v.optional(v.date(), () => new Date())
});

export type FormSchema = v.InferOutput<typeof FieldSchema>;
export type NewFormDefinition = v.InferInput<typeof FormDefinitionSchema>;
export type FormDefinition = v.InferOutput<typeof FormDefinitionSchema>;
export type FormDefinitionId = FormDefinition['id'];
export type FormDefinitionDatabase = v.InferOutput<typeof FormDefinitionDatabaseSchema>;
