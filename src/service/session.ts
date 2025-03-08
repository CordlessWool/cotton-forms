import { encodeHexLowerCase } from '@oslojs/encoding';
import { sha256 } from '@oslojs/crypto/sha2';
import { collection } from '$lib/server/db';
import type { NewSession, Session } from '$core/models/session';
import { ObjectId } from 'bson';

export async function createSession(
	token: string,
	userId: string,
	activeTeamId?: string
): Promise<Session> {
	const tokenHash = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	const newSession: NewSession = {
		token: tokenHash,
		userId,
		activeTeamId,
		expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
	};
	const _id = new ObjectId();
	const result = await collection.session.insertOne({
		_id,
		...newSession
	});
	return { id: _id.toString(), ...newSession };
}

export async function validateSessionToken(token: string): Promise<Session | null> {
	const tokenHash = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	const sessionRecord = await collection.session.findOne({ token: tokenHash });
	if (!sessionRecord) {
		return null;
	}

	const session: Session = {
		id: sessionRecord._id.toString(),
		token: tokenHash,
		userId: sessionRecord.userId,
		expiresAt: new Date(sessionRecord.expiresAt)
	};

	if (Date.now() >= session.expiresAt.getTime()) {
		await collection.session.deleteOne({ _id: sessionRecord._id });
		return null;
	}

	if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
		session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
		await collection.session.updateOne(
			{ _id: sessionRecord._id },
			{ $set: { expiresAt: session.expiresAt } }
		);
	}
	return session;
}

export async function invalidateSession(token: string): Promise<void> {
	await collection.session.deleteOne({ token });
}

export async function invalidateAllSessions(userId: string): Promise<void> {
	await collection.session.deleteMany({ userId });
}
