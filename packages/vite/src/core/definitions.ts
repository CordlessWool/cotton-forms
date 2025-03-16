export const DEFAULT_DEFINITION = {
  server: "https://test.shrtn.io",
};

export const server = (server: string) => ({
  definition: (key: string) => new URL(`/api/form/key/${key}/define`, server),
});
