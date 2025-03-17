export const omit = <T extends Record<string, unknown>, K extends keyof T>(
	obj: T,
	keys: K[]
): Omit<T, K> => {
	const keysSet = new Set(keys);
	return Object.keys(obj).reduce(
		(result, key) => {
			if (!keysSet.has(key as K)) {
				(result as Record<string, unknown>)[key] = obj[key];
			}
			return result;
		},
		{} as Omit<T, K>
	);
};
