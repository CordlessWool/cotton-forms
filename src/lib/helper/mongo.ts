import type { InsertOneResult, UpdateResult } from 'mongodb';

export const mongo = {
	result: {
		insertOne: (result: InsertOneResult) => {
			if (!result.insertedId) {
				throw new Error('Failed to insert document');
			}
			return result.insertedId.toString();
		}
	}
};
