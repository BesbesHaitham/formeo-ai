# Formeo AI — Intelligent Form Builder

A frontend-only form builder based on eight interface references. React and JavaScript, Vite, React Router, CSS Modules, Lucide, Context/reducers, Storybook, npm WireMock, and the official Google GenAI SDK. The sibling Quiz App was inspected as an architecture/configuration reference and was not modified.

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
| `/login` and `/signup`            | Firebase email/Google login, signup and local fallback                                        |

The header icon switch toggles light/dark themes. The sidebar avatar opens a logout-only menu; on mobile it stays in the header. Gemini configuration remains available from the generator. Authoring and response routes require a browser-local session. Published respondent routes and templates remain public. Accounts share this device's workspace; client-side route guards do not establish a server security boundary.

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
  services/       Gemini, native Fetch, local persistence, Firebase and mock authentication
  config/         Centralized model and non-secret API configuration
  content/        Field definitions, templates, sample responses and visit events
  utils/          Shared form contract, runtime validation, analytics and safe CSV export
  styles/         Central CSS variables and theme overrides
  stories/        Atoms, significant molecules/organisms and page layouts, including password recovery
.storybook/       React/Vite Storybook and accessibility addon
wiremock/         Static mappings and JSON fixtures
scripts/          Fixture regeneration
```

The reusable component hierarchy follows Atoms → Molecules → Organisms → Templates → Pages. Components use CSS Modules and `classnames`, compose a base class with variants/custom className, and forward native attributes. React 19 forwards refs through the native attribute spread on primitives.

`createForm` and `createField` define the shared JSDoc-documented schema: IDs, title/description, status, fields, sections, validation, appearance and timestamps. Fields cover short/long text, email, phone, number, dropdown, radio, checkboxes, date, file selection and rating. The same schema drives fixtures, manual forms, Gemini output, canvas, preview and actual submission. `FieldControl` is the shared rendering adapter.

Context plus an immutable reducer owns workspace state. Editor commands keep a bounded 50-entry undo/redo history and update that single workspace; full form snapshots are not maintained as a competing saved source. Drag-and-drop uses the native HTML API with explicit, validated payload types. Drag a library field onto the canvas to insert it, or use a question handle to reorder it. An insertion marker shows the destination. Clicking a library field inserts after the selection; the bottom Add question button appends. Move-up/move-down buttons provide keyboard and touch alternatives. All edits autosave. Refreshing retains forms, response data, field order and selected theme; undo history is intentionally session-only.

## Gemini generation and refinement

The configured model is `gemini-3.5-flash-lite`, selected after the provided key could not access 2.5 Flash and 3.8 Flash timed out. The official `@google/genai` SDK uses JSON structured output. `utils/aiRequest.js` shares request configuration between the browser override and local server; `services/aiService.js` validates and normalizes responses. Invalid content is never executed.

Set the private `GEMINI_API_KEY` in Git-ignored `.env.local`, then restart Vite. Generation uses the local server proxy automatically. Generate a form from your description, or choose Refine with AI in the editor and review changes before applying. An optional runtime browser key remains supported, but a browser cannot keep that override secret.

Google lists a Free tier for standard Flash-Lite input/output. Keep the project on that Free tier with billing disabled. The app never enables billing, uses paid tools or automatically switches models; quota errors remain visible. `GEMINI_MODEL` is configurable. See the connected-services section for deployment limitations.

The student registration template is a bundled example, not AI-generated output. Mock mode uses WireMock for generation and preserves the current form unchanged for mock refinement.

## WireMock, Fetch and persistence

WireMock is installed through npm, following the Quiz App approach. Java 11+ must be available on PATH for the WireMock executable. No Docker is required. The local Gemini proxy runs inside Vite.

```sh
# Terminal 1
npm run start:mock

# Copy .env.example to .env.local and set:
# VITE_USE_MOCK_API=true
# Then restart Vite in Terminal 2
npm run dev
```

Vite proxies `/api` to `VITE_API_PROXY_TARGET`, defaulting to `http://127.0.0.1:8081`, matching `npm run start:mock`. If occupied by another service, run `npx wiremock --root-dir ./wiremock --port 8082 --enable-stub-cors` and set `VITE_API_PROXY_TARGET=http://127.0.0.1:8082`.

| Mock endpoint              | Method       | Behavior                                       |
| -------------------------- | ------------ | ---------------------------------------------- |
| `/api/forms`               | GET          | Six initial forms                              |
| `/api/forms/:fixtureId`    | GET          | Read a bundled form; unknown IDs return 404    |
| `/api/forms`               | POST         | 201 acknowledgement                            |
| `/api/forms/:id`           | PUT / DELETE | 200 / 204 acknowledgement                      |
| `/api/templates`           | GET          | Eight templates                                |
| `/api/forms/:id/responses` | GET          | Event sample responses/visits, or empty arrays |
| `/api/forms/:id/responses` | POST         | 201 submission acknowledgement                 |

`formsApi.js` provides native Fetch operations with timeouts and HTTP-status handling. Mock mode initializes from API fixtures only when no valid local workspace exists. Templates also use the mock catalog when enabled. Static create/update/delete/submit acknowledgements never replace local state. Live Gemini requests use the local server or a runtime browser key; mock AI requests use WireMock.

**Persistence order:** validated localStorage (including a deliberately empty list) → API fixtures when mock mode is enabled → bundled defaults. `formeo.workspace.v1` is the workspace key. Invalid saved data falls back safely. Storage failures show a persistent warning; failed saves also enable a browser unload warning. WireMock is not a database. To intentionally reset, remove that workspace key through browser developer tools. To rebuild the static fixture files, run `node scripts/create-mocks.js`.

## Responses and local limitations

- The dashboard and charts count available response records, not invented counters. Initial event responses and visit events are explicitly labeled sample data, dated November 2026 to match the supplied design context.
- Visits are recorded when a published local respondent route opens. Completion is completed visits divided by recorded visits. Not-completed visits include open/in-progress visits and do not prove abandonment. Time is measured from visit start to submission. No timing/completion metric is invented when events are missing.
- Preview never records visits or submissions. Actual submission updates local statistics and charts. The date filter applies to the displayed metrics, table and CSV.
- Response records include field labels as a snapshot so later question edits/deletions do not erase their interpretation. CSV export quotes data and prefixes spreadsheet formula-like cells.
- Publishing only activates a route in the current browser/origin. Sending its URL to another device does not send the saved form. Static hosting must rewrite client routes to index.html.
- File controls select local files and save only their name, size and type. File bytes are never uploaded or placed in localStorage.
- The offline/mock fallback stores a salted SHA-256 digest, never a plaintext password. Firebase handles configured live accounts. This is an educational browser simulation, not production password handling. Remember me controls localStorage versus sessionStorage for a small identity record. Firebase provides email/password sign-in, Google sign-in and password recovery when configured; see setup below.
- Accounts share this browser's local forms and responses. Clearing site storage removes those local records and fallback accounts; Firebase accounts remain in Firebase.

Production would require a secure server-side Gemini proxy, real authentication/password hashing, per-user authorization, persistent form/response storage, file storage and publicly accessible respondent routes. No hidden server is included here.

## Storybook and verification

Storybook has controls and stories for every atom, significant compositions, loading/disabled/validation/empty states, and the eight layouts. The theme toolbar switches scoped light/dark tokens. Stories use fixtures and mock callbacks; they do not call Gemini. The accessibility addon is enabled. A narrow dependency override updates Storybook's transitive glob package to a patched release without downgrading Storybook.

The source deliberately keeps no automated test runner, browser-test dependency, generated test files or screenshots. Storybook remains the component review environment. During this refactor, the existing eight logic checks and ten browser flows passed before the requested test infrastructure was removed. The browser checks covered all eight desktop/mobile layouts, form CRUD, reorder/history/autosave, all field controls, preview isolation, submission/CSV, authentication, themes and storage recovery. Gemini transport was intercepted for those checks; live calls still require your temporary key.

### Configurable components

Shared navigation/actions/status labels are in `src/content/navigation.js`; UI copy and icon defaults are in `src/content/uiContent.js`. Reusable sections accept a `content` prop, and layouts pass their intended copy explicitly. Override a section with `content={{ ...uiContent.AIBanner, title: 'Your title' }}`. Field libraries and AI prompt suggestions receive their data through props. Native primitives continue forwarding attributes, events, refs and custom class names. Page-specific layout copy stays in templates.

The existing key dialog renders once; workspace settings have been replaced by the header theme switch and avatar logout menu. Shared form creation/copying is in `useFormActions` and `copyForm`; new copies have fresh IDs/timestamps. Response details and CSV share one answer formatter.

## Current UX and verification

The workspace uses one desktop navigation sidebar and one mobile navigation row. Header actions include the theme switch and form creation, with login or a compact avatar on mobile. Compact controls, cards and spacing are shared through design tokens. The desktop editor keeps its header visible and scrolls the library, canvas and settings independently; mobile uses a two-column field library and an explicit question-settings shortcut. Route changes return to the top of the page.

Gemini generation and refinement support client cancellation when leaving the page or closing the refinement dialog. The service uses one request attempt so failures return promptly and users can retry. Structured output includes question IDs; normalization rejects duplicates, invalid rules and unsupported field types. Refinement preserves existing identities and requires review before applying, and a stale proposal cannot overwrite newer edits. Canceling in the browser does not stop processing already started by the remote service.

Submissions revalidate every question and guard against double submission. Preview never records responses or visits. Completion feedback reports storage failures honestly.

For this pass, browser verification ran from a temporary directory outside the repository, without adding test dependencies or screenshots to the project. Checks covered click/drag insertion, reorder/history, field configuration, persistence, preview/submission/CSV, menus/templates, login/signup/session/theme, all eight screens at 1920, 1536, 1280, 768 and 390 CSS pixels, and mocked Gemini generation/refinement/quota/malformed-output/cancellation paths. Live Gemini verification still requires your temporary key.

## UI and account flow refinements

The local workspace, generator, editor, author preview and response views require an account session. Templates and published respondent links remain public. Login and signup preserve the requested route, including query strings and sections, or resume a selected template/blank-form creation exactly once. Signing out dismisses the account menu and clears the in-memory Gemini key. These are frontend route guards; all local accounts still share this browser's workspace.

Shared controls have consistent focus, hover, disabled and validation states, larger selection targets and theme-aware semantic colors. Panel and control radii and editor widths use shared tokens. The editor keeps its actions visible while scrolling and uses a compact editable form heading. A keyboard skip link moves focus to the main content. Auth screens use one page heading and signup password guidance. Respondent forms distinguish the final submission from intermediate steps and choose readable button text for custom accents.

## Google sign-in setup

1. Enable **Google** in Firebase Authentication > Sign-in method, choose the support email and save. Enable **Email/Password** as well.
2. Copy the public Web app settings from Firebase > Project settings > General into Git-ignored `.env.local`:

```dotenv
VITE_FIREBASE_API_KEY=your-public-web-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project
VITE_USE_MOCK_API=false
```

3. Add your actual hostname to Authentication > Settings > Authorized domains. Use `http://localhost:5173` locally. If configuring a custom Google OAuth Web client in the provider, use its public client ID in Firebase's Web SDK configuration and authorize Firebase's `https://your-project.firebaseapp.com/__/auth/handler` redirect URI in Google Cloud. Never add a client secret or Admin SDK key to the frontend.

Restart Vite after environment changes. The full-width branded button opens Firebase's Google account popup. Firebase verifies the Google account; the SDK uses in-memory persistence and signs out after returning the verified identity. The existing app session stores only that identity, never access or refresh tokens. Popup cancellation, blocked popups and unauthorized domains have actionable feedback. Frontend route guards do not replace server-side authorization for a deployed backend.

To test without Google credentials, set the following in `.env.local`, restart Vite, and run `npm run start:mock` in a second terminal:

```dotenv
VITE_USE_MOCK_API=true
VITE_API_PROXY_TARGET=http://127.0.0.1:8081
```

Mock mode explicitly labels the Google button's test account and uses `POST /api/auth/google`. The response comes from `wiremock/__files/google-user.json` and has `provider: "mock"`; it never claims to authenticate with Google. Both flows use the same remember-me setting, session handling and intended-action redirect. With mock mode off, missing Firebase configuration produces an error instead of a fake Google session.

Shared style tokens now use 6px controls, 8px panels, a 248px workspace sidebar and a 312px editor field library with a 320px settings panel. Search fields use the theme surface (white in light mode). Filter buttons, badges and cards share the reduced radius scale.

Signup uses one password field with a focus-triggered checklist and strength indicator. New passwords require at least 10 characters, one lowercase letter, one uppercase letter and one number. The same shared rules validate account creation. Existing accounts retain their login behavior. Auth fields rely on persistent labels instead of placeholders; the informational banner, confirmation field and template footer link have been removed.

## Connected Firebase authentication and local Gemini server

The public Firebase Web configuration enables email signup/login and password-reset requests through Firebase's Web REST API, plus Google popup sign-in through the modular Firebase Auth SDK. No Firebase Admin SDK, Analytics, service-account file or CLI is needed. Enable **Email/Password** and **Google** in Firebase Authentication > Sign-in method, save the provider settings, and authorize your actual localhost/deployed domains. The Google OAuth Web client must authorize the exact JavaScript origin (including the port).

`/forgot-password` reuses the auth layout and contains the request and confirmation screens, resend cooldown and back-to-login links. Links preserve the intended route/action. Firebase's hosted email action page handles the reset itself. Unknown emails receive the same confirmation response. WireMock accepts test requests at `POST /api/auth/password-reset` without sending email. Browser-only accounts created before connecting Firebase are not Firebase accounts; create an account in Firebase to use email recovery. Stored forms are retained.

`GEMINI_API_KEY` is private and deliberately has no `VITE_` prefix. The local Vite development/preview middleware handles `POST /api/ai/generate` using the configured model and shared structured-output configuration. It accepts same-origin, loopback requests only, validates inputs, limits request size, cancels disconnected requests and returns sanitized errors. The key is never defined in client code or placed in the built assets. A temporary browser key entered manually remains an optional override. Mock mode sends generation to WireMock, returns a labeled example and returns the current form unchanged for refinement.

Run `npm run dev` after editing `.env.local`; the public Firebase settings and private Gemini key are configured there. `.env.local` remains Git-ignored. `npm run preview` supports the same local AI middleware. A public deployment needs an authenticated server endpoint for Gemini; static Firebase Hosting alone cannot run the middleware. This task does not deploy or install global Firebase tooling.

The configured model is now `gemini-3.5-flash-lite`: the supplied key cannot access `gemini-2.5-flash` (Google returned "no longer available to new users"). `GEMINI_MODEL` controls the server model and client configuration. Google lists a Free tier for standard Gemini 3.5 Flash-Lite input/output, but the project must actually remain on the Free tier with billing disabled to avoid charges. The app never enables billing or automatically falls back to a different model or paid feature. Request limits surface as errors. No grounding, batch jobs or paid tools are enabled.

The live Email/Password provider check now reaches credential validation, confirming the provider is enabled. The supplied public configuration is valid, and its authorized domains include `localhost`, `formeo-ai.firebaseapp.com` and `formeo-ai.web.app`. Use `http://localhost:5173` locally; add other hostnames explicitly in Firebase and Google OAuth settings.

Form action menus use native top-layer popovers with viewport-aware placement, icons, keyboard navigation and borderless destructive actions. The generator uses a single focus border and reports model, quota and temporary service errors without exposing credentials.
