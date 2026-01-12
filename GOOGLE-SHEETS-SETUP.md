# 📊 Configuración de Google Sheets - Guía Completa

Esta guía te llevará paso a paso para conectar tu aplicación Wealth Management con Google Sheets.

---

## 📑 Tabla de Contenidos

1. [Resumen General](#resumen-general)
2. [Paso 1: Crear Proyecto en Google Cloud](#paso-1-crear-proyecto-en-google-cloud)
3. [Paso 2: Habilitar Google Sheets API](#paso-2-habilitar-google-sheets-api)
4. [Paso 3: Configurar Pantalla de Consentimiento OAuth](#paso-3-configurar-pantalla-de-consentimiento-oauth)
5. [Paso 4: Crear Credenciales](#paso-4-crear-credenciales)
6. [Paso 5: Configurar la Aplicación](#paso-5-configurar-la-aplicación)
7. [Paso 6: Uso de la Sincronización](#paso-6-uso-de-la-sincronización)
8. [Solución de Problemas](#solución-de-problemas)

---

## Resumen General

### ¿Qué podrás hacer?

- ✅ **Push** - Enviar todas tus transacciones desde la app a Google Sheets
- ✅ **Pull** - Importar transacciones desde Google Sheets a la app
- ✅ **Sincronización en tiempo real** - Conectar directamente con tu cuenta de Google
- ✅ **Colaboración** - Compartir sheets con contadores o asesores

### ¿Qué necesitas?

- Cuenta de Google (Gmail)
- 15-20 minutos para la configuración inicial
- Tu aplicación corriendo localmente (`npm run dev`)

---

## Paso 1: Crear Proyecto en Google Cloud

### 1.1 Acceder a Google Cloud Console

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Inicia sesión con tu cuenta de Google

### 1.2 Crear Nuevo Proyecto

1. Haz clic en el selector de proyectos en la parte superior
2. Haz clic en **"Nuevo Proyecto"** (New Project)
3. Ingresa los detalles:
   - **Nombre del proyecto**: `Wealth Management App`
   - **Organización**: Déjalo por defecto
4. Haz clic en **"Crear"** (Create)
5. Espera unos segundos mientras se crea el proyecto

### 1.3 Seleccionar el Proyecto

1. Una vez creado, selecciona el proyecto del selector de proyectos
2. Verás el nombre del proyecto en la barra superior

---

## Paso 2: Habilitar Google Sheets API

### 2.1 Acceder a la Biblioteca de APIs

1. En el menú lateral izquierdo, ve a:
   - **APIs y servicios** → **Biblioteca** (Library)

   O busca "API Library" en la barra de búsqueda superior

### 2.2 Buscar y Habilitar Google Sheets API

1. En el cuadro de búsqueda, escribe: **"Google Sheets API"**
2. Haz clic en **"Google Sheets API"** en los resultados
3. Haz clic en el botón **"Habilitar"** (Enable)
4. Espera a que se habilite (toma unos segundos)

### 2.3 Verificar

- Deberías ver "API habilitada" con una marca verde
- Ahora estás en la página de la API

---

## Paso 3: Configurar Pantalla de Consentimiento OAuth

### 3.1 Acceder a Configuración OAuth

1. En el menú lateral, ve a:
   - **APIs y servicios** → **Pantalla de consentimiento de OAuth** (OAuth consent screen)

### 3.2 Configurar Tipo de Usuario

1. Selecciona **"Externo"** (External)
2. Haz clic en **"Crear"** (Create)

### 3.3 Información de la Aplicación

Completa el formulario:

**Página 1: Información de la app**
- **Nombre de la aplicación**: `Wealth Management`
- **Correo del usuario de asistencia**: Tu email
- **Logo de la aplicación**: (opcional)
- **Dominio de la aplicación**: Déjalo vacío por ahora
- **Correo del desarrollador**: Tu email

Haz clic en **"Guardar y continuar"**

**Página 2: Permisos**
1. Haz clic en **"Agregar o quitar permisos"** (Add or Remove Scopes)
2. Busca: **"Google Sheets API"**
3. Marca:
   - `https://www.googleapis.com/auth/spreadsheets` (Ver y administrar todas tus hojas de cálculo)
4. Haz clic en **"Actualizar"** (Update)
5. Haz clic en **"Guardar y continuar"**

**Página 3: Usuarios de prueba**
1. Haz clic en **"Agregar usuarios"** (Add Users)
2. Ingresa tu dirección de email
3. Haz clic en **"Agregar"** (Add)
4. Haz clic en **"Guardar y continuar"**

**Página 4: Resumen**
- Revisa la información
- Haz clic en **"Volver al panel"** (Back to Dashboard)

---

## Paso 4: Crear Credenciales

### 4.1 Crear API Key

1. Ve a **APIs y servicios** → **Credenciales** (Credentials)
2. Haz clic en **"Crear credenciales"** (Create Credentials) en la parte superior
3. Selecciona **"Clave de API"** (API Key)
4. Se generará una API Key
5. **IMPORTANTE**: Copia esta clave y guárdala - la necesitarás después

**Opcional - Restringir la API Key:**
1. Haz clic en **"Restringir clave"** (Restrict Key)
2. En "Restricciones de API":
   - Selecciona "Restringir clave"
   - Marca solo "Google Sheets API"
3. Haz clic en **"Guardar"**

### 4.2 Crear OAuth 2.0 Client ID

1. Nuevamente en **Credenciales**, haz clic en **"Crear credenciales"**
2. Selecciona **"ID de cliente de OAuth"** (OAuth Client ID)
3. Tipo de aplicación: Selecciona **"Aplicación web"** (Web application)
4. Configura:
   - **Nombre**: `Wealth Management Web Client`
   - **Orígenes de JavaScript autorizados**:
     - Haz clic en **"Agregar URI"**
     - Agrega: `http://localhost:5173` (o el puerto que uses)
   - **URI de redireccionamiento autorizadas**:
     - Haz clic en **"Agregar URI"**
     - Agrega: `http://localhost:5173`
5. Haz clic en **"Crear"** (Create)

### 4.3 Copiar Credenciales

Aparecerá un modal con:
- **ID de cliente** (Client ID)
- **Secreto del cliente** (Client Secret) - no lo necesitarás

**IMPORTANTE**: Copia el **ID de cliente** completo (termina en `.apps.googleusercontent.com`)

---

## Paso 5: Configurar la Aplicación

### 5.1 Verificar Credenciales en el Código

Las credenciales ya están configuradas en `src/components/GoogleSheetsSync.jsx`:

```javascript
// Líneas 29-30 y 51-52
const GOOGLE_API_KEY = 'AIzaSyA8CdD8RP4HjD1zN00-qp3dxAD4OKzvWb4';
const GOOGLE_CLIENT_ID = '838075476269-oi80gmn3ej0f2trhpcqm4e9f4rqf8em8.apps.googleusercontent.com';
```

✅ **Ya están listas para usar**

### 5.2 Verificar Configuración

1. Abre la aplicación en tu navegador
2. Inicia sesión (admin/admin)
3. Busca la tarjeta **"Google Sheets Sync"**
4. Debería aparecer el botón "Connect to Google"

---

## Paso 6: Uso de la Sincronización

### 6.1 Conectar tu Cuenta de Google

1. Haz clic en **"Connect to Google"**
2. Se abrirá una ventana de autorización de Google
3. Selecciona tu cuenta de Google
4. Verás una advertencia: **"Google hasn't verified this app"**
   - Haz clic en **"Advanced"** (Avanzado)
   - Haz clic en **"Go to Wealth Management (unsafe)"**
5. Revisa los permisos solicitados
6. Haz clic en **"Continue"** o **"Permitir"**
7. La ventana se cerrará y verás "Connected" en la app

### 6.2 Preparar tu Google Sheet

#### Opción A: Crear Nueva Sheet

1. Ve a [Google Sheets](https://sheets.google.com)
2. Haz clic en **"En blanco"** (Blank)
3. En la primera fila, crea los encabezados:
   - A1: `amount`
   - B1: `category`
   - C1: `date`
4. Copia el ID de la sheet desde la URL:
   - URL: `https://docs.google.com/spreadsheets/d/SHEET_ID_AQUI/edit`
   - Copia solo la parte `SHEET_ID_AQUI`

#### Opción B: Usar Sheet Existente

1. Abre tu Google Sheet existente
2. Asegúrate de que tiene las columnas: `amount`, `category`, `date`
3. Copia el Sheet ID de la URL

### 6.3 Push - Enviar Datos a Google Sheets

1. Pega el Sheet ID en el campo **"Sheet ID"**
2. Asegúrate de tener transacciones en la app
3. Haz clic en **"Push"** ⬆️
4. Espera el mensaje de confirmación
5. Abre tu Google Sheet - verás todas las transacciones

### 6.4 Pull - Importar Datos desde Google Sheets

1. Abre tu Google Sheet
2. Agrega o modifica transacciones (respetando el formato)
3. En la app, con el Sheet ID ingresado
4. Haz clic en **"Pull"** ⬇️
5. Las transacciones se importarán a la app

---

## Solución de Problemas

### ❌ Error: "Google API is still loading"

**Causa:** El script de Google no se ha cargado completamente

**Solución:**
1. Espera unos segundos
2. Recarga la página (F5)
3. Verifica tu conexión a internet

---

### ❌ Error: "Failed to connect to Google Sheets"

**Causa:** Credenciales incorrectas o no configuradas

**Solución:**
1. Verifica que las credenciales están en `GoogleSheetsSync.jsx` (líneas 29-30 y 51-52)
2. Verifica que las credenciales son correctas
3. Limpia la caché del navegador y recarga
4. Reinicia el servidor (`npm run dev`)
5. Limpia la caché del navegador (Ctrl+Shift+Delete)

---

### ❌ Error: "Google hasn't verified this app" y no puedo continuar

**Causa:** No agregaste tu email como usuario de prueba

**Solución:**
1. Ve a Google Cloud Console
2. Ve a **OAuth consent screen**
3. En **"Test users"**, agrega tu email
4. Guarda los cambios
5. Intenta conectar nuevamente

---

### ❌ Error: "Failed to sync to Google Sheets"

**Causa:** Sheet ID incorrecto o sin permisos

**Solución:**
1. Verifica que el Sheet ID es correcto
2. Asegúrate de que tu cuenta de Google tiene acceso de edición a la sheet
3. Verifica que la sheet tiene una hoja llamada "Sheet1"
4. Si cambiaste el nombre de la hoja, actualiza el código (línea 94 del componente)

---

### ❌ Error: "No valid transactions found in the sheet"

**Causa:** Formato incorrecto en Google Sheets

**Solución:**
1. Verifica que la primera fila tiene los encabezados exactos: `amount`, `category`, `date`
2. Verifica que las filas tienen datos en las 3 columnas
3. Verifica que `amount` es un número (sin símbolos de moneda)
4. Verifica que `date` está en formato YYYY-MM-DD

---

### ❌ Error: "Origin mismatch" o "Redirect URI mismatch"

**Causa:** La URL donde corre tu app no está autorizada

**Solución:**
1. Ve a Google Cloud Console → Credenciales
2. Haz clic en tu OAuth Client ID
3. En "Orígenes de JavaScript autorizados", agrega la URL exacta donde corre tu app
4. Ejemplo: `http://localhost:5173` o `https://tu-dominio.com`
5. Guarda los cambios
6. Espera 5 minutos para que los cambios se propaguen
7. Intenta nuevamente

---

## Formato de Datos en Google Sheets

### Estructura Requerida

Tu Google Sheet debe tener exactamente este formato:

| amount | category | date |
|--------|----------|------|
| 45.99 | Food | 2026-01-10 |
| 120.00 | Transport | 2026-01-11 |
| 89.50 | Entertainment | 2026-01-12 |

### Reglas Importantes

1. **Primera fila = Encabezados** (exactamente: `amount`, `category`, `date`)
2. **amount**: Solo números, sin símbolos ($, €, etc.)
3. **category**: Una de las categorías soportadas (Business, Travel, Food, etc.)
4. **date**: Formato YYYY-MM-DD (2026-01-12)

### Categorías Soportadas

- Business
- Travel
- Food
- Transport
- Entertainment
- Health
- Education
- Clothing
- Home
- Technology

---

## Consejos y Mejores Prácticas

### 🔄 Sincronización Regular

- **Push después de agregar transacciones**: Mantén tu sheet actualizada
- **Pull antes de revisar**: Asegúrate de tener los datos más recientes

### 🔒 Seguridad

- **API Key y Client ID públicos**: Es seguro tenerlos en el código (OAuth protege tu cuenta)
- **OAuth consent screen**: Solo usuarios autorizados pueden usar la app
- **Test users**: Agrega emails específicos que puedan conectarse

### 📊 Colaboración

1. **Comparte tu Google Sheet** con contadores o asesores
2. Ellos pueden ver y editar datos
3. **Pull** para traer sus cambios a la app
4. **Push** para enviar tus actualizaciones

### 💾 Respaldos

- Google Sheets guarda automáticamente
- Puedes ver el historial de versiones: Archivo → Historial de versiones
- Descarga copias regularmente: Archivo → Descargar → Excel (.xlsx)

---

## Preguntas Frecuentes

**P: ¿Puedo usar múltiples Google Sheets?**
R: Sí, solo cambia el Sheet ID cada vez. Cada sheet puede tener diferentes conjuntos de datos.

**P: ¿Se sincronizan automáticamente los cambios?**
R: No, debes hacer clic en Push o Pull manualmente. Esto te da control total sobre cuándo sincronizar.

**P: ¿Puedo desconectar mi cuenta de Google?**
R: Sí, haz clic en "Disconnect" en la tarjeta de Google Sheets Sync.

**P: ¿Qué pasa si hago Push con datos existentes en la sheet?**
R: Los datos existentes se sobrescriben completamente. Si quieres preservar datos, haz Pull primero.

**P: ¿Funciona con Google Workspace (cuentas corporativas)?**
R: Sí, pero necesitarás que el administrador de tu workspace apruebe la aplicación.

**P: ¿Puedo publicar la app para que otros la usen?**
R: Sí, pero necesitarás:
1. Verificar tu aplicación con Google (proceso de revisión)
2. Configurar un dominio real (no localhost)
3. Actualizar las URIs autorizadas en Google Cloud Console

---

## Recursos Adicionales

- [Documentación de Google Sheets API](https://developers.google.com/sheets/api)
- [Google Cloud Console](https://console.cloud.google.com/)
- [OAuth 2.0 Playground](https://developers.google.com/oauthplayground/)

---

## Información de Versión

- **Aplicación**: Wealth Management Executive Dashboard
- **Integración Google Sheets**: v1.0
- **Última Actualización**: 12 de Enero 2026

---

**¿Necesitas ayuda?** Abre un issue en GitHub o contacta al equipo de desarrollo.

**© 2026 Wealth Management. Seguro • Encriptado • Confidencial**
