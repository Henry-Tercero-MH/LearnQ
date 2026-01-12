# 🚀 Inicio Rápido - Google Sheets

## ✅ Configuración Completada

Tus credenciales ya están configuradas directamente en el código:
- ✅ API Key configurada en `GoogleSheetsSync.jsx`
- ✅ Client ID configurado en `GoogleSheetsSync.jsx`

## 📝 Pasos para Probar

### 1. Iniciar el Servidor

```bash
npm run dev
```

### 2. Abrir la Aplicación

1. Ve a `http://localhost:5173`
2. Inicia sesión con: `admin` / `admin`
3. Busca la tarjeta **"Google Sheets Sync"** (tercera columna en la sección de Excel)

### 3. Conectar con Google

1. Haz clic en **"Connect to Google"**
2. Se abrirá una ventana de Google
3. Selecciona tu cuenta de Google (la que usaste en Google Cloud Console)
4. Verás: **"Google hasn't verified this app"**
   - Haz clic en **"Advanced"** (Avanzado)
   - Haz clic en **"Go to Wealth Management (unsafe)"** (Ir a Wealth Management (no seguro))
5. Revisa los permisos y haz clic en **"Allow"** (Permitir)
6. La ventana se cerrará y verás **"Connected"** en la app

### 4. Preparar tu Google Sheet

#### Opción A: Crear Nueva Sheet

1. Ve a [Google Sheets](https://sheets.google.com)
2. Haz clic en **"En blanco"** o **"Blank"**
3. En la primera fila, escribe:
   - A1: `amount`
   - B1: `category`
   - C1: `date`
4. Copia el ID de la URL:
   ```
   https://docs.google.com/spreadsheets/d/1abc123XYZ456/edit
                                        ^^^^^^^^^^^^^^
                                        Este es tu Sheet ID
   ```

#### Opción B: Usa esta Plantilla

Crea una sheet con este formato:

| amount | category | date |
|--------|----------|------|
| 45.99 | Food | 2026-01-12 |
| 120.00 | Transport | 2026-01-13 |
| 89.50 | Entertainment | 2026-01-14 |

### 5. Sincronizar

#### Push (Enviar a Google Sheets)

1. Agrega algunas transacciones en la app
2. Pega tu Sheet ID en el campo **"Sheet ID"**
3. Haz clic en **"Push"** ⬆️
4. Abre tu Google Sheet - ¡verás todas las transacciones!

#### Pull (Importar desde Google Sheets)

1. Agrega o modifica datos en tu Google Sheet
2. En la app, con el Sheet ID ingresado
3. Haz clic en **"Pull"** ⬇️
4. ¡Las transacciones aparecerán en la app!

---

## 🔧 Solución Rápida de Problemas

### ❌ "Failed to connect to Google Sheets"

1. Limpia la caché del navegador (Ctrl+Shift+Delete)
2. Recarga la página (F5)
3. Verifica la consola del navegador por errores

### ❌ "Google hasn't verified this app" y no puedo continuar

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Ve a **APIs y servicios** → **OAuth consent screen**
3. Scroll down hasta **"Test users"**
4. Haz clic en **"Add Users"**
5. Agrega tu email de Google
6. Guarda e intenta conectar nuevamente

### ❌ "Failed to sync to Google Sheets"

1. Verifica que el Sheet ID es correcto (sin espacios)
2. Asegúrate de que tu cuenta de Google tiene permiso de edición
3. Verifica que la hoja se llama "Sheet1" (o Sheet1 en inglés)

---

## 📊 Formato de Datos

### Columnas Requeridas

Tu Google Sheet **debe** tener estas 3 columnas en la primera fila:

- `amount` - Número sin símbolos (ej: 150.50)
- `category` - Una de las categorías válidas
- `date` - Formato YYYY-MM-DD (ej: 2026-01-12)

### Categorías Válidas

Business, Travel, Food, Transport, Entertainment, Health, Education, Clothing, Home, Technology

---

## 💡 Consejos

1. **Haz Push regularmente** para respaldar tus datos
2. **Haz Pull antes de revisar** para tener datos actualizados
3. **Comparte tu Sheet** con contadores o asesores
4. **Descarga copias** de tu Sheet regularmente

---

## 🔒 Seguridad

⚠️ **IMPORTANTE**:
- Las credenciales están en el código en `GoogleSheetsSync.jsx`
- Estas son credenciales públicas de OAuth (seguras para cliente)
- Google protege tu cuenta con OAuth consent screen
- Solo usuarios autorizados pueden acceder a tus Sheets

---

## 📚 Documentación Completa

Para más detalles, consulta:
- [GOOGLE-SHEETS-SETUP.md](GOOGLE-SHEETS-SETUP.md) - Guía completa de configuración
- [INTEGRACION-EXCEL.md](INTEGRACION-EXCEL.md) - Guía de Excel Import/Export

---

**¡Listo para sincronizar! 🎉**
