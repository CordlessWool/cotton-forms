import type { FormDefinition, FormDefinitionDatabase, FormSchema } from '$core/models/form/index';
import type { AnyRecord } from '$lib/helper/types';
import { ObjectId } from 'bson';
import { omit } from '$lib/helper/records';

export const convertFormSchemaToLabels = (schema: FormSchema[]): [string, string][] => {
	return schema.map((schema) => {
		return [schema.name, schema.label ?? schema.name];
	});
};

export const calculateFormLabels = (
	schema: FormSchema[] | undefined,
	data: AnyRecord
): [string, string][] => {
	if (schema && schema.length !== 0) {
		return convertFormSchemaToLabels(schema);
	} else {
		const keys = Object.keys(data);
		return keys.map((key) => [key, key]);
	}
};

export const compareSchema = (schema1: FormSchema[], schema2: FormSchema[]): boolean => {
	return JSON.stringify(schema1) === JSON.stringify(schema2);
};

export const formDefinitionToDb = (
	definition: FormDefinition,
	teamId: string
): FormDefinitionDatabase => {
	return {
		createdAt: new Date(),
		updatedAt: new Date(),
		...omit(definition, ['id']),
		_id: new ObjectId(),
		teamId: new ObjectId(teamId)
	};
};

export const dbToFormDefinition = (definition: FormDefinitionDatabase): FormDefinition => {
	return {
		...omit(definition, ['_id', 'teamId']),
		id: definition._id.toString()
	};
};
