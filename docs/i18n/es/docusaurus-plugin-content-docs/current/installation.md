---
id: installation
title: Instalación
sidebar_position: 2
---

# Instalación

```bash
npm install ngx-toastf --save
```

Eso es todo - `NgxToastService` es `providedIn: 'root'`, así que no necesitás configurar ningún
módulo o provider para que los valores por defecto funcionen.

:::caution Cambio disruptivo en 2.0
`@angular/animations` ya no es una dependencia (reemplazada por transiciones CSS), y la fuente de
íconos fontello desapareció (los íconos ahora son SVG inline) - eliminá ambos de tu configuración
si estás migrando desde 1.x. Ver [Migración](./migration/v1-to-v2.md).
:::
