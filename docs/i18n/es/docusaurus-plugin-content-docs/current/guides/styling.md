---
title: Estilos
sidebar_position: 2
---

# Estilos

Cada toast recibe una clase base `ngx-toast` más un modificador de tipo (`ngx-toast--success` /
`-info` / `-warning` / `-error`) y uno de estado (`ngx-toast--opening` / `-open` / `-closing`).
Sobrescribí las clases de tipo para personalizar los colores:

```scss
.ngx-toast--success {
  background-color: green !important;
}
.ngx-toast--error {
  background-color: pink !important;
}
```

La duración de la transición CSS de apertura/cierre se controla con la opción
`animationDuration` (default `200`ms) y se aplica vía un estilo inline `transition-duration`, así
se mantiene sincronizada con el timer que remueve el toast del DOM.
