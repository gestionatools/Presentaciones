# Log de cambios

## v2.13.0 - 2026-04-29
- Se añadió un botón flotante visible **“Entrar en modo edición”** en las presentaciones que usan `tweaks-panel.jsx`, para poder activar la edición sin depender de atajos o integraciones externas.
- Se evolucionó el MODO EDICIÓN a un flujo más visual:
  - activación/desactivación explícita de **Edición visual**,
  - selección con resaltado,
  - **drag & drop** de elementos seleccionados en la slide activa,
  - **resize contextual** mediante tirador visual en la esquina inferior derecha del elemento seleccionado.
- Se consolidó la mejora en los tres entornos de presentación (`ARCHIVO/`, `Archivo 2/` y `Configuracion procesos - Gestiona/`) al sincronizar `tweaks-panel.jsx`.
- Consolidación de versión de la app: **v2.13.0**.

## v2.12.0 - 2026-04-29
- Se incorporó un **MODO EDICIÓN** reutilizable en `tweaks-panel.jsx` (aplicado en `ARCHIVO/`, `Archivo 2/` y `Configuracion procesos - Gestiona/`) con capacidades de:
  - seleccionar elementos en slide,
  - sustituir imágenes con recursos de `recursos/`,
  - editar texto seleccionado,
  - eliminar objetos seleccionados,
  - añadir imágenes nuevas al slide activo.
- Se añadió la sección `EditModeTools` en los paneles React de `ARCHIVO/Archivo electronico - Gestiona.html` y `Archivo 2/Archivo electronico - Gestiona.html` para habilitar edición directa desde el panel.
- Se integró un panel de tweaks mínimo en `Configuracion procesos - Gestiona/Configuración de procesos - Gestiona.html` para activar el MODO EDICIÓN también en esta presentación.
- Consolidación de versión de la app: **v2.12.0**.

## v2.11.0 - 2026-04-29
- En la diapositiva de **Flujo y lógicas de tramitación** (`Configuracion procesos - Gestiona/Configuración de procesos - Gestiona.html`) se sustituyeron los iconos del primer pantallazo por recursos gráficos locales según la correspondencia solicitada:
  - **Fases resolutorias** → `recursos/resolucion.png`
  - **Subprocesos** → `recursos/flujograma.png`
  - **Nodos especiales** → `recursos/automatización.png`
- Se mantiene coherencia visual con el inventario de recursos y se evita dependencia de iconografía previa no alineada con el criterio actual.
- Consolidación de versión de la app: **v2.11.0**.

## v2.10.0 - 2026-04-29
- Se creó `conocimientos.md` con una base detallada y estructurada sobre: tesauros (modelo de datos), tipologías y tipado fuerte, niveles de configuración, obligatoriedad, clasificación/agrupación, momento de captura, estados de tramitación, tipos de tareas, lógicas de salida, automatización, subprocesos y circuitos de resolución.
- Se incorporó en `conocimientos.md` una guía editorial para trasladar estos conceptos a presentaciones, incluyendo mensajes clave, errores a evitar y checklist operativo previo al diseño.
- Se actualizó `AGENTS.md` para establecer la instrucción explícita de consultar `conocimientos.md` siempre que se soliciten slides o presentaciones, y priorizarlo ante ambigüedad conceptual.
- Consolidación de versión de la app: **v2.10.0**.

## v2.8.0 - 2026-04-29
- Se creó `instrucciones para la incorporación de recursos gráficos.md` con inventario completo de recursos en `recursos/`, descripción y guía de uso coherente por tipología.
- Se estableció en ese documento la regla operativa para futuras altas de recursos: registrar archivo, describir y recomendar uso.
- Se revisó la presentación `Configuracion procesos - Gestiona/Configuración de procesos - Gestiona.html` (slide de piezas del proceso) y se sustituyó el icono externo de analítica por recurso local `recursos/configuración.png` para mantener coherencia visual y dependencia interna del repositorio.
- Consolidación de versión de la app: **v2.8.0**.


## v2.7.0 - 2026-04-29
- Se rediseñó la diapositiva 8 (`Configuracion procesos - Gestiona/Configuración de procesos - Gestiona.html`) con una distribución asimétrica moderna (bloque editorial + columna vertical de tarjetas) para diferenciarla visualmente de la diapositiva 7.
- Se rediseñó la diapositiva 9 con layout en cuadrícula 2x2 y tarjeta principal de ancho completo para romper la estructura repetida de tres tarjetas homogéneas.
- Se corrigió el pie de la diapositiva 8 de `08 / 12` a `08 / 13` para mantener coherencia con el total actual de slides.
- Se añadió una animación sutil y elegante `elegantFloat` en `Configuracion procesos - Gestiona/styles-config.css`, aplicada a la columna de tarjetas de la diapositiva 8.
- Consolidación de versión de la app: **v2.7.0**.

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

## v2.5.0 - 2026-04-29
- Se rehízo la diapositiva **09 Flujo y lógicas** en `Configuracion procesos - Gestiona/Configuración de procesos - Gestiona.html` para que siga la misma estructura visual de la diapositiva 07 (título + lead + 3 tarjetas horizontales).
- Se incorporaron iconos específicos para la diapositiva de flujo: `recursos/icono-subprocesos.svg`, `recursos/icono-fases.svg` y `recursos/icono-nodos.svg`.
- Se dividió el contenido de la antigua diapositiva de **Modelo de datos y agentes** en dos diapositivas independientes y homogéneas con la 07:
  - Nueva diapositiva 10: **Modelo de datos del procedimiento**.
  - Nueva diapositiva 11: **Agentes, roles y órganos resolutorios**.
- Se renumeró la secuencia final de la presentación de 12 a 13 diapositivas para mantener coherencia en pies y etiquetas.

## v2.6.0 - 2026-04-29
- Slide 2 (`Configuracion procesos - Gestiona/Configuración de procesos - Gestiona.html`): se sustituyó la animación `pulse` por una animación de entrada de izquierda a derecha para los 3 bloques de contenidos.
- `Configuracion procesos - Gestiona/styles-config.css`: se eliminó la keyframe `pulse`, se añadió `@keyframes enterLeft` y la clase de animación `.enter-ltr` para controlar el efecto solicitado.
- Slide 4 (`Configuracion procesos - Gestiona/Configuración de procesos - Gestiona.html`): se eliminó el texto "Si una pieza está incompleta...", se renombró "Arquitectura mínima viable" por "Arquitectura de la plataforma" y se redistribuyó el espacio del layout.
- Slide 4: se añadió un cuarto bloque "Analítica de datos" con icono de gráfico de tarta y se equilibró la grilla en 2x2.
- Consolidación de versión de la app: **v2.6.0**.

## v2.9.0 - 2026-04-29
- Se creó `AGENTS.md` en la raíz del repositorio con directrices obligatorias para diseño de presentaciones: revisión de presentaciones existentes, uso del documento de recursos gráficos, estilo elegante y consistente, animaciones sencillas y tono moderno.
- Consolidación de versión de la app: **v2.9.0**.

## v1.0.0 - 2026-04-29
- Se construyó una aplicación web completa tipo editor de presentaciones HTML.
- Se añadieron las pantallas `public/index.html` y `public/editor.html` con sidebar, editor Monaco, botón guardar y preview iframe en vivo.
- Se implementaron módulos frontend en `js/` para carga de archivos, edición, preview por Blob y persistencia vía API.
- Se implementaron API routes en `api/` para listar, leer y guardar archivos en GitHub usando variables de entorno seguras.
- Se añadió `vercel.json` para rutas limpias (`/` y `/editor`) y despliegue compatible con Vercel.
- Se actualizó `.gitignore` con exclusiones de entorno y artefactos locales.
- Se creó documentación operativa y de despliegue en `README.md`.

## v1.0.1 - 2026-04-29
- Se corrigió el enrutado en `vercel.json` para evitar el error 404 NOT_FOUND al abrir `/public/editor`.
- Se añadieron reescrituras de compatibilidad para `/public/editor`, `/public/editor.html`, `/public/index` y `/public/index.html`.
- Se actualizó el enlace principal en `public/index.html` para usar `/editor` como ruta canónica y se documentó la ruta de compatibilidad.

## v1.1.0 - 2026-04-29
- Se añadió modo **Visualización** en el editor para ver presentaciones existentes en carpetas del repositorio.
- Se añadió selector de presentación para navegar por carpetas y listar archivos asociados.
- En modo visualización, el iframe carga la presentación principal (`.html`) de la carpeta seleccionada.
- Se reforzó el modo **Edición** para permitir editar archivos existentes con Monaco y preview en vivo.
- Se cambió la lógica de guardado: ahora cada guardado crea una nueva carpeta versionada (`<carpeta>_v001`, `<carpeta>_v002`, ...), conservando la ruta interna del archivo editado.
- `api/getFiles.js` ahora devuelve además estructura de presentaciones agrupadas por carpeta.
- `README.md` actualizado con el nuevo flujo de visualización + versionado.

## v1.1.1 - 2026-04-29
- Se recuperó la funcionalidad de carga de presentaciones en el selector cuando no hay variables GitHub configuradas.
- `api/getFiles.js` ahora usa doble origen: GitHub API (si hay credenciales) o escaneo de filesystem del proyecto (fallback).
- `api/getFile.js` también incorpora fallback a filesystem para poder abrir archivos de presentaciones locales y visualizarlos/editarlos.
- Se añadió normalización y validación de rutas en lectura de archivo para evitar rutas inválidas.
