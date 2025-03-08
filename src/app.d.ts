// See https://svelte.dev/docs/kit/types#app.d.ts

import type { UserId } from '$core/models/user';

// for information about these interfaces
declare global {
	namespace App {
		interface Locals {
			userId: UserId | null;
			teamId: TeamId | null;
		}

		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
