---
id: intro
slug: /
title: Introduction
sidebar_position: 1
---

import LiveDemo from '@site/src/components/LiveDemo'

# ngx-toastf

[![CI](https://github.com/darioegb/ngx-toast/actions/workflows/ci.yml/badge.svg)](https://github.com/darioegb/ngx-toast/actions/workflows/ci.yml)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=darioegb_ngx-toast&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=darioegb_ngx-toast)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=darioegb_ngx-toast&metric=coverage)](https://sonarcloud.io/dashboard?id=darioegb_ngx-toast)

**ngx-toastf** is a lightweight, standalone-first toast notification library for Angular apps - no
`ViewContainerRef` or template markup required, just inject a service and call it.

## Features

- ✅ **Zero setup** - `NgxToastService` works out of the box, no provider or module required
- ✅ **Standalone-first** - `provideNgxToast()` for standalone apps; `NgxToastModule` for NgModule
  apps (deprecated)
- ✅ **CSS transitions** - no `@angular/animations` dependency
- ✅ **Stacking** - multiple toasts coexist and stack per position
- ✅ **9 positions**, 4 types (success/info/warning/error), configurable duration/auto-close/
  animation timing
- ✅ **Signal-based component** - `input()`/`output()`, `OnPush`, zero `@Input`/`@Output` decorators

## Live Example

Try the library right here - this is the same showcase app that lives in the repo:

<LiveDemo />

## How It Works

```
toastService.showToastSuccess('Saved!')
    └─▶ NgxToastService resolves the config (defaults + your overrides)
         └─▶ creates an NgxToastComponent via createComponent()
              └─▶ appends it to a per-position fixed stack container
                   └─▶ CSS transition animates it in, auto-closes after `duration`
```

## Compatibility

Latest version available for each version of Angular:

| ngx-toastf | Angular      |
| ---------- | ------------ |
| 2.1.0      | 20.x to 22.x |
| 2.0.0      | 20.x to 22.x |
| 1.2.1      | 9.x 8.x 7.x  |
