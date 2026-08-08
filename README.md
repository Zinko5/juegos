# Bajos Recursos // Catálogo de Juegos Synthwave

Un sitio web estático premium (sin frameworks, desarrollado únicamente en HTML5, CSS3 y Vanilla JavaScript) que recopila y categoriza juegos online divertidos para ordenadores de bajos recursos. 

El diseño está fuertemente inspirado en la estética **Synthwave / Retro-futurista** de los años 80, incorporando rejillas 3D animadas, filtros CRT scanlines, palmeras vectoriales y una paleta de colores vibrantes basada en luces de neón.

---

## 🚀 Características Clave

*   **Scroll Snapping & Layout Asimétrico:** Cada juego cuenta con su propia sección a pantalla completa en ordenadores, con transiciones de snapping fluidas (`scroll-snap-type`).
*   **Diseño 100% Responsivo:** En dispositivos móviles, el scroll-snapping se deshabilita automáticamente y las tarjetas se reorganizan verticalmente, permitiendo una lectura cómoda y fluida sin recortes de contenido.
*   **Barra de Acciones Flotantes (Izquierda):**
    *   **Filtros:** Panel para filtrar juegos en tiempo real por número de jugadores, peso en disco (GB), precio (gratis/pago), exigencia gráfica y plataformas de juego.
    *   **Al Azar (🔀):** Selecciona y desplaza de forma automática hacia un juego aleatorio que cumpla con los criterios de los filtros activos.
    *   **Sugerir Juego (+):** Salta directamente a la sección del formulario de sugerencias.
*   **Navegación Lateral Inteligente (Derecha):** Lista vertical de burbujas con portadas de los juegos que sigue la navegación. Cuenta con auto-desplazamiento inteligente para enfocar el juego activo si la lista supera el alto de pantalla.
*   **Carga Optimizada:** Integración nativa de carga diferida (`loading="lazy"`) para las imágenes de biblioteca de Steam y recursos de red, haciendo que la página inicial cargue en milisegundos.
*   **Doble Formulario Integrado:** Las sugerencias se guardan automáticamente en una hoja de **Google Sheets** y notifican instantáneamente a un canal de **Discord** mediante un Webhook.

---

## 🛠️ Configuración de Integraciones

### 1. Guardar sugerencias en Google Sheets
Para almacenar los registros del formulario en tu hoja de cálculo:
1. Abre tu [documento de Google Sheets](https://docs.google.com/spreadsheets/d/18Z4J4l75GWJkI6OPSY9gPYG69KpgnH65YmmyvG1Y3nA/).
2. Dirígete a **Extensiones** > **Apps Script** en el menú superior.
3. Sustituye el código predeterminado por el siguiente bloque script:
   ```javascript
   function doPost(e) {
     try {
       var data = JSON.parse(e.postData.contents);
       var sheet = SpreadsheetApp.openById("18Z4J4l75GWJkI6OPSY9gPYG69KpgnH65YmmyvG1Y3nA").getActiveSheet();
       
       sheet.appendRow([
         new Date(),
         data.name,
         data.comments
       ]);
       
       return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
         .setMimeType(ContentService.MimeType.JSON);
     } catch (error) {
       return ContentService.createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
         .setMimeType(ContentService.MimeType.JSON);
     }
   }
   ```
4. Guarda el script (`Ctrl + S`).
5. Pulsa en **Implementar** > **Nueva implementación**.
6. En tipo selecciona **Aplicación web**. Configura:
   *   **Ejecutar como:** `Yo` (tu cuenta)
   *   **Quién tiene acceso:** `Cualquiera` (fundamental para envíos públicos)
7. Haz clic en **Implementar**, concede los permisos de cuenta de Google necesarios y **copia la URL de la aplicación web** (la que termina en `/exec`).
8. Abre tu archivo `app.js` local y pega la URL en la variable `APPS_SCRIPT_URL` en la línea 3:
   ```javascript
   const APPS_SCRIPT_URL = 'PEGA_AQUI_TU_URL_DE_EXEC';
   ```

### 2. Notificaciones en Discord
La URL de Discord Webhook ya se encuentra configurada en el cliente dentro de `app.js` para enviar notificaciones en formato Embed con colores rosa neón:
`https://discordapp.com/api/webhooks/1535499789175889960/-etF65Xs-e5KMbLz06oKVS9O1rKDD_eNPpMxTdrJF8HOZF8Yyxu2NkY0r6dZ-JrZjG8u`

---

## 💻 Ejecución Local

Para probar o visualizar el sitio de forma local:
1. Asegúrate de tener Python instalado en tu máquina.
2. Abre la terminal en el directorio del proyecto y ejecuta:
   ```bash
   python3 -m http.server 8000
   ```
3. Abre tu navegador e ingresa a `http://localhost:8000`.
