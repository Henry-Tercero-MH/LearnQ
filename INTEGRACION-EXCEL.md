# Guía de Integración con Excel

## 📊 Wealth Management - Integración con Excel

Esta guía proporciona instrucciones paso a paso para importar y exportar datos de transacciones usando Microsoft Excel.

---

## Tabla de Contenidos

1. [Inicio Rápido](#inicio-rápido)
2. [Formato del Archivo Excel](#formato-del-archivo-excel)
3. [Importar Datos desde Excel](#importar-datos-desde-excel)
4. [Exportar Datos a Excel](#exportar-datos-a-excel)
5. [Solución de Problemas](#solución-de-problemas)
6. [Plantillas de Ejemplo](#plantillas-de-ejemplo)

---

## Inicio Rápido

### Requisitos Previos

- Microsoft Excel 2010 o superior (o software compatible como LibreOffice Calc, Google Sheets)
- Formato de archivo Excel: `.xlsx` o `.xls`

### Características

- ✅ **Importar transacciones** desde archivos Excel
- ✅ **Exportar todas las transacciones** a archivos Excel
- ✅ Análisis automático de fechas
- ✅ Validación de datos
- ✅ Formato profesional

---

## Formato del Archivo Excel

### Columnas Requeridas

Tu archivo Excel **debe** contener estas tres columnas (no distingue mayúsculas/minúsculas):

| Nombre de Columna | Tipo de Dato | Descripción | Ejemplo |
|-------------------|--------------|-------------|---------|
| `amount` | Número | Monto de la transacción (números positivos) | 150.50 |
| `category` | Texto | Categoría de la transacción | Food |
| `date` | Fecha | Fecha de la transacción | 2026-01-12 |

### Notas Importantes

- **Los nombres de columnas deben coincidir exactamente** (no distingue mayúsculas: `amount`, `Amount`, `AMOUNT` todos funcionan)
- El orden de las columnas no importa
- Se permiten columnas adicionales pero serán ignoradas
- La primera fila debe contener los encabezados de columna

---

## Paso a Paso: Crear un Archivo Excel para Importar

### Paso 1: Abrir Microsoft Excel

1. Abre Microsoft Excel
2. Crea un nuevo libro en blanco

### Paso 2: Configurar los Encabezados de Columna

En la primera fila, crea tres encabezados de columna:

```
A1: amount
B1: category
C1: date
```

### Paso 3: Ingresar tus Datos

A partir de la fila 2, ingresa los datos de tus transacciones:

**Ejemplo:**

| amount | category | date |
|--------|----------|------|
| 45.99 | Food | 2026-01-10 |
| 120.00 | Transport | 2026-01-11 |
| 89.50 | Entertainment | 2026-01-12 |
| 200.00 | Business | 2026-01-12 |
| 35.75 | Health | 2026-01-13 |

### Paso 4: Formatear la Columna de Fecha (¡Importante!)

1. Selecciona la columna de fecha (Columna C)
2. Clic derecho → Formato de Celdas
3. Selecciona formato **Fecha**
4. Elige el formato: `AAAA-MM-DD` (ej., 2026-01-12)
5. Clic en Aceptar

### Paso 5: Guardar tu Archivo

1. Clic en **Archivo** → **Guardar Como**
2. Elige la ubicación
3. Selecciona tipo de archivo: **Libro de Excel (*.xlsx)**
4. Nombra tu archivo (ej., `mis-transacciones.xlsx`)
5. Clic en **Guardar**

---

## Importar Datos desde Excel

### Método 1: Usando la Interfaz de la Aplicación

1. **Inicia sesión** en la aplicación Wealth Management
2. Localiza la tarjeta **"Import from Excel"** (debajo de la sección de controles)
3. Haz clic en el botón **"Choose Excel File"**
4. Navega a tu archivo Excel
5. Selecciona el archivo y haz clic en **Abrir**
6. Espera el mensaje de confirmación
7. Tus transacciones aparecerán en la sección "All Transactions"

### Método 2: Arrastrar y Soltar (Característica Futura)

*Próximamente*

### ¿Qué Sucede Durante la Importación?

- ✅ El archivo se valida para verificar el formato correcto
- ✅ Cada fila se verifica para los campos requeridos
- ✅ Las fechas se analizan y formatean automáticamente
- ✅ Las filas inválidas se omiten (verás cuántas se importaron)
- ✅ Los datos se agregan a las transacciones existentes (no se reemplazan)

---

## Exportar Datos a Excel

### Proceso de Exportación Paso a Paso

1. **Inicia sesión** en la aplicación Wealth Management
2. Agrega algunas transacciones (o asegúrate de tener datos existentes)
3. Localiza la tarjeta **"Export to Excel"**
4. Haz clic en el botón **"Download Excel File"**
5. El archivo se descargará automáticamente en tu carpeta de Descargas
6. Formato del nombre de archivo: `wealth-management-AAAA-MM-DD.xlsx`

### ¿Qué se Incluye en la Exportación?

El archivo Excel exportado contiene:

- ✅ Todos los montos de transacciones
- ✅ Todas las clasificaciones de categorías
- ✅ Todas las fechas de transacciones
- ✅ Columnas pre-formateadas con anchos óptimos
- ✅ Diseño profesional listo para análisis

### Abrir tu Archivo Exportado

1. Navega a tu carpeta de **Descargas**
2. Haz doble clic en el archivo `wealth-management-AAAA-MM-DD.xlsx`
3. Excel se abrirá con tus datos
4. Ahora puedes:
   - Analizar tus gastos
   - Crear tablas dinámicas
   - Generar gráficos
   - Compartir con contadores/asesores

---

## Solución de Problemas

### ❌ Error: "No valid data found in Excel file"

**Causa:** Los encabezados de columna no coinciden con el formato requerido

**Solución:**
1. Verifica que los nombres de columna sean exactamente: `amount`, `category`, `date`
2. Revisa errores tipográficos o espacios adicionales
3. Asegúrate de que la primera fila contenga encabezados (no datos)

---

### ❌ Error: "Error reading Excel file"

**Causa:** Formato de archivo no compatible o corrupto

**Solución:**
1. Asegúrate de que el archivo sea formato `.xlsx` o `.xls`
2. Intenta abrir en Excel y volver a guardar
3. Verifica que el archivo no esté protegido con contraseña
4. Verifica que el archivo no esté corrupto

---

### ❌ Las Fechas Aparecen como Números

**Causa:** Los números de serie de fecha de Excel no se analizaron correctamente

**Solución:**
1. Formatea la columna de fecha como Fecha en Excel
2. Usa el formato: `AAAA-MM-DD`
3. Asegúrate de que las fechas sean válidas (no fórmulas)

---

### ❌ Algunas Transacciones No se Importaron

**Causa:** Faltan campos requeridos en algunas filas

**Solución:**
1. Verifica que cada fila tenga `amount`, `category` y `date`
2. Elimina filas con celdas vacías
3. Verifica que el monto sea un número (sin símbolos de moneda)

---

### ❌ No se Puede Exportar - Botón Deshabilitado

**Causa:** No hay transacciones para exportar

**Solución:**
1. Agrega al menos una transacción primero
2. Verifica que hayas iniciado sesión
3. Verifica que las transacciones aparezcan en la sección "All Transactions"

---

## Plantillas de Ejemplo

### Plantilla 1: Gastos Personales

```
amount  | category      | date
--------|---------------|------------
45.99   | Food          | 2026-01-10
120.00  | Transport     | 2026-01-11
89.50   | Entertainment | 2026-01-12
35.75   | Health        | 2026-01-13
```

### Plantilla 2: Gastos de Negocios

```
amount   | category    | date
---------|-------------|------------
1500.00  | Business    | 2026-01-08
250.00   | Travel      | 2026-01-09
450.00   | Technology  | 2026-01-10
180.00   | Education   | 2026-01-11
```

### Plantilla 3: Categorías Mixtas

```
amount  | category      | date
--------|---------------|------------
75.00   | Food          | 2026-01-12
200.00  | Clothing      | 2026-01-12
350.00  | Home          | 2026-01-13
125.50  | Transport     | 2026-01-13
95.00   | Entertainment | 2026-01-14
```

---

## Categorías Soportadas

La aplicación soporta estas categorías:

- ✅ **Business** - Gastos empresariales, reuniones, servicios
- ✅ **Travel** - Vuelos, hoteles, viajes
- ✅ **Food** - Comidas, supermercado, restaurantes
- ✅ **Transport** - Gasolina, transporte público, gastos de vehículo
- ✅ **Entertainment** - Películas, eventos, suscripciones
- ✅ **Health** - Médico, farmacia, fitness
- ✅ **Education** - Cursos, libros, capacitación
- ✅ **Clothing** - Ropa, accesorios
- ✅ **Home** - Alquiler, servicios, muebles
- ✅ **Technology** - Electrónicos, software, gadgets

---

## Consejos Avanzados

### Consejo 1: Importación Masiva

Puedes importar cientos o miles de transacciones a la vez:

1. Prepara un archivo Excel grande con todos los datos
2. Asegúrate de que todas las filas sigan el formato
3. Importa una vez - todas las filas válidas se agregarán

### Consejo 2: Respaldos Regulares

Exporta tus datos regularmente:

1. Exporta a Excel semanal/mensualmente
2. Guarda archivos con nombres descriptivos
3. Mantén respaldos en almacenamiento en la nube

### Consejo 3: Análisis de Datos

Después de exportar:

1. Usa tablas dinámicas de Excel para análisis de categorías
2. Crea gráficos para visualizar patrones de gasto
3. Filtra por rangos de fechas
4. Calcula totales mensuales/anuales

### Consejo 4: Compartir con Asesores

Para compartir con asesores financieros:

1. Exporta tus datos
2. Comparte el archivo Excel
3. Ellos pueden analizar y proporcionar información
4. Re-importa después de cualquier corrección

---

## Detalles Técnicos

### Formatos de Fecha Soportados

La función de importación acepta estos formatos de fecha:

- `AAAA-MM-DD` (recomendado) - ej., 2026-01-12
- `MM/DD/AAAA` - ej., 01/12/2026
- `DD/MM/AAAA` - ej., 12/01/2026
- Números de serie de fecha de Excel (conversión automática)

### Límites de Tamaño de Archivo

- Tamaño máximo de archivo: 10 MB
- Filas máximas: Sin límite fijo (depende de la memoria del navegador)
- Recomendado: Menos de 10,000 filas para rendimiento óptimo

### Compatibilidad de Navegadores

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

---

## Preguntas Frecuentes

**P: ¿Puedo editar transacciones después de importarlas?**
R: Actualmente, la aplicación no soporta edición. Para modificar, borra todas las transacciones y re-importa los datos corregidos.

**P: ¿Qué pasa si importo los mismos datos dos veces?**
R: Se agregarán transacciones duplicadas. La aplicación no verifica duplicados.

**P: ¿Puedo importar desde Google Sheets?**
R: ¡Sí! Descarga tu Google Sheet como formato Excel (.xlsx) primero.

**P: ¿Se guardarán mis datos después de exportar?**
R: La exportación crea una instantánea. Tus datos permanecen en la aplicación y pueden exportarse nuevamente en cualquier momento.

**P: ¿Puedo importar datos de múltiples archivos?**
R: ¡Sí! Importa archivos uno a la vez - los datos de cada archivo se agregarán a las transacciones existentes.

---

## Soporte

Si encuentras problemas no cubiertos en esta guía:

1. Revisa la consola del navegador para mensajes de error (F12)
2. Verifica tu archivo Excel contra los ejemplos anteriores
3. Prueba primero con un archivo pequeño de prueba (3-5 filas)
4. Contacta a tu administrador del sistema

---

## Información de Versión

- **Aplicación:** Wealth Management Executive Dashboard
- **Integración Excel:** v1.0
- **Última Actualización:** 12 de Enero 2026

---

**© 2026 Wealth Management. Seguro • Encriptado • Confidencial**
