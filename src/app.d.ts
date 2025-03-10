// See https://svelte.dev/docs/kit/types#app.d.ts

import type { UserId } from '$core/models/user';
import type { TeamId } from '$core/models/team';
import type { Session } from '$core/models/session';

// for information about these interfaces
declare global {
	namespace App {
		interface Locals {
			userId: UserId | null;
			teamId: TeamId | null;
			session: Session | null;
		}
		interface Error {
			errorId?: string;
			message: string;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
