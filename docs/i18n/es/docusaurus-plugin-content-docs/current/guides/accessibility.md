---
title: Accesibilidad
sidebar_position: 3
---

# Accesibilidad

Todo lo siguiente funciona de forma automática, sin configuración.

## Anuncios para lectores de pantalla

Los toasts se anuncian mediante live regions persistentes y ocultas visualmente, en lugar de que
cada toast sea su propia live region, ya que una región insertada junto con su contenido muchas
veces no se anuncia.

- Los errores se anuncian de forma **assertive**, el resto de forma **polite**.
- El anuncio lleva el tipo como prefijo (`Error: ...`), porque el tipo de otro modo solo se
  transmite por color e icono. El mismo texto está disponible, oculto visualmente, dentro del toast
  para quien navega la página con un lector de pantalla.
- Los toasts nunca roban el foco, así que no interrumpen lo que el usuario está haciendo.

Traduce o cambia el prefijo del tipo y el nombre del botón de cerrar con la configuración:

```typescript
provideNgxToast(
  withToastConfig({
    closeButtonLabel: 'Cerrar',
    typeLabels: {
      success: 'Éxito',
      info: 'Info',
      warning: 'Aviso',
      error: 'Error',
    },
  }),
)
```

`typeLabels` se combina con los valores por defecto, así que solo pasas los tipos que quieras
cambiar.

## Tiempos

Con `autoClose`, el temporizador se pausa mientras el toast tiene el mouse encima o el foco del
teclado (WCAG 2.2.1) y continúa con el tiempo que quedaba. Usa `pauseOnHover: false` para
desactivarlo.

## Teclado

- **`Escape`** cierra el toast más reciente, uno por pulsación. Se ignora si otro manejador ya
  procesó la tecla (por ejemplo un diálogo abierto que llama a `preventDefault()`), y funciona
  tengas o no `closeButton` o `tapDismiss` activados.
- El botón de cerrar es un `<button>` normal, con un contorno visible en `:focus-visible` y un
  área de al menos 24x24px.

## Visual

- Los colores por defecto cumplen el contraste AA de WCAG (4.5:1). Si los sobrescribes, tenlo en
  cuenta.
- Con `prefers-reduced-motion: reduce` los toasts solo hacen fade, ya no se deslizan.
- El título no se renderiza como un heading, así que los toasts no ensucian el esquema de
  encabezados de la página.
