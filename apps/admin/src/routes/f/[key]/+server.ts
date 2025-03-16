import { Elysia, error, t } from 'elysia';
import { createFormRecord, getFormDefinitionByKey } from '$service/form';
import { validateForm } from '$core/models/validation';
import { calculateFormLabels } from '$core/logic/form';
import { createUniquenessHash } from '$core/logic/general';
import type { RequestHandler } from './$types';

const app = new Elysia({ prefix: '/f' })
	.guard({
		headers: t.Object({
			origin: t.String()
		}),
		params: t.Object({
			key: t.String()
		})
	})
	.post(
		'/:key',
		async ({ params, headers, body, error }) => {
			const formDefinitions = await getFormDefinitionByKey(params.key);
			if (!formDefinitions) {
				return error(404, 'Form not found');
			}
			if (formDefinitions.origins && formDefinitions.origins?.length > 0) {
				if (!formDefinitions.origins.includes(headers.origin)) {
					return error(403, 'Origin not allowed');
				}
			}
			const form = validateForm(body, formDefinitions.schema);
			if (!form.valid) {
				return error(400, form);
			}

			const hash = createUniquenessHash(form.data, formDefinitions.id, formDefinitions.uniqueKeys);

			const id = await createFormRecord({
				data: form.data,
				uniqueness: hash,
				formId: formDefinitions.id,
				userId: formDefinitions.userId,
				labels: calculateFormLabels(formDefinitions.schema, form.data)
			});
			return id;
		},
		{
			body: t.Record(t.String(), t.Any())
		}
	)
	.options('/:key', async ({ headers, set, params }) => {
		const formDefinitions = await getFormDefinitionByKey(params.key);
		if (!formDefinitions) {
			return error(404, 'Form not found');
		}
		if (formDefinitions.origins && formDefinitions.origins?.length > 0) {
			if (!formDefinitions.origins.includes(headers.origin)) {
				return error(403, 'Origin not allowed');
			}
			set.headers['access-control-allow-origin'] = formDefinitions.origins.join(', ');
		} else {
			set.headers['access-control-allow-origin'] = headers.origin;
		}

		set.headers['access-control-allow-methods'] = 'POST, OPTIONS';
		set.headers['access-control-allow-headers'] = 'Content-Type';
	});

export const POST: RequestHandler = ({ request }) => app.handle(request);
export const OPTIONS: RequestHandler = ({ request }) => app.handle(request);
