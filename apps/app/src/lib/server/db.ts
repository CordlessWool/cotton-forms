import type { ApiKeyDatabase } from '$core/models/apiKey';
import type { FormDefinitionDatabase, FormRecordDatabase } from '$core/models/form';
import type { OTPDatabase } from '$core/models/otp';
import type { SessionDatabase } from '$core/models/session';
import type { TeamDatabase } from '$core/models/team';
import type { UserDatabase } from '$core/models/user';
import { MongoClient } from 'mongodb';
import { env } from '$env/dynamic/private';

// Connection URL
const url = env.MONGO_DB;
if (!url) {
	throw new Error('Missing environment variable MONGO_DB');
}
const client = new MongoClient(url);

// Database Name
const dbName = env.MONGO_DB_NAME;

await client.connect();
export const db = client.db(dbName);

export const collection = {
	formRecord: db.collection<Omit<FormRecordDatabase, '_id'>>('form_record'),
	formDefinition: db.collection<Omit<FormDefinitionDatabase, '_id'>>('form_definition'),
	user: db.collection<Omit<UserDatabase, '_id'>>('user'),
	session: db.collection<Omit<SessionDatabase, '_id'>>('session'),
	apiKey: db.collection<Omit<ApiKeyDatabase, '_id'>>('api_key'),
	otp: db.collection<Omit<OTPDatabase, '_id'>>('otp'),
	team: db.collection<Omit<TeamDatabase, '_id'>>('team')
};

collection.formDefinition.createIndex({ key: 1 }, { unique: true });
collection.formDefinition.createIndex({ teamId: 1 });
collection.formRecord.createIndex({ formId: 1 });
collection.formRecord.createIndex({ uniqueness: 1 }, { unique: true });
collection.formRecord.createIndex({ formId: 1, labels: 1 });
collection.user.createIndex({ email: 1 }, { unique: true });
collection.session.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });
collection.session.createIndex({ token: 1 }, { unique: true });
// collection.otp.createIndex({ email: 1 }, { unique: true });
collection.otp.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });
