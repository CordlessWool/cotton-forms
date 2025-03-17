import { Elysia, t } from 'elysia';
import {
	createFormDefinition,
	getAllFormDefinitions,
	getFormRecords,
	getFormDefinition,
	updateFormDefinition,
	updateFormDefinitionByKey,
	streamFormRecords,
	getFormLabels
} from '$service/form';
import { FieldSchema, FormDefinitionPatchSchema, FormDefinitionSchema } from '$core/models/form';

import { stringify, type ColumnOption } from 'csv-stringify';
import { pipeline } from 'stream';
import * as v from 'valibot';
import { AuthService } from './authMiddleware';

export default new Elysia({ prefix: '/form' })
	.use(AuthService)
	.put(
		'/key/:key/define',
		async ({ body, params, teamId }) => {
			const data = v.parse(FormDefinitionPatchSchema, body);
			await updateFormDefinitionByKey(
				{
					...data,
					key: params.key
				},
				teamId
			);
		},
		{
			params: t.Object({
				key: t.String()
			})
		}
	)
	.post(
		'/',
		async ({ body, teamId }) => {
			const validated = v.parse(FormDefinitionSchema, body);
			await createFormDefinition(validated, teamId);
		},
		{
			body: t.Object({
				name: t.String(),
				description: t.String()
			})
		}
	)
	.put(
		'/:id',
		async ({ body, teamId, params }) => {
			const schema = v.parse(v.array(FieldSchema), body.schema);
			const formId = params.id;
			await updateFormDefinition(
				{
					...body,
					schema,
					id: formId
				},
				teamId
			);
		},
		{
			params: t.Object({
				id: t.String()
			}),
			body: t.Object({
				name: t.String(),
				description: t.String(),
				origins: t.Optional(t.Array(t.String())),
				schema: t.Array(t.Any())
			})
		}
	)
	.get('/list', async ({ teamId }) => {
		const data = await getAllFormDefinitions(teamId);
		return data;
	})
	.get(
		'/:id',
		async ({ teamId, params, error }) => {
			const data = await getFormDefinition(params.id, teamId);
			if (data == null) {
				return error(404, 'Not Found');
			}

			return data;
		},
		{
			params: t.Object({
				id: t.String()
			})
		}
	)
	.get(
		'/:id/data',
		async ({ query, params, error }) => {
			const formData = await getFormRecords(params.id, query);
			if (formData == null) {
				return error(404, 'Not Found');
			}

			return formData;
		},
		{
			params: t.Object({
				id: t.String()
			}),
			query: t.Object({
				skip: t.Optional(t.Number()),
				limit: t.Optional(t.Number())
			})
		}
	)
	.get(
		'/:id/data/csv',
		async ({ params, set, teamId }) => {
			set.headers['content-type'] = 'text/csv';
			set.headers['Content-Disposition'] = `attachment; filename="export.csv"`;
			const labels = await getFormLabels(params.id, teamId);
			const columns: ColumnOption[] = labels.map(([key, label]) => ({
				key: `data.${key}`,
				header: label
			}));
			const stringifier = stringify({
				header: true,
				columns
			});
			const stream = streamFormRecords(params.id, teamId);
			return pipeline(stream, stringifier, (err) => {
				if (err) {
					console.error(err);
				}
			});
		},
		{
			params: t.Object({
				id: t.String()
			})
		}
	);
