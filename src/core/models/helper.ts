import { ObjectId } from 'bson';
import * as v from 'valibot';

const createCustomObjectId = <T = ObjectId>() =>
	v.custom<T>((value) => {
		if (typeof value === 'string') {
			return ObjectId.isValid(value);
		}
		return false;
	}, 'Invalid ObjectId');

export const ObjectIdSchema = createCustomObjectId<ObjectId>();

const ObjectIdAsStringSchema = createCustomObjectId<string>();

export const IdSchema = v.pipe(
	ObjectIdAsStringSchema,
	v.transform((id) => id.toString())
);
