import { collection } from '$lib/server/db.js';
import {
	type User,
	type UserId,
	type NewUser,
	type UserTeam,
	type UserDatabase
} from '$core/models/user';
import { ObjectId } from 'mongodb';
import { mongoDbToData } from './helper';
import type { APIKey, NewAPIKey } from '$core/models/apiKey';
import type { TeamId } from '$core/models/team';

export const getUserById = async (id: UserId): Promise<User | null> => {
	const user = await collection.user.findOne({
		_id: new ObjectId(id)
	});

	if (!user) {
		return null;
	}

	return mongoDbToData(user);
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
	const user = await collection.user.findOne({
		email
	});

	if (!user) {
		return null;
	}

	return mongoDbToData(user);
};

export const addUserToTeam = async (data: UserTeam, userId: UserId) => {
	const result = await collection.user.updateOne(
		{ _id: new ObjectId(userId) },
		{ $addToSet: { teams: data }, defaultTeamId: data.teamId }
	);

	if (!result.matchedCount) {
		throw new Error('Failed to add group to user');
	}
};

export const createUser = async ({ id, ...newUser }: NewUser): Promise<User> => {
	const user: UserDatabase = {
		_id: new ObjectId(id),
		...newUser,
		createdAt: new Date(),
		updatedAt: new Date()
	};

	const result = await collection.user.insertOne(user);

	if (!result.insertedId) {
		throw new Error('Failed to create user');
	}

	return mongoDbToData(user);
};

export const getAPIKeyByToken = async (token: string): Promise<APIKey | null> => {
	const apiKey = await collection.apiKey.findOne({
		token
	});

	if (!apiKey) {
		return null;
	}

	return mongoDbToData(apiKey);
};

export const getUserByAPIKeyAndOrgId = async (token: string) => {
	const apiKeyDocument = await collection.apiKey.findOne(
		{ token },
		{
			projection: {
				userId: 1,
				teamId: 1
			}
		}
	);

	if (!apiKeyDocument) {
		return null;
	}

	const user = await collection.user.findOne({
		_id: new ObjectId(apiKeyDocument.userId)
	});

	if (!user) {
		return null;
	}

	return { user: mongoDbToData(user), teamId: apiKeyDocument.teamId };
};

export const getAPIKeys = async (teamId: TeamId) => {
	const result = await collection.apiKey
		.find({
			teamId: teamId
		})
		.toArray();
	return result;
};

export const createAPIKey = async ({ id, teamId, ...apiKeyDocument }: NewAPIKey) => {
	const result = await collection.apiKey.insertOne({
		_id: new ObjectId(id),
		...apiKeyDocument,
		teamId: teamId,
		createdAt: new Date()
	});
	if (!result.insertedId) {
		throw new Error('User not found');
	}

	return result.insertedId;
};

export const removeAPIKey = async (token: string, teamId: TeamId) => {
	const result = await collection.user.deleteOne({
		token,
		organizationId: teamId
	});

	return result.deletedCount === 1;
};
