## [2.1.0](https://github.com/darioegb/ngx-toast/compare/v2.0.0...v2.1.0) (2026-10-02)

### Features

* live demo in the docs, restyled showcase and showIcon option ([#8](https://github.com/darioegb/ngx-toast/issues/8)) ([ade7199](https://github.com/darioegb/ngx-toast/commit/ade719923003546064625ed9b5624446c517005f))

## [2.0.0](https://github.com/darioegb/ngx-toast/compare/v1.2.1...v2.0.0) (2026-10-01)

### ⚠ BREAKING CHANGES

* NgxToastModule deprecated in favor of provideNgxToast().

- Migrate to standalone components and providers
- Signal-based state (input/output signals, no @Input/@Output decorators)
- OnPush change detection strategy everywhere
- Remove @angular/animations dependency (CSS transitions only)
- Drop support for Angular < 20
- Replace Karma with Vitest for unit testing
- Remove E2E tests (Protractor)
- Remove Fontello assets (no longer needed)
- Modern control flow syntax (@if, @for, @switch)
- Improve documentation and API design
- Add GitHub Actions CI/CD workflow

### Features

* migrate ngx-toast to Angular 20+ standalone with signals ([db6618c](https://github.com/darioegb/ngx-toast/commit/db6618ce53c65ea5ac0853ad5f7175c69cd177b5))

### Bug Fixes

* **release:** pin conventionalcommits preset to 8.x and fix sonar organization ([cc1b2e7](https://github.com/darioegb/ngx-toast/commit/cc1b2e7b8fee8cf04c748eab4793d24a60e1437d))
