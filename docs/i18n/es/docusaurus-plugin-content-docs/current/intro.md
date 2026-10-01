---
id: intro
slug: /
title: Introducción
sidebar_position: 1
---

# ngx-toastf

[![CI](https://github.com/darioegb/ngx-toast/actions/workflows/ci.yml/badge.svg)](https://github.com/darioegb/ngx-toast/actions/workflows/ci.yml)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=darioegb_ngx-toast&metric=alert_status)](https://sonarcloud.io/dashboard?id=darioegb_ngx-toast)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=darioegb_ngx-toast&metric=coverage)](https://sonarcloud.io/dashboard?id=darioegb_ngx-toast)

**ngx-toastf** es una librería de notificaciones toast para Angular, standalone-first y liviana -
no necesitás `ViewContainerRef` ni marcado en el template, solo inyectá un servicio y llamalo.

## Características

- ✅ **Sin configuración** - `NgxToastService` funciona de entrada, sin provider ni módulo
- ✅ **Standalone-first** - `provideNgxToast()` para apps standalone; `NgxToastModule` para apps
  con NgModule (deprecado)
- ✅ **Transiciones CSS** - sin dependencia de `@angular/animations`
- ✅ **Apilado** - varios toasts coexisten y se apilan por posición
- ✅ **9 posiciones**, 4 tipos (success/info/warning/error), duración/auto-cierre/duración de
  animación configurables
- ✅ **Componente basado en signals** - `input()`/`output()`, `OnPush`, sin decoradores
  `@Input`/`@Output`

## Ejemplo en Vivo

Podés ver la librería en acción acá:
[ngx-toastf-example](https://stackblitz.com/edit/ngx-toastf-example).

## Cómo Funciona

```
toastService.showToastSuccess('Guardado!')
    └─▶ NgxToastService resuelve la config (defaults + tus overrides)
         └─▶ crea un NgxToastComponent vía createComponent()
              └─▶ lo agrega a un stack fijo por posición
                   └─▶ una transición CSS lo anima, se auto-cierra tras `duration`
```

## Compatibilidad

Última versión disponible para cada versión de Angular:

| ngx-toastf | Angular     |
| ---------- | ----------- |
| 2.0.0      | 20.x a 22.x |
| 1.2.1      | 9.x 8.x 7.x |
