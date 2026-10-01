---
id: configuration
title: Configuración
sidebar_position: 3
---

# Configuración

Todas las opciones se pueden pasar por llamada como último argumento de `showToastX()`/`show()`,
o configurar como defaults globales una vez vía `provideNgxToast(withToastConfig({...}))` /
`NgxToastModule.forRoot({...})`.

| Opción              | Tipo    | Default    | Descripción                                        |
| ------------------- | ------- | ---------- | -------------------------------------------------- |
| `title`             | string  | `''`       | Título del mensaje del toast                       |
| `position`          | enum    | `TopRight` | Posición del stack de toasts                       |
| `duration`          | number  | `3000`     | Tiempo de vida en milisegundos (con `autoClose`)   |
| `closeButton`       | boolean | `false`    | Mostrar botón de cerrar                            |
| `tapDismiss`        | boolean | `false`    | Cerrar al hacer click en el toast                  |
| `autoClose`         | boolean | `true`     | Cerrar automáticamente tras `duration`             |
| `animationDuration` | number  | `200`      | Duración de la transición CSS al abrir/cerrar (ms) |

## `show()` genérico

Además de los cuatro métodos tipados (`showToastSuccess`, `showToastInfo`, `showToastWarning`,
`showToastError`), también hay un método genérico disponible:

```typescript
import { NgxToastType } from 'ngx-toastf'

toastService.show(NgxToastType.Info, 'Hola mundo!')
```

## Apilado

Llamar a `showToastX()`/`show()` de nuevo mientras un toast está visible **apila** un nuevo toast
en lugar de reemplazar el existente - varios toasts (incluso en la misma posición) coexisten hasta
que cada uno se cierra por su cuenta.
