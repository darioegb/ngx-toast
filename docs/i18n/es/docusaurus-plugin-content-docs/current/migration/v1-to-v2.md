---
title: Migrando de 1.x a 2.0
sidebar_position: 1
---

# Migrando de 1.x a 2.0

- `NgToastService`/`NgToastComponent`/`NgToastModule`/`NgToastConfig`/`NgToastPosition`/
  `NgToastType` se renombraron a `NgxToast*`.
- Eliminá `@angular/animations` y `BrowserAnimationsModule` - ya no son necesarios, reemplazados
  por transiciones CSS.
- Eliminá el import CSS de fontello (`ngx-toastf/src/assets/fontello/css/all.min.css`) - los
  íconos ahora son SVG inline, incluidos en el componente.
- `NgToastConfig` ahora es una interfaz (no una clase) - reemplazá `new NgToastConfig({...})` por
  un objeto literal simple.
- Los valores de `position` ahora son string enums (ej. `'top-right'`) en lugar de índices
  numéricos.
- Mostrar un nuevo toast ya no reemplaza uno existente - ahora se apilan. Si dependías del
  comportamiento anterior de toast único/bloqueo de duplicados, cerrá el toast anterior
  explícitamente primero.
- Hay un nuevo método genérico `show(type, message, config?)` disponible junto a los cuatro
  métodos tipados `showToastX()`.
