# 🚀 Configuración Google Apps Script (Método Cafetería)

## 📋 Diferencias con el Método Anterior

| Aspecto | Método Anterior (OAuth) | Método Nuevo (Apps Script) |
|---------|-------------------------|----------------------------|
| **Backend** | No (directo a API) | Sí (Apps Script en Google) |
| **Autenticación** | OAuth2 popup | Sin autenticación |
| **Setup** | Client ID + API Key | Deploy Web App + URL |
| **Código en Sheet** | No | Sí (todo el backend) |
| **Complejidad** | Media | Baja |
| **Multi-usuario** | Cada uno su Sheet | Todos comparten Sheet |

---

## 🎯 Ventajas del Nuevo Método

✅ **Sin OAuth popup** - Experiencia más fluida
✅ **Sin credenciales expuestas** - Todo en Apps Script
✅ **Más simple** - Solo una URL a configurar
✅ **Datos centralizados** - Todos comparten la misma Sheet
✅ **Sin límites de OAuth** - Apps Script tiene sus propios límites

---

## 📝 Paso 1: Crear Google Sheet

1. Ve a [Google Sheets](https://sheets.google.com)
2. Crea una nueva hoja en blanco
3. Nombra la hoja: **"LearnQ - Finance Tracker"** (o como quieras)
4. **NO necesitas crear columnas** - Apps Script las creará automáticamente

---

## 💻 Paso 2: Configurar Apps Script

### 2.1 Abrir Editor

1. En tu Google Sheet, ve a **Extensiones → Apps Script**
2. Se abrirá el editor de código
3. Verás un archivo `Code.gs` con código por defecto

### 2.2 Pegar Código

1. **Borra todo** el código por defecto en `Code.gs`
2. Abre el archivo `google-apps-script.js` de tu proyecto
3. **Copia TODO el código**
4. **Pégalo** en el editor de Apps Script
5. Haz clic en **Guardar** (icono de disco o Ctrl+S)

### 2.3 Probar Código (Opcional)

1. En la parte superior, selecciona la función `testScript` en el dropdown
2. Haz clic en **Ejecutar** (▶️)
3. La primera vez, pedirá permisos:
   - Haz clic en **Revisar permisos**
   - Selecciona tu cuenta de Google
   - Haz clic en **Avanzado**
   - Haz clic en **Ir a [nombre del proyecto] (no seguro)**
   - Haz clic en **Permitir**
4. Ve a tu Google Sheet - deberías ver dos hojas nuevas:
   - **Transactions** (con headers: id, amount, category, date)
   - **Credentials** (con headers: username, password y una fila: admin, admin)

---

## 🌐 Paso 3: Deploy como Web App

### 3.1 Nueva Implementación

1. En el editor de Apps Script, haz clic en **Deploy** (arriba a la derecha)
2. Selecciona **New deployment** (Nueva implementación)
3. Haz clic en el icono de **⚙️** junto a "Select type"
4. Selecciona **Web app**

### 3.2 Configuración del Deploy

Configure los siguientes valores:

**Description (Descripción):**
```
LearnQ Finance API v1
```

**Execute as (Ejecutar como):**
```
Me (tu email)
```
*Esto es importante - el script se ejecutará con tus permisos*

**Who has access (Quién tiene acceso):**
```
Anyone (Cualquiera)
```
*Esto permite que tu app React acceda al script sin OAuth*

### 3.3 Copiar URL

1. Haz clic en **Deploy** (Implementar)
2. Se mostrará una URL larga como:
   ```
   https://script.google.com/macros/s/AKfycbyXXXXXXXXXXXXXXXXXXXXXXX/exec
   ```
3. **Copia esta URL completa** - la necesitarás en el siguiente paso

---

## ⚛️ Paso 4: Configurar React App

### 4.1 Actualizar Componente

1. Abre `src/components/GoogleSheetsSyncNew.jsx`
2. Busca la línea 6:
   ```javascript
   const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec';
   ```
3. Reemplaza `YOUR_DEPLOYMENT_ID` con tu URL completa:
   ```javascript
   const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyXXXXXXXXXXXXXXXX/exec';
   ```

### 4.2 Actualizar App.jsx

Reemplaza el import y uso del componente viejo por el nuevo:

**Antes:**
```javascript
import GoogleSheetsSync from './components/GoogleSheetsSync';
```

**Después:**
```javascript
import GoogleSheetsSync from './components/GoogleSheetsSyncNew';
```

---

## 🧪 Paso 5: Probar la Integración

### 5.1 Iniciar Servidor

```bash
npm run dev
```

### 5.2 Probar Conexión

1. Abre `http://localhost:5173`
2. Inicia sesión con `admin` / `admin`
3. Busca la tarjeta **"Google Sheets Sync"**
4. Haz clic en **"Connect to Sheets"**
5. Deberías ver: ✅ **"Connected to Google Sheets!"**

### 5.3 Probar Push (Subir)

1. Agrega algunas transacciones en la app
2. Haz clic en **"Push to Sheets"**
3. Deberías ver: ✅ **"Synced X transactions to Google Sheets!"**
4. Ve a tu Google Sheet → Hoja "Transactions"
5. Verás tus transacciones con IDs generados automáticamente

### 5.4 Probar Pull (Bajar)

1. En tu Google Sheet, agrega una fila manualmente:
   ```
   | txn_123 | 50.00 | Food | 2026-01-12 |
   ```
2. En la app, haz clic en **"Pull from Sheets"**
3. Deberías ver: ✅ **"Imported X transactions from Google Sheets!"**
4. La nueva transacción aparecerá en tu app

---

## 🔧 Paso 6: Actualizar Deployment (Cuando Cambies Código)

Si modificas el código de Apps Script:

1. Guarda los cambios (Ctrl+S)
2. Ve a **Deploy → Manage deployments**
3. Haz clic en **✏️ Edit** en tu deployment actual
4. Cambia **Version** a **New version**
5. Haz clic en **Deploy**
6. La URL seguirá siendo la misma (no necesitas cambiar nada en React)

---

## ❌ Solución de Problemas

### Error: "Failed to connect to Google Sheets"

**Causa 1:** URL no configurada
- Verifica que `APPS_SCRIPT_URL` tenga tu URL real
- No debe contener `YOUR_DEPLOYMENT_ID`

**Causa 2:** Deployment no público
- Ve a Apps Script → Deploy → Manage deployments
- Verifica que "Who has access" sea **"Anyone"**

**Causa 3:** CORS bloqueado
- Apps Script debería permitir CORS automáticamente
- Si falla, verifica la consola del navegador

### Error: "Authorization required"

**Causa:** El script se ejecuta como "User accessing the web app"

**Solución:**
1. Ve a Apps Script → Deploy → Manage deployments
2. Haz clic en ✏️ Edit
3. Cambia **"Execute as"** a **"Me"**
4. Deploy nuevamente

### Las transacciones no aparecen

**Causa:** Nombre de hoja incorrecto

**Solución:**
1. Verifica que la hoja se llame exactamente **"Transactions"**
2. Si Apps Script la creó, debería ser correcto
3. Verifica los headers: `id`, `amount`, `category`, `date`

### Error: "Script function not found"

**Causa:** Código no guardado o deployment antiguo

**Solución:**
1. Guarda el código en Apps Script (Ctrl+S)
2. Ve a Deploy → Manage deployments
3. Crea una "New version"

---

## 🔒 Seguridad

### ¿Es seguro "Anyone"?

**Sí, en este contexto:**
- ✅ Solo expones funciones específicas (doGet, doPost)
- ✅ No expones la Sheet directamente
- ✅ Puedes agregar validaciones en Apps Script
- ✅ Google limita requests por usuario

### ¿Cómo proteger más?

**Opción 1: API Key simple**
```javascript
// En Apps Script
function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  const apiKey = data.apiKey;

  if (apiKey !== 'MI_API_KEY_SECRETA') {
    return createResponse({ error: 'Unauthorized' }, 401);
  }

  // ... resto del código
}

// En React
fetch(APPS_SCRIPT_URL, {
  method: 'POST',
  body: JSON.stringify({
    apiKey: 'MI_API_KEY_SECRETA',
    action: 'addTransaction',
    transaction: {...}
  })
});
```

**Opción 2: Rate limiting**
```javascript
// En Apps Script
const cache = CacheService.getScriptCache();

function checkRateLimit(identifier) {
  const key = `rate_${identifier}`;
  const count = cache.get(key) || 0;

  if (count > 100) {
    throw new Error('Rate limit exceeded');
  }

  cache.put(key, parseInt(count) + 1, 3600); // 1 hora
}
```

---

## 📊 Estructura de Datos

### Hoja "Transactions"

| id | amount | category | date |
|----|--------|----------|------|
| txn_1234567890_abc | 150.50 | Food | 2026-01-12 |
| txn_1234567891_def | 75.00 | Transport | 2026-01-13 |

### Hoja "Credentials"

| username | password |
|----------|----------|
| admin | admin |

*Nota: Apps Script crea estas hojas automáticamente la primera vez que se ejecuta*

---

## 🎯 Próximos Pasos

Una vez que todo funcione:

1. **Opcional:** Elimina el componente viejo
   ```bash
   rm src/components/GoogleSheetsSync.jsx
   ```

2. **Opcional:** Elimina dependencias no usadas
   ```bash
   npm uninstall gapi-script googleapis
   ```

3. **Deploy a producción**
   - No necesitas configurar OAuth redirect URIs
   - No necesitas variables de entorno
   - Solo asegúrate de que APPS_SCRIPT_URL esté configurada

---

## 📚 Recursos

- [Apps Script Documentation](https://developers.google.com/apps-script)
- [SpreadsheetApp Reference](https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet-app)
- [Web Apps Guide](https://developers.google.com/apps-script/guides/web)

---

**¡Listo! Tu app ahora usa Google Apps Script como backend, igual que tu proyecto de cafetería** 🎉
