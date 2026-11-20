# Formeo AI — Intelligent Form Builder

A complete frontend-only university project built from eight supplied interface references. React and JavaScript, Vite, React Router, CSS Modules, Lucide, Context/reducers, Storybook, npm WireMock, and the official Google GenAI SDK. The sibling Quiz App was inspected as an architecture/configuration reference and was not modified.

## Run locally

Use Node.js 22.12+ (Node 24 was used for verification).

```sh
npm install
npm run dev
```

Open the URL Vite prints, usually http://localhost:5173. No API key, Java process, or backend is needed for manual editing and bundled demo data.

```sh
npm run build
npm run preview
npm run lint
npm run format
npm run format:check
npm run storybook
npm run build-storybook
npm run start:mock
```

## Application pages

| Route                             | Purpose                                                                                       |
| --------------------------------- | --------------------------------------------------------------------------------------------- |
| `/`                               | Search/filter forms, create, rename, duplicate, delete, publish/unpublish, preview, responses |
| `/generate`                       | Prompt-driven Gemini generation or explicitly labeled student registration fixture            |
| `/forms/:id/edit`                 | Three-panel editor with field library, canvas and contextual settings                         |
| `/forms/:id/preview`              | One-question preview; never saves submissions or visit events                                 |
| `/f/:id`                          | Published local respondent form; records visits and completed submissions                     |
| `/templates`                      | Searchable, filterable gallery of eight editable templates                                    |
| `/responses` and `/responses/:id` | Calculated statistics, date range, charts, response details and CSV download                  |
| `/login` and `/signup`            | Local demo account workflow                                                                   |

Settings (sidebar or header help button) exposes light/dark themes, Gemini configuration and account links. Forms are editable without authentication. Demo accounts demonstrate the authentication UI; they do not establish a security boundary or isolate workspace data.

## Architecture

```text
src/
  components/
    atoms/        Native UI primitives; no imports of other application components
    molecules/    Atom compositions; no molecule-to-molecule imports
    organisms/    Functional sections composed from atoms/molecules; no organism nesting
    templates/    Page layouts composed from sections; props and layout-only UI state
  pages/          Thin hook-to-template connectors
  routes/         Application routes and missing-page handling
  hooks/          CRUD, editor history, generation, respondent, analytics and auth behavior
  store/          Context provider and immutable workspace reducer
  services/       Gemini, native Fetch, local persistence and demo authentication
  config/         Centralized model and non-secret API configuration
  content/        Field definitions, templates, sample responses and visit events
  utils/          Shared form contract, runtime validation, analytics and safe CSV export
  styles/         Central CSS variables and theme overrides
  stories/        Atoms, significant molecules/organisms and all eight page layouts
.storybook/       React/Vite Storybook and accessibility addon
wiremock/         Static mappings and JSON fixtures
scripts/          Fixture regeneration
```

The reusable component hierarchy follows Atoms → Molecules → Organisms → Templates → Pages. Components use CSS Modules and `classnames`, compose a base class with variants/custom className, and forward native attributes. React 19 forwards refs through the native attribute spread on primitives.

`createForm` and `createField` define the shared JSDoc-documented schema: IDs, title/description, status, fields, sections, validation, appearance and timestamps. Fields cover short/long text, email, phone, number, dropdown, radio, checkboxes, date, file selection and rating. The same schema drives fixtures, manual forms, Gemini output, canvas, preview and actual submission. `FieldControl` is the shared rendering adapter.

Context plus an immutable reducer owns workspace state. Editor commands keep a bounded 50-entry undo/redo history and update that single workspace; full form snapshots are not maintained as a competing saved source. Drag-and-drop uses the native HTML API with explicit, validated payload types. Drag a library field onto the canvas to insert it, or use a question handle to reorder it. An insertion marker shows the destination. Clicking a library field inserts after the selection; the bottom Add question button appends. Move-up/move-down buttons provide keyboard and touch alternatives. All edits autosave. Refreshing retains forms, response data, field order and selected theme; undo history is intentionally session-only.

## Real Gemini 2.5 Flash

The required model is centralized as `gemini-2.5-flash`. The official `@google/genai` SDK is loaded on demand. All requests live in `services/aiService.js`, using JSON structured output with `responseMimeType` and `responseJsonSchema`. Runtime validation rejects malformed output and unsupported field types before normalization. No generated content is executed.

1. Obtain a temporary, appropriately restricted Gemini API key from Google AI Studio.
2. Open Generate with AI → Configure key (or Workspace settings → Configure Gemini key).
3. Enter the key. It is held in React memory only and is cleared by a full page reload or disconnect.
4. Describe your form and generate. The returned structure depends on your actual request.
5. In the editor choose Refine with AI, describe a change, review the proposed questions/options, then Apply changes or Discard.

**A browser application cannot keep an API key secret.** Even a memory-only key is accessible in the client runtime and network environment. Never commit a key, put it in a `VITE_` variable, or store it in localStorage. A free-tier key can be used when available; model access and quotas depend on your Google project. No paid service is required for the rest of the app.

The explicit student registration demo is a bundled fixture, not AI generation. No-key, quota, authorization, network and invalid-output failures remain visible and offer retry/configuration or the labeled demo. Refinement requires a real configured key; there is no pretend keyword-based refinement engine.

SDK/structured output reference: https://googleapis.github.io/js-genai/ and https://ai.google.dev/gemini-api/docs/structured-output

## WireMock, Fetch and persistence

WireMock is installed through npm, following the Quiz App approach. Java 11+ must be available on PATH for the WireMock executable. No Docker or application backend is used.

```sh
# Terminal 1
npm run start:mock

# Copy .env.example to .env.local and set:
# VITE_USE_MOCK_API=true
# Then restart Vite in Terminal 2
npm run dev
```

Vite proxies `/api` to `VITE_API_PROXY_TARGET`, defaulting to `http://127.0.0.1:8080`. If occupied, run `npx wiremock --root-dir ./wiremock --port 8081 --enable-stub-cors` and set `VITE_API_PROXY_TARGET=http://127.0.0.1:8081`.

| Mock endpoint              | Method       | Behavior                                       |
| -------------------------- | ------------ | ---------------------------------------------- |
| `/api/forms`               | GET          | Six initial forms                              |
| `/api/forms/:fixtureId`    | GET          | Read a bundled form; unknown IDs return 404    |
| `/api/forms`               | POST         | 201 acknowledgement                            |
| `/api/forms/:id`           | PUT / DELETE | 200 / 204 acknowledgement                      |
| `/api/templates`           | GET          | Eight templates                                |
| `/api/forms/:id/responses` | GET          | Event sample responses/visits, or empty arrays |
| `/api/forms/:id/responses` | POST         | 201 submission acknowledgement                 |

`formsApi.js` provides native Fetch operations with timeouts and HTTP-status handling. Mock mode initializes from API fixtures only when no valid local workspace exists. Templates also use the mock catalog when enabled. Static create/update/delete/submit acknowledgements never replace local state. Gemini requests go directly through the SDK, never through WireMock.

**Persistence order:** validated localStorage (including a deliberately empty list) → API fixtures when mock mode is enabled → bundled defaults. `formeo.workspace.v1` is the workspace key. Invalid saved data falls back safely. Storage failures show a persistent warning; failed saves also enable a browser unload warning. WireMock is not a database. To intentionally reset, remove that workspace key through browser developer tools. To rebuild the static fixture files, run `node scripts/create-mocks.js`.

## Responses and local limitations

- The dashboard and charts count available response records, not invented counters. Initial event responses and visit events are explicitly labeled sample data, dated November 2026 to match the supplied design context.
- Visits are recorded when a published local respondent route opens. Completion is completed visits divided by recorded visits. Not-completed visits include open/in-progress visits and do not prove abandonment. Time is measured from visit start to submission. No timing/completion metric is invented when events are missing.
- Preview never records visits or submissions. Actual submission updates local statistics and charts. The date filter applies to the displayed metrics, table and CSV.
- Response records include field labels as a snapshot so later question edits/deletions do not erase their interpretation. CSV export quotes data and prefixes spreadsheet formula-like cells.
- Publishing only activates a route in the current browser/origin. Sending its URL to another device does not send the saved form. Static hosting must rewrite client routes to index.html.
- File controls select local files and save only their name, size and type. File bytes are never uploaded or placed in localStorage.
- Demo authentication stores a salted SHA-256 digest, never a plaintext password. This is an educational browser simulation, not production password handling. Remember me controls localStorage versus sessionStorage for a small identity record. Password recovery/email and Google OAuth are not implemented; their controls explain the limitation.
- All accounts in this browser share the local workspace. Clearing site storage removes all local accounts, forms and responses.

Production would require a secure server-side Gemini proxy, real authentication/password hashing, per-user authorization, persistent form/response storage, file storage and publicly accessible respondent routes. No hidden server is included here.

## Storybook and verification

Storybook has controls and stories for every atom, significant compositions, loading/disabled/validation/empty states, and the eight layouts. The theme toolbar switches scoped light/dark tokens. Stories use fixtures and mock callbacks; they do not call Gemini. The accessibility addon is enabled. A narrow dependency override updates Storybook's transitive glob package to a patched release without downgrading Storybook.

The source deliberately keeps no automated test runner, browser-test dependency, generated test files or screenshots. Storybook remains the component review environment. During this refactor, the existing eight logic checks and ten browser flows passed before the requested test infrastructure was removed. The browser checks covered all eight desktop/mobile layouts, form CRUD, reorder/history/autosave, all field controls, preview isolation, submission/CSV, authentication, themes and storage recovery. Gemini transport was intercepted for those checks; live calls still require your temporary key.

### Configurable components

Shared navigation/actions/status labels are in `src/content/navigation.js`; UI copy and icon defaults are in `src/content/uiContent.js`. Reusable sections accept a `content` prop, and layouts pass their intended copy explicitly. Override a section with `content={{ ...uiContent.AIBanner, title: 'Your title' }}`. Field libraries and AI prompt suggestions receive their data through props. Native primitives continue forwarding attributes, events, refs and custom class names. Page-specific layout copy stays in templates.

Workspace settings render once alongside the existing key dialog. Shared form creation/copying is in `useFormActions` and `copyForm`; new copies have fresh IDs/timestamps. Response details and CSV share one answer formatter.

## Current UX and verification

The workspace uses one desktop navigation sidebar and one mobile navigation row. Header actions include a direct login link or the current demo identity. Compact controls, cards and spacing are shared through design tokens. The desktop editor keeps its header visible and scrolls the library, canvas and settings independently; mobile uses a two-column field library and an explicit question-settings shortcut. Route changes return to the top of the page.

Gemini generation and refinement support client cancellation when leaving the page or closing the refinement dialog. The service uses one request attempt so failures return promptly and users can retry. Structured output includes question IDs; normalization rejects duplicates, invalid rules and unsupported field types. Refinement preserves existing identities and requires review before applying, and a stale proposal cannot overwrite newer edits. Canceling in the browser does not stop processing already started by the remote service.

Submissions revalidate every question and guard against double submission. Preview never records responses or visits. Completion feedback reports storage failures honestly.

For this pass, browser verification ran from a temporary directory outside the repository, without adding test dependencies or screenshots to the project. Checks covered click/drag insertion, reorder/history, field configuration, persistence, preview/submission/CSV, menus/templates, login/signup/session/theme, all eight screens at 1920, 1536, 1280, 768 and 390 CSS pixels, and mocked Gemini generation/refinement/quota/malformed-output/cancellation paths. Live Gemini verification still requires your temporary key.
