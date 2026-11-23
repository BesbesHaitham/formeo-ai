import { mkdir, writeFile } from 'node:fs/promises';
import {
  initialForms,
  initialResponses,
  initialVisits,
  templates,
  studentForm,
} from '../src/content/fixtures.js';

await mkdir('wiremock/__files', { recursive: true });
await mkdir('wiremock/mappings', { recursive: true });
const write = (path, data) => writeFile(path, JSON.stringify(data, null, 2) + '\n');
await write('wiremock/__files/forms.json', initialForms);
await write('wiremock/__files/templates.json', templates);
const mapping = (method, url, response, pattern = false) => ({
  request: { method, [pattern ? 'urlPathPattern' : 'urlPath']: url },
  response: { headers: { 'Content-Type': 'application/json' }, ...response },
});
await write('wiremock/__files/google-user.json', {
  name: 'Test Account',
  email: 'test.account@example.com',
  provider: 'mock',
});
await write(
  'wiremock/mappings/auth-google.json',
  mapping('POST', '/api/auth/google', { status: 200, bodyFileName: 'google-user.json' }),
);
await write(
  'wiremock/mappings/forms.json',
  mapping('GET', '/api/forms', { status: 200, bodyFileName: 'forms.json' }),
);
await write(
  'wiremock/mappings/templates.json',
  mapping('GET', '/api/templates', { status: 200, bodyFileName: 'templates.json' }),
);
for (const form of initialForms) {
  await write(`wiremock/__files/form-${form.id}.json`, form);
  await write(
    `wiremock/mappings/read-${form.id}.json`,
    mapping('GET', `/api/forms/${form.id}`, { status: 200, bodyFileName: `form-${form.id}.json` }),
  );
}
await write('wiremock/__files/responses.json', {
  responses: initialResponses,
  visits: initialVisits,
});
await write(
  'wiremock/mappings/responses.json',
  mapping('GET', '/api/forms/event/responses', { status: 200, bodyFileName: 'responses.json' }),
);
await write('wiremock/mappings/responses-empty.json', {
  priority: 10,
  ...mapping(
    'GET',
    '/api/forms/[^/]+/responses',
    { status: 200, jsonBody: { responses: [], visits: [] } },
    true,
  ),
});
await write(
  'wiremock/mappings/create.json',
  mapping('POST', '/api/forms', {
    status: 201,
    jsonBody: { acknowledged: true, persistence: 'localStorage' },
  }),
);
await write(
  'wiremock/mappings/update.json',
  mapping('PUT', '/api/forms/[^/]+', { status: 200, jsonBody: { acknowledged: true } }, true),
);
await write(
  'wiremock/mappings/delete.json',
  mapping('DELETE', '/api/forms/[^/]+', { status: 204 }, true),
);
await write(
  'wiremock/mappings/submit.json',
  mapping(
    'POST',
    '/api/forms/[^/]+/responses',
    { status: 201, jsonBody: { acknowledged: true, persistence: 'localStorage' } },
    true,
  ),
);

await write('wiremock/__files/ai-form.json', { form: studentForm });
await write('wiremock/mappings/ai-generate.json', {
  priority: 10,
  ...mapping('POST', '/api/ai/generate', { status: 200, bodyFileName: 'ai-form.json' }),
});
await write('wiremock/mappings/ai-refine.json', {
  priority: 1,
  request: {
    method: 'POST',
    urlPath: '/api/ai/generate',
    bodyPatterns: [{ matchesJsonPath: '$.current' }],
  },
  response: {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
    transformers: ['response-template'],
    body: `{"form": {{{jsonPath request.body '$.current'}}} }`,
  },
});
await write(
  'wiremock/mappings/auth-password-reset.json',
  mapping('POST', '/api/auth/password-reset', {
    status: 200,
    jsonBody: { accepted: true, delivery: 'mock' },
  }),
);
