import type { NewOTP, OTP, OTPId } from '$core/models/otp';
import { collection } from '$lib/server/db';
import { ObjectId } from 'bson';
import { mongoDbToData } from './helper';

export const getOTPByEmail = async (email: string): Promise<OTP | null> => {
	const result = await collection.otp.findOne({ email: email });
	if (!result) {
		return null;
	}
	return mongoDbToData(result);
};

export const getOTPById = async (id: string): Promise<OTP | null> => {
	const result = await collection.otp.findOne({ _id: new ObjectId(id) });
	if (!result) {
		return null;
	}
	return mongoDbToData(result);
};

export const createOTP = async ({ id, ...newOTP }: NewOTP): Promise<OTPId> => {
	const result = await collection.otp.insertOne({
		_id: new ObjectId(),
		...newOTP
	});

	if (!result.insertedId) {
		throw new Error('Failed to create OTP');
	}

	return result.insertedId.toString();
};
