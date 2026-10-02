# App de horas y viáticos — puesta en marcha

La app guarda lo que cargás en el celular y lo agrega como filas en el Excel de tu OneDrive.
Si no hay internet, queda pendiente y se sube sola cuando vuelve la conexión.

## 1) Excel en OneDrive
1. El Excel `Horas_Consultoria.xlsx` tiene que estar en tu OneDrive, en la carpeta `Campana Procesos`
   (ya está configurado así en `config.js` → `excelPath`; si lo movés, actualizá esa ruta).
   Importante: OneDrive solo guarda el Excel. La app se publica aparte, en GitHub Pages (paso 2).
2. Abrilo una vez y borrá las filas de ejemplo cuando ya tengas datos reales.
   No cambies los nombres de las tablas (`tblHoras`, `tblViaticos`, `tblClientes`).

## 2) Publicar la app en GitHub Pages
1. En GitHub, creá un repositorio nuevo (por ejemplo `horas`).
2. "Add file → Upload files": subí todo el contenido de esta carpeta (index.html, config.js, sw.js, manifest.webmanifest, icon-192.png, icon-512.png).
3. Settings → Pages → Branch `main` / carpeta `/ (root)` → Save.
   Quedará en `https://ameliacampana.github.io/horas/`.

## 3) Permitir el inicio de sesión (Azure)
1. Portal de Azure → Microsoft Entra ID → Registros de aplicaciones → la app cuyo ID está en `config.js`.
2. Autenticación → Agregar plataforma → "Aplicación de página única" → URI de redirección:
   `https://ameliacampana.github.io/horas/` (con la barra final).
3. Permisos de API: debe figurar Microsoft Graph → `Files.ReadWrite` (delegado).

## 4) Usarla
1. Abrí la dirección en el celular → "Instalar app" / "Agregar a pantalla de inicio".
2. Tocá **Conectar**, iniciá sesión con tu cuenta de Microsoft. Desde ahí, cada vez que guardes algo se sube al Excel.

## Viáticos
- **Traslado:** se anota desde dónde y hasta dónde, y el medio. Colectivo y otros medios (tren, remis, micro): se carga el costo. Auto: se cargan los km (sin costo).
- **Peaje, combustible, estacionamiento, comida, hospedaje, otros:** se carga el monto; desde/hasta son opcionales.
- El Resumen del Excel suma por mes, por cliente, por concepto y por medio de transporte, con los km en auto.
- Si actualizás desde una versión anterior, **reemplazá también el Excel** en OneDrive (la tabla de viáticos tiene columnas nuevas).

## Fotos de la reunión
- En la pestaña **Horas**, antes de tocar **Guardar horas**, podés sacar o elegir fotos (opcional).
- Quedan guardadas en el teléfono aunque se cierre la app, y al guardar las horas se achican solas (lado mayor 1600 px) y se suben a OneDrive en
  `Campana Procesos/Fotos reuniones/<Cliente>/<AAAA-MM-DD>/`. El nombre incluye la hora de la reunión. Las carpetas se crean solas; se cambian en `config.js` → `carpetaFotos`.
- Sin conexión se suben al volver internet.

## Notas
- Los registros ya subidos no se pueden editar desde la app: corregilos en el Excel.
- "Descargar respaldo" baja una copia de todo lo cargado en el teléfono.
- Cada fila lleva un ID interno (última columna) para poder detectar duplicados más adelante.
