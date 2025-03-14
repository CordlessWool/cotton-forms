export type PickNonNullable<T, K extends keyof T> = {
	[P in keyof T]: P extends K ? NonNullable<T[P]> : T[P];
};

export type AnyRecord = Record<string | number | symbol, unknown>;
