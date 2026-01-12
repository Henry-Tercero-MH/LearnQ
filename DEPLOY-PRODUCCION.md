# 🚀 Guía de Despliegue a Producción

## 📋 Problema Identificado

El usuario reporta: "en produccion o en deploy no me permite conectarme el login y talvez toda la conexion"

Esto indica problemas con:
1. **Autenticación local** (login admin/admin)
2. **Conexión con Google Sheets API**

---

## ⚠️ Problemas Comunes en Producción

### 1. OAuth Redirect URIs No Configurados

**Problema**: Google bloquea la autenticación porque tu dominio de producción no está autorizado.

**Solución**: Agrega tu URL de producción a Google Cloud Console.

#### Pasos:

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Selecciona tu proyecto
3. **APIs y servicios** → **Credenciales**
4. Haz clic en tu **Client ID** (838075476269...)
5. En **"Authorized JavaScript origins"**, agrega:
   ```
   https://tu-dominio.vercel.app
   https://tu-dominio.netlify.app
   https://tu-sitio.com
   ```
6. En **"Authorized redirect URIs"**, agrega:
   ```
   https://tu-dominio.vercel.app
   https://tu-dominio.netlify.app/oauth2callback
   https://tu-sitio.com
   ```
7. Guarda los cambios
8. **Espera 5-10 minutos** para que los cambios se propaguen

---

### 2. Content Security Policy (CSP) Restrictivo

**Problema**: El servidor de producción puede tener CSP más estricto que desarrollo.

**Solución**: Verifica que tu hosting permita los dominios de Google.

Tu archivo `index.html` ya tiene el CSP correcto, pero algunos hostings lo sobreescriben.

#### Para Vercel - Crear `vercel.json`:
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://apis.google.com https://accounts.google.com https://www.gstatic.com https://*.googleapis.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://accounts.google.com; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://accounts.google.com https://sheets.googleapis.com https://www.googleapis.com https://*.googleapis.com https://oauth2.googleapis.com; frame-src https://accounts.google.com https://*.google.com https://content-sheets.googleapis.com; img-src 'self' data: https:;"
        }
      ]
    }
  ]
}
```

#### Para Netlify - Crear `netlify.toml`:
```toml
[[headers]]
  for = "/*"
  [headers.values]
    Content-Security-Policy = "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://apis.google.com https://accounts.google.com https://www.gstatic.com https://*.googleapis.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://accounts.google.com; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://accounts.google.com https://sheets.googleapis.com https://www.googleapis.com https://*.googleapis.com https://oauth2.googleapis.com; frame-src https://accounts.google.com https://*.google.com https://content-sheets.googleapis.com; img-src 'self' data: https:;"
```

---

### 3. LocalStorage y Persistencia

**Problema**: El login usa `localStorage` que puede no persistir correctamente.

**Solución**: Verifica que tu hosting permita `localStorage`.

**Debugging**: Abre la consola del navegador en producción y ejecuta:
```javascript
localStorage.setItem('test', 'value');
console.log(localStorage.getItem('test')); // Debe mostrar "value"
```

Si falla, el hosting bloquea `localStorage` (raro pero posible en algunos hostings).

---

### 4. HTTPS Requerido para OAuth

**Problema**: Google requiere HTTPS para OAuth. HTTP no funcionará.

**Solución**: Asegúrate de que tu sitio usa HTTPS.

- Vercel, Netlify automáticamente usan HTTPS ✅
- GitHub Pages con dominio custom necesita configuración
- Hostings custom: Configura SSL/TLS

---

## 🔧 Checklist de Despliegue

### Antes de Desplegar:

- [ ] Credenciales configuradas en `GoogleSheetsSync.jsx` (ya están ✅)
- [ ] OAuth Redirect URIs incluyen tu dominio de producción
- [ ] Build local exitoso: `npm run build`
- [ ] Preview local funcional: `npm run preview`

### Después de Desplegar:

- [ ] Sitio carga correctamente (sin errores 404)
- [ ] Login funciona (admin/admin)
- [ ] Botón "Connect to Google" aparece
- [ ] Autenticación con Google funciona
- [ ] Google Sheets sync funciona
- [ ] Toast notifications se muestran correctamente
- [ ] Moneda Q aparece en todos los lugares

---

## 🛠️ Comandos de Build y Deploy

### Build Local (Prueba Antes de Deploy):
```bash
npm run build
npm run preview
```

Abre `http://localhost:4173` y prueba todas las funciones.

### Deploy a Vercel:
```bash
# Instalar Vercel CLI
npm install -g vercel

# Deploy
vercel

# Deploy a producción
vercel --prod
```

### Deploy a Netlify:
```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy

# Deploy a producción
netlify deploy --prod
```

### Deploy Manual (Build + Upload):
```bash
npm run build
# Sube la carpeta "dist/" a tu hosting
```

---

## 🐛 Debugging en Producción

### 1. Abrir DevTools en tu sitio de producción

**Chrome**: F12 o Ctrl+Shift+I

### 2. Revisar Console por errores:

#### ❌ Error de CSP:
```
Refused to load script from 'https://apis.google.com/js/api.js'
because it violates the following Content Security Policy directive
```
**Solución**: Agrega archivo de configuración CSP (ver arriba)

#### ❌ Error de OAuth:
```
Error 400: redirect_uri_mismatch
```
**Solución**: Agrega tu URL a Google Cloud Console

#### ❌ API Keys undefined:
```
Error: Cannot read property 'GOOGLE_API_KEY' of undefined
```
**Solución**: Verifica que las credenciales estén en `GoogleSheetsSync.jsx` (líneas 29-30)

### 3. Verificar Network Tab:

- Busca requests fallidos (en rojo)
- Verifica que `https://accounts.google.com` responde
- Confirma que `https://sheets.googleapis.com` está accesible

---

## 📝 Notas Importantes

### Seguridad:

⚠️ **API Keys visibles en código del cliente**
- Las credenciales en `GoogleSheetsSync.jsx` (líneas 29-30 y 51-52) están en el código
- Esto es **SEGURO** para OAuth cliente-side
- Google protege tu cuenta con OAuth consent screen
- Solo usuarios que autorices pueden acceder a tus Sheets
- Las credenciales son públicas (Client ID) y protegidas por OAuth

### Cómo funciona la seguridad OAuth:

1. **Client ID es público** - puede estar en el código
2. **OAuth consent screen protege** - usuario debe autorizar explícitamente
3. **Test users** - solo emails autorizados pueden usar la app
4. **Permisos granulares** - Google controla qué puede hacer la app

---

## 🎯 Pasos Recomendados AHORA

1. **Identifica tu plataforma de hosting**
   - ¿Vercel? ¿Netlify? ¿Otro?

2. **Actualiza Google Cloud Console**
   - Agrega tu URL de producción a OAuth settings
   - Espera 5-10 minutos

3. **Re-deploy**
   ```bash
   git push origin main
   # O usa el comando de tu plataforma
   ```

4. **Prueba en producción**
   - Login con admin/admin
   - Connect to Google
   - Sync con Google Sheets

---

## 📞 Soporte

Si sigues teniendo problemas:

1. **Copia y pega el error exacto de la consola**
2. **Indica qué plataforma de hosting usas**
3. **Comparte tu URL de producción** (sin credenciales)

---

**Última actualización**: 2026-01-12
