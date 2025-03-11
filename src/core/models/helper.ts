import { ObjectId } from 'bson';
import * as v from 'valibot';

export const ObjectIdSchema = v.custom<ObjectId>((value) => {
	if (typeof value === 'string') {
		return ObjectId.isValid(value);
	}
	return false;
}, 'Invalid ObjectId');
