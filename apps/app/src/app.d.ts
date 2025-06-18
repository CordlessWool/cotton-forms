// See https://svelte.dev/docs/kit/types#app.d.ts

import type { TeamId } from '$core/models/team';
import type { Session } from '$core/models/session';
import type { User } from '$core/models/user';

// for information about these interfaces
declare global {
	namespace App {
		interface Locals {
			user: User | null | undefined;
			activeTeamId: TeamId | null | undefined;
			session: Session | null | undefined;
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
