import type { NewOTP, OTP } from '$core/models/otp';
import type { TeamId } from '$core/models/team';
import type { User, UserId } from '$core/models/user';
import { nanoid } from 'nanoid';

export const generateOTP = () => {
	return nanoid(3).toLowerCase();
};

export const defineNewOTPFromUser = ({ email, id, defaultTeamId }: User): NewOTP => {
	const otp = generateOTP();
	return {
		token: otp,
		email,
		userId: id,
		teamId: defaultTeamId,
		expiresAt: new Date(Date.now() + 1000 * 60 * 5)
	};
};

export const defineNewOTP = ({
	email,
	userId,
	teamId
}: Pick<User, 'email'> & { userId: UserId; teamId?: TeamId }): NewOTP => {
	const otp = generateOTP();
	return {
		token: otp,
		email,
		userId,
		teamId,
		expiresAt: new Date(Date.now() + 1000 * 60 * 5)
	};
};

export const validOTP = (otp: OTP | null | undefined): otp is OTP => {
	if (!otp) {
		return false;
	}
	if (otp.expiresAt.getTime() < Date.now()) {
		return false;
	}
	return true;
};

export const verifyOTP = (otp: OTP | null | undefined, token: string): otp is OTP => {
	if (validOTP(otp) && otp.token === token) {
		return true;
	}
	return false;
};
