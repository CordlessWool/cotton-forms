import { collection } from '$lib/server/db.js';
import * as v from 'valibot';
import {
	FromRecordSchema,
	type FormRecord,
	type FormDefinitionId,
	type FormDefinition,
	type FormDefinitionDatabase,
	type NewFormRecord
} from '$core/models/form';
import { ObjectId, type WithId } from 'mongodb';
import { definePagination, idFromString, mongoDbToData, type PaginationOptions } from './helper';

export const updateFormDefinitionByKey = async (
	formDefinition: Omit<FormDefinition, 'id'>,
	teamId: string
) => {
	await collection.formDefinition.updateOne(
		{
			key: formDefinition.key,
			teamId: idFromString(teamId)
		},
		{
			$set: {
				...formDefinition
			}
		}
	);
};

export const updateFormDefinition = async (
	definition: Omit<FormDefinition, 'key'>,
	teamId: string
) => {
	await collection.formDefinition.updateOne(
		{
			_id: new ObjectId(definition.id),
			teamId: ObjectId.createFromHexString(teamId)
		},
		{
			$set: definition
		}
	);
};

export const createFormDefinition = async (
	{ id, ...definition }: FormDefinition,
	teamId: string
) => {
	const data = {
		...definition,
		_id: new ObjectId(),
		teamId: idFromString(teamId),
		createdAt: new Date(),
		updatedAt: new Date()
	};

	const result = await collection.formDefinition.insertOne(data);

	if (result.insertedId) {
		const { _id, ...saved } = data;
		return {
			id: result.insertedId.toString(),
			...saved
		};
	}

	return null;
};

export const getFormDefinitionByKey = async (key: string) => {
	const projection = {
		_id: 1,
		key: 1,
		origins: 1,
		schema: 1,
		teamId: 1,
		uniqueKeys: 1
	} as const;
	const result: Pick<WithId<Omit<FormDefinitionDatabase, '_id'>>, keyof typeof projection> | null =
		await collection.formDefinition.findOne(
			{
				key
			},
			{
				projection
			}
		);

	if (!result) {
		throw new Error('Form not found');
	}

	return mongoDbToData(result);
};

export const getFormDefinition = async (
	id: string,
	teamId: string
): Promise<FormDefinition | null> => {
	const result = await collection.formDefinition.findOne({
		_id: new ObjectId(id),
		teamId: idFromString(teamId)
	});

	if (!result) {
		return null;
	}

	return mongoDbToData(result);
};

export const getAllFormDefinitions = async (teamId: string) => {
	const result = await collection.formDefinition.find({ teamId }).toArray();
	return result.map(mongoDbToData);
};

export const createFormRecord = async ({ id, ...data }: NewFormRecord) => {
	const validated = v.parse(FromRecordSchema, {
		_id: new ObjectId(),
		...data
	});
	const result = await collection.formRecord.insertOne(validated);
	return result.insertedId.toString();
};

export const getFormRecords = async (
	formId: FormDefinitionId,
	options: PaginationOptions
): Promise<FormRecord[]> => {
	const { skip, limit } = definePagination(options);

	const result = await collection.formRecord
		.find({
			formId
		})
		.skip(skip)
		.limit(limit)
		.toArray();

	return result.map(mongoDbToData);
};

export const streamFormRecords = (formId: FormDefinitionId, teamId: string) => {
	const cursor = collection.formRecord.find({
		formId,
		teamId
	});

	return cursor.stream();
};

export const getFormLabels = async (formId: FormDefinitionId, teamId: string) => {
	const result = await collection.formRecord.distinct('labels', {
		formId,
		teamId
	});

	return result;
};
