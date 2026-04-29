# Log de cambios

## v2.1.1 - 2026-04-29
- Se corrigió la lógica visual de animaciones en `Configuracion procesos - Gestiona/styles-config.css` para que el contenido también se renderice cuando el slide activo usa el atributo `data-deck-active` (mecanismo real de `deck-stage.js`).
- Se actualizaron los selectores de estado activo/inactivo (`.anim`, `.draw`, `.grow`, `.pulse`, `.drift`, `.spin`) para evitar que el texto y bloques queden en `opacity: 0` en todas las diapositivas.
- Resultado: vuelve a verse el contenido completo de las diapositivas en la presentación de Configuración de procesos.

## v2.0.0 - 2026-04-29
- Se creó una copia independiente de la presentación base en `Archivo 2/`.
- En la Slide 1 se eliminó el texto "Módulo formativo".
- En la Slide 5 se consolidaron las fases 3, 4 y 5 en una sola fase llamada **Archivado (OAIS)**.
- En la Slide 5 se adaptó el título de "Cinco fases" a "Tres fases" y se actualizó el subtítulo con referencia explícita a OAIS.
- Se eliminó completamente la Slide 8.
- Se eliminó completamente la Slide 9.
- En la Slide 12 se eliminaron referencias a PAdES, CRL, OCSP y LTA, así como el texto "Por qué resellar".
- Se eliminó completamente la Slide 13.
- Se eliminó completamente la Slide 14.
- En la Slide 15 se cambió el enfoque a un mensaje más técnico y menos comercial.
- Se actualizó el contador global de diapositivas de 16 a 12 para mantener coherencia.

## v2.1.0 - 2026-04-29
- Se creó una nueva carpeta `Configuracion procesos - Gestiona/` con una presentación completamente nueva para formación de máster.
- Se añadió el archivo `Configuración de procesos - Gestiona.html` con 11 diapositivas y narrativa en 3 bloques: plataforma, ejecución y entregables normalizados.
- Se incorporó enfoque explícito de design thinking (Empatizar, Definir, Idear, Prototipar, Testear) en una slide específica.
- Se reutilizaron los recursos visuales y de animación existentes copiando `styles-archivo.css`, `deck-stage.js` y `tweaks-panel.jsx` a la nueva carpeta.
- Se mantuvo tono formativo orientado a clase magistral y consultoría aplicada en Gestiona.
