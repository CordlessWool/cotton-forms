import { writable } from 'svelte/store';
import { setContext, getContext } from 'svelte';

const NOTIFICATION_CONTEXT = Symbol('notifications');

export interface Notification {
	id: number;
	type: 'success' | 'error' | 'warning' | 'info';
	message: string;
	dismissable: boolean;
}

export interface NotifierStore {
	subscribe: (
		run: (value: Notification[]) => void,
		invalidate?: (value?: Notification[]) => void
	) => () => void;
	add: (notification: Notification) => void;
	remove: (id: number) => void;
}

export const initNotifierContext = (): NotifierStore => {
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
	setContext(NOTIFICATION_CONTEXT, notifications);
	return notifications;
};

export const getNotifierContext = () => {
	return getContext<NotifierStore>(NOTIFICATION_CONTEXT);
};

export const getNotifier = () => {
	const notifications = getNotifierContext();

	return {
		error: (message?: string, dismissable = true) => {
			notifications.add({
				id: Date.now(),
				type: 'error',
				message: message ?? 'An unexpected error occurred',
				dismissable
			});
		}
	};
};

export type Notifier = ReturnType<typeof getNotifier>;
