# Copilot instructions for ngx-toastf

This is an Angular 22 workspace (library peer floor: Angular >= 20) built with pnpm. Two projects:

- `projects/ngx-toastf/` - the published library. A single entry point exporting `NgxToastService`,
  `NgxToastComponent` (internal, never placed in a consumer template), `provideNgxToast()` +
  `withToastConfig()`, the deprecated `NgxToastModule`, and the config/enum types.
- `projects/ngx-toastf-showcase/` - a demo/test Angular app exercising the library; not published.

## Architecture

- `NgxToastComponent` is dynamically created by `NgxToastService` via `createComponent()` - it is
  never declared/imported in a consumer template, so `NgxToastModule` has no declarations/imports/
  exports, it only forwards to `provideNgxToast()` for backwards-compatible NgModule setup.
- Toasts stack: `NgxToastService` keeps a `Map<NgxToastPosition, HTMLElement>` of per-position flex
  containers appended to `<body>`, styled via inline `CSSStyleDeclaration` objects (in
  `ngx-toast-constant.ts`) because that container lives outside Angular's view/style encapsulation.
- `NGX_TOAST_CONFIG` is `providedIn: 'root'` with a `{}` factory default so `NgxToastService` works
  with **zero setup** (matches the original v1 ergonomics) - `provideNgxToast(withToastConfig(...))`
  is optional sugar for overriding global defaults, not a requirement.
- The component's own inputs use `input()`/`input.required()` signals; state transitions
  (`opening -> open -> closing`) drive a single computed host `[class]` string. Never combine a
  static host `class` string with a `[class]` binding in the same `host` object.
- After `createComponent()` + `attachView()`, call `toastRef.changeDetectorRef.detectChanges()`
  explicitly - waiting for zone stabilization to render the first paint is unreliable (and breaks
  synchronous test assertions).

## Testing

- Tests run on Vitest via `@angular/build:unit-test`, not Karma.
- The library's test target resolves `buildTarget` from `@angular/build:ng-packagr`, which has no
  `polyfills` option, so **zone.js is never loaded in the lib's test environment**. Never use
  Angular's `fakeAsync`/`tick` in `projects/ngx-toastf/src/**/*.spec.ts` - use Vitest's
  `vi.useFakeTimers()` / `vi.advanceTimersByTime()` instead.
- Default `autoClose: false` in test configs unless a test specifically exercises auto-close, to
  avoid leaking real background timers across unrelated assertions.
- `pnpm test:lib` builds the library first, then runs its unit-test target with an 80% coverage
  gate. The showcase project's test target has coverage collection but no threshold gate (it's an
  unpublished demo app).

## Conventions

- Conventional Commits, enforced by commitlint; `semantic-release` derives the version and
  changelog from them. Never hand-edit `CHANGELOG.md`, `projects/ngx-toastf/package.json`'s
  `version`, or the compatibility tables in `README.md` / `docs/docs/intro.md`.
- `docs/` is a fully independent Docusaurus project (own `package.json`, own lockfile) - not part
  of any pnpm workspace with the root project.
