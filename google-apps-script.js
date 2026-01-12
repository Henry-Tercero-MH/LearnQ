// ============================================
// GOOGLE APPS SCRIPT PARA LEARNQ
// ============================================
// Instrucciones:
// 1. Abre tu Google Sheet
// 2. Ve a Extensiones → Apps Script
// 3. Borra el código por defecto
// 4. Pega este código completo
// 5. Guarda (Ctrl+S)
// 6. Ve a Deploy → New deployment
// 7. Tipo: Web app
// 8. Execute as: Me
// 9. Who has access: Anyone
// 10. Copia la URL generada
// ============================================

// Configuración
const SHEET_NAME = 'Transactions';
const CREDENTIALS_SHEET = 'Credentials';

/**
 * Maneja peticiones GET (obtener datos)
 */
function doGet(e) {
  try {
    const action = e.parameter.action;

    switch(action) {
      case 'getTransactions':
        return getTransactions(e);
      case 'getCredentials':
        return getCredentials(e);
      default:
        return createResponse({ error: 'Invalid action' }, 400);
    }
  } catch (error) {
    console.error('Error in doGet:', error);
    return createResponse({ error: error.toString() }, 500);
  }
}

/**
 * Maneja peticiones POST (crear, actualizar, eliminar)
 */
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const action = data.action;

    switch(action) {
      case 'addTransaction':
        return addTransaction(data.transaction);
      case 'updateTransaction':
        return updateTransaction(data.id, data.transaction);
      case 'deleteTransaction':
        return deleteTransaction(data.id);
      case 'clearAllTransactions':
        return clearAllTransactions();
      case 'importTransactions':
        return importTransactions(data.transactions);
      case 'syncTransactions':
        return syncTransactions(data.transactions);
      default:
        return createResponse({ error: 'Invalid action' }, 400);
    }
  } catch (error) {
    console.error('Error in doPost:', error);
    return createResponse({ error: error.toString() }, 500);
  }
}

/**
 * Obtiene todas las transacciones
 */
function getTransactions(e) {
  const sheet = getOrCreateSheet(SHEET_NAME);
  const data = sheet.getDataRange().getValues();

  if (data.length <= 1) {
    return createResponse({ transactions: [] });
  }

  // Convertir filas a objetos
  const transactions = [];
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    if (row[0]) { // Si hay ID
      transactions.push({
        id: row[0],
        amount: parseFloat(row[1]),
        category: row[2],
        date: row[3]
      });
    }
  }

  return createResponse({ transactions });
}

/**
 * Agrega una nueva transacción
 */
function addTransaction(transaction) {
  const sheet = getOrCreateSheet(SHEET_NAME);
  const id = generateId();

  sheet.appendRow([
    id,
    transaction.amount,
    transaction.category,
    transaction.date
  ]);

  return createResponse({
    success: true,
    id: id,
    message: 'Transaction added successfully'
  });
}

/**
 * Actualiza una transacción existente
 */
function updateTransaction(id, transaction) {
  const sheet = getOrCreateSheet(SHEET_NAME);
  const data = sheet.getDataRange().getValues();

  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === id) {
      sheet.getRange(i + 1, 2, 1, 3).setValues([[
        transaction.amount,
        transaction.category,
        transaction.date
      ]]);

      return createResponse({
        success: true,
        message: 'Transaction updated successfully'
      });
    }
  }

  return createResponse({ error: 'Transaction not found' }, 404);
}

/**
 * Elimina una transacción
 */
function deleteTransaction(id) {
  const sheet = getOrCreateSheet(SHEET_NAME);
  const data = sheet.getDataRange().getValues();

  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === id) {
      sheet.deleteRow(i + 1);
      return createResponse({
        success: true,
        message: 'Transaction deleted successfully'
      });
    }
  }

  return createResponse({ error: 'Transaction not found' }, 404);
}

/**
 * Elimina todas las transacciones
 */
function clearAllTransactions() {
  const sheet = getOrCreateSheet(SHEET_NAME);
  const lastRow = sheet.getLastRow();

  if (lastRow > 1) {
    sheet.deleteRows(2, lastRow - 1);
  }

  return createResponse({
    success: true,
    message: 'All transactions cleared'
  });
}

/**
 * Importa múltiples transacciones
 */
function importTransactions(transactions) {
  const sheet = getOrCreateSheet(SHEET_NAME);

  const rows = transactions.map(t => [
    generateId(),
    t.amount,
    t.category,
    t.date
  ]);

  if (rows.length > 0) {
    const startRow = sheet.getLastRow() + 1;
    sheet.getRange(startRow, 1, rows.length, 4).setValues(rows);
  }

  return createResponse({
    success: true,
    count: transactions.length,
    message: `Imported ${transactions.length} transactions`
  });
}

/**
 * Sincroniza (reemplaza) todas las transacciones
 */
function syncTransactions(transactions) {
  const sheet = getOrCreateSheet(SHEET_NAME);

  // Limpiar datos existentes (excepto header)
  const lastRow = sheet.getLastRow();
  if (lastRow > 1) {
    sheet.deleteRows(2, lastRow - 1);
  }

  // Agregar nuevas transacciones
  const rows = transactions.map(t => [
    t.id || generateId(),
    t.amount,
    t.category,
    t.date
  ]);

  if (rows.length > 0) {
    sheet.getRange(2, 1, rows.length, 4).setValues(rows);
  }

  return createResponse({
    success: true,
    count: transactions.length,
    message: `Synced ${transactions.length} transactions`
  });
}

/**
 * Obtiene credenciales (para login)
 */
function getCredentials(e) {
  const sheet = getOrCreateSheet(CREDENTIALS_SHEET);
  const data = sheet.getDataRange().getValues();

  if (data.length <= 1) {
    return createResponse({ credentials: [] });
  }

  const credentials = [];
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    credentials.push({
      username: row[0],
      password: row[1]
    });
  }

  return createResponse({ credentials });
}

/**
 * Obtiene o crea una hoja
 */
function getOrCreateSheet(sheetName) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(sheetName);

  if (!sheet) {
    sheet = ss.insertSheet(sheetName);

    // Configurar headers según el tipo de hoja
    if (sheetName === SHEET_NAME) {
      sheet.getRange('A1:D1').setValues([['id', 'amount', 'category', 'date']]);
      sheet.getRange('A1:D1').setFontWeight('bold');
      sheet.setFrozenRows(1);
    } else if (sheetName === CREDENTIALS_SHEET) {
      sheet.getRange('A1:B1').setValues([['username', 'password']]);
      sheet.getRange('A1:B1').setFontWeight('bold');
      sheet.setFrozenRows(1);

      // Agregar credencial admin por defecto
      sheet.appendRow(['admin', 'admin']);
    }
  }

  return sheet;
}

/**
 * Genera un ID único
 */
function generateId() {
  return 'txn_' + new Date().getTime() + '_' + Math.random().toString(36).substr(2, 9);
}

/**
 * Crea una respuesta HTTP
 */
function createResponse(data, statusCode = 200) {
  const output = ContentService.createTextOutput(JSON.stringify(data));
  output.setMimeType(ContentService.MimeType.JSON);

  return output;
}

/**
 * Función de prueba (opcional)
 */
function testScript() {
  // Prueba agregar transacción
  const testTransaction = {
    amount: 100.50,
    category: 'Food',
    date: '2026-01-12'
  };

  const result = addTransaction(testTransaction);
  Logger.log(result.getContent());

  // Prueba obtener transacciones
  const transactions = getTransactions({});
  Logger.log(transactions.getContent());
}
