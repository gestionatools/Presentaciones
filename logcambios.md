# Log de cambios

## v2.4.0 - 2026-04-29
- Se sustituyó el logo de la presentación `Configuracion procesos - Gestiona/Configuración de procesos - Gestiona.html` para usar `recursos/Gestiona-PANTONE.svg` y se ajustó su tamaño visual mediante estilos existentes de cabecera.
- En la diapositiva 2 se limitó la animación tipo pulso a 5 repeticiones en `Configuracion procesos - Gestiona/styles-config.css`.
- En la diapositiva 4 se rediseñaron los bloques de **Modelo de datos**, **Agentes** y **Nodos o tareas** para incorporar imágenes dentro de tarjetas y ajustar su distribución para encaje.
- Se incorporaron nuevos recursos gráficos en `recursos/`: `modelo-datos.svg`, `agentes.svg`, `tareas.svg`.
- En la diapositiva 7 se crearon iconos para sustituir las letras grandes D, T y PDF en la diapositiva de obtención de materiales.
- Se incorporaron nuevos recursos de iconos en `recursos/`: `icono-documentos.svg`, `icono-tramites.svg`, `icono-pdf.svg`.
- En la diapositiva 8 se eliminaron los prefijos 2.1/2.2/2.3 y se resaltaron en azul los títulos **Subprocesos**, **Fases resolutorias** y **Nodos especiales**.

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

## v2.2.0 - 2026-04-29
- Se movió la presentación original y sus dependencias al directorio `ARCHIVO/` para separar el histórico de la nueva app lanzadora.
- Se creó una nueva app principal en `index.html` + `app.js` para listar y abrir directamente todas las presentaciones disponibles en pestañas nuevas.
- Se creó la carpeta `recursos/` para centralizar assets comunes de la nueva app, incluyendo estilos (`recursos/app.css`) y recurso visual (`recursos/brand-wave.svg`).
- Se dejó preparada la estructura para seguir agregando futuras presentaciones al arreglo `presentations` en `app.js`.

## v2.2.1 - 2026-04-29
- Se revisaron las tres presentaciones HTML activas para corregir rutas de imágenes tras la reorganización de carpetas.
- Se sustituyeron todas las referencias de logo desde `assets/logo-gestiona.jpeg` y `../assets/logo-gestiona.jpeg` a la nueva ruta compartida `../recursos/logo-gestiona.svg`.
- Se añadió `recursos/logo-gestiona.svg` para garantizar que el logo esté disponible de forma centralizada para todas las presentaciones.

## v2.3.0 - 2026-04-29
- Se sustituyó el logo en todas las presentaciones HTML activas para usar `recursos/Gestiona-PANTONE.eps`.
- En `Configuracion procesos - Gestiona/Configuración de procesos - Gestiona.html`:
  - Slide 1: se eliminó "Taller guiado..." y se quitó "Máster" dejando "Clase práctica".
  - Slide 2: se cambió "Agenda" por "Contenidos" y se reforzó la aparición animada de los 3 puntos.
  - Slide 4: se eliminaron las letras grandes D, A, N (sustituidas por numeración).
  - Slide 5: se eliminó completamente.
  - Slide 7: se actualizó el título a "Normativa: la base de todo proceso administrativo" y se rediseñó el contenido visual con el flujo Normativa > Documentos administrativos > Modelos de plantillas ESPUBLICO.
  - Slide 8: se rehízo como slide específica de "OBTENCIÓN DE MATERIALES" con mayor detalle de Documentos, Trámites y PDF.
  - Slide 9: se rehízo como slide específica de flujo y lógicas con desglose 2.1/2.2/2.3.
  - Se añadió un nuevo slide 10 para separar y ampliar "Modelo de datos" y "Agentes" (partición del contenido que antes estaba condensado), manteniendo coherencia narrativa.
  - Se renumeraron etiquetas y contadores finales de diapositivas para reflejar la nueva estructura de 12 slides.
