import type { AnyRecord } from '$lib/helper/types';
import { ObjectId, type Document } from 'mongodb';

export const dataToMongodb = <I extends AnyRecord>(data: I) => {
	const { id, ...doc } = data;
	if (!id) {
		return doc;
	}
	return { _id: new Object(id), ...doc };
};

export const mongoDbToData = <I extends Document>(
	data: I
): Omit<I, '_id' | '_v'> & { id: string } => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { _id, _v, ...doc } = data;
	return { id: _id.toString(), ...doc };
};

export interface PaginationOptions {
	skip?: number;
	limit?: number;
}

export const definePagination = ({ skip = 0, limit = 10 }: PaginationOptions) => {
	return { skip, limit };
};

export const idFromString = (id: string) => {
	return ObjectId.createFromHexString(id);
};
