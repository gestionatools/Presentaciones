# Editor de Presentaciones HTML (GitHub + Vercel)

Aplicación web para gestionar presentaciones existentes del repo con dos modos:

- **Modo Visualización**: permite ver presentaciones ya existentes en carpetas.
- **Modo Edición**: permite editar archivos (`.html`, `.css`, `.js`) y guardar cambios como **nueva versión** en una carpeta numerada.

## Estructura

- `public/index.html`
- `public/editor.html`
- `js/app.js`
- `js/editor.js`
- `js/githubService.js`
- `js/preview.js`
- `api/getFiles.js`
- `api/getFile.js`
- `api/saveFile.js`
- `api/commitChanges.js`
- `vercel.json`

## Variables de entorno en Vercel

- `GITHUB_TOKEN`
- `GITHUB_OWNER`
- `GITHUB_REPO`
- `GITHUB_BRANCH`

## Flujo funcional

1. Abrir `/editor` o `/public/editor`.
2. Seleccionar una presentación existente del selector de carpetas.
3. **Visualización**: cargar la presentación principal en iframe.
4. **Edición**: abrir un archivo, editar en Monaco y previsualizar en vivo.
5. Guardar: el backend crea una carpeta versionada (`<carpeta>_v001`, `_v002`, etc.) y guarda allí el archivo editado.
6. El commit en GitHub dispara redeploy automático en Vercel.

## Compatibilidad de carga de presentaciones

- Si existen variables GitHub configuradas, el editor carga archivos desde GitHub API.
- Si no existen variables GitHub, el editor cae automáticamente a lectura desde filesystem del proyecto para no perder la visualización de presentaciones existentes.
