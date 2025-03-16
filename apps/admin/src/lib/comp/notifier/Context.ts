import { writable, type Writable } from 'svelte/store';

export interface Notification {
	id: number;
	type: 'success' | 'error' | 'warning' | 'info';
	message: string;
	dismissable: boolean;
}

const writableBase = writable<Notification[]>([]);
const notifications = {
	add: (notification: Notification) => {
		writableBase.update((n) => [...n, notification]);
	},
	remove: (id: number) => {
		writableBase.update((n) => n.filter((notification) => notification.id !== id));
	},
	subscribe: writableBase.subscribe
};

export const notifier = {
	...writableBase,
	error: (message?: string, dismissable = true) => {
		notifications.add({
			id: Date.now(),
			type: 'error',
			message: message ?? 'An unexpected error occurred',
			dismissable
		});
	},
	add: (notification: Notification) => {
		writableBase.update((n) => [...n, notification]);
	},
	remove: (id: number) => {
		writableBase.update((n) => n.filter((notification) => notification.id !== id));
	}
} satisfies Writable<Notification[]> & {
	error: (message?: string, dismissable?: boolean) => void;
	add: (notification: Notification) => void;
	remove: (id: number) => void;
};

export type Notifier = typeof notifier;
