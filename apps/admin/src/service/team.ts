import { collection } from '$lib/server/db';
import { ObjectId } from 'bson';
import { mongo } from '$lib/helper/mongo';
import type { NewTeam } from '$core/models/team';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const createTeam = async ({ id, ...newTeam }: NewTeam, createdBy: string) => {
	const result = await collection.team.insertOne({
		_id: new ObjectId(),
		...newTeam,
		createdBy
	});

	return mongo.result.insertOne(result);
};
