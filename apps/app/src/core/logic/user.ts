import type { ApiKey, ApiKeyDatabase, NewApiKey } from '$core/models/apiKey';
import type { TeamId } from '$core/models/team';
import { omit } from '$lib/helper/records';
import { ObjectId } from 'bson';
import { nanoid } from 'nanoid';

export const generateApiKey = (userId: string, teamId: string): NewApiKey => {
	return {
		token: nanoid(61),
		userId,
		teamId
	};
};

export const dbToApiKey = (apiKey: ApiKeyDatabase): ApiKey => {
	return {
		...omit(apiKey, ['_id', 'teamId']),
		id: apiKey._id.toString(),
		userId: apiKey.userId.toString(),
		teamId: apiKey.teamId.toString()
	};
};

export const apiKeysToDb = (apiKeys: ApiKey, teamId: TeamId): ApiKeyDatabase => {
	return {
		...omit(apiKeys, ['id']),
		_id: new ObjectId(apiKeys.id),
		userId: new ObjectId(apiKeys.userId),
		teamId: new ObjectId(teamId)
	};
};
