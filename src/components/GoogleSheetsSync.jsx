// --- Anti-bot/AI credential extraction guard ---
if (typeof window !== 'undefined') {
  const suspiciousPatterns = [
    /api[_-]?key/i,
    /client[_-]?id/i,
    /xor[_-]?key/i,
    /obfuscat/i,
    /encrypt|decrypt/i,
    /google.*credential/i
  ];
  const stack = (new Error()).stack || '';
  for (const pattern of suspiciousPatterns) {
    if (pattern.test(stack)) {
      // Block or mislead automated extraction attempts
      throw new Error('Access to credentials is blocked.');
    }
  }
}
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { MdSync, MdCloud, MdCloudOff } from 'react-icons/md';
import { RiShieldKeyholeLine } from 'react-icons/ri';
import { toast } from 'react-toastify';





// Credenciales directas para Google API
const GOOGLE_API_KEY = 'AIzaSyA8CdD8RP4HjD1zN00-qp3dxAD4OKzvWb4';
const GOOGLE_CLIENT_ID = '838075476269-oi80gmn3ej0f2trhpcqm4e9f4rqf8em8.apps.googleusercontent.com';

// Google Sheets API Configuration
const SCOPES = 'https://www.googleapis.com/auth/spreadsheets';


export default function GoogleSheetsSync({ expenses, onImport }) {
  const { importCredentials } = useAuth();
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
    // Sincronización automática a Google Sheets para TODO el CRUD:
    // Se ejecuta cuando expenses cambia (agregar, editar, eliminar, importar, limpiar)
    // Solo sincroniza si está conectado, no está cargando, y hay Sheet ID
    // Para evitar bucles infinitos al importar o limpiar, se puede agregar un control opcional si es necesario
    useEffect(() => {
      if (isConnected && !isLoading && sheetId) {
        syncToSheets();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [expenses]);
  // Credenciales Google API directas
  const GOOGLE_API_KEY = 'AIzaSyA8CdD8RP4HjD1zN00-qp3dxAD4OKzvWb4';
  const GOOGLE_CLIENT_ID = '838075476269-oi80gmn3ej0f2trhpcqm4e9f4rqf8em8.apps.googleusercontent.com';
  // Sheet ID por defecto:
  const [sheetId, setSheetId] = useState('1x4CsAtGdlJvGBOTC_ZdgeOxnsqPPNAfYvM1VD6dGeMY');
  const [gapiReady, setGapiReady] = useState(false);
  const [gisReady, setGisReady] = useState(false);

  useEffect(() => {
    let gapiLoaded = false;
    let gisLoaded = false;

    // Load Google API script
    const gapiScript = document.createElement('script');
    gapiScript.src = 'https://apis.google.com/js/api.js';
    gapiScript.onload = () => {
      gapiLoaded = true;
      initializeGapi();
    };
    document.body.appendChild(gapiScript);

    // Load Google Identity Services
    const gisScript = document.createElement('script');
    gisScript.src = 'https://accounts.google.com/gsi/client';
    gisScript.async = true;
    gisScript.defer = true;
    gisScript.onload = () => {
      gisLoaded = true;
      setGisReady(true);
    };
    document.body.appendChild(gisScript);

    return () => {
      if (document.body.contains(gapiScript)) document.body.removeChild(gapiScript);
      if (document.body.contains(gisScript)) document.body.removeChild(gisScript);
    };
  }, []);

  const initializeGapi = () => {
    window.gapi.load('client', async () => {
      await window.gapi.client.init({
        apiKey: GOOGLE_API_KEY,
        discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
      });
      setGapiReady(true);
    });
  };

  const handleAuth = () => {
    if (!gapiReady) {
      toast.warning('Google API is still loading. Please wait a moment.');
      return;
    }

    if (!window.google) {
      toast.error('Google Identity Services not loaded. Please refresh the page.');
      return;
    }

    try {
      setIsLoading(true);

      // Use Google Identity Services (new method)
      const client = window.google.accounts.oauth2.initTokenClient({
        client_id: GOOGLE_CLIENT_ID,
        scope: SCOPES,
        callback: (response) => {
          if (response.error) {
            console.error('Error getting token:', response);
            toast.error('Failed to connect to Google Sheets. Please try again.');
            setIsLoading(false);
            return;
          }

          // Token received successfully
          setIsConnected(true);
          setIsLoading(false);
          toast.success('Successfully connected to Google Sheets!');
        },
      });

      // Request access token
      client.requestAccessToken();
    } catch (error) {
      console.error('Error connecting to Google Sheets:', error);
      toast.error('Failed to connect to Google Sheets. Please check your configuration.');
      setIsLoading(false);
    }
  };

  const handleDisconnect = () => {
    if (window.google && window.google.accounts.oauth2) {
      window.google.accounts.oauth2.revoke(window.gapi.client.getToken().access_token, () => {
        setIsConnected(false);
        toast.info('Disconnected from Google Sheets');
      });
    } else {
      setIsConnected(false);
      toast.info('Disconnected from Google Sheets');
    }
  };

  const syncToSheets = async () => {
    if (!sheetId) {
      toast.warning('Please enter a Google Sheet ID');
      return;
    }

    if (expenses.length === 0) {
      toast.warning('No transactions to sync');
      return;
    }

    try {
      setIsLoading(true);

      // Prepare data for sheets
      const values = [
        ['amount', 'category', 'date'], // Header row
        ...expenses.map(e => [e.amount, e.category, e.date])
      ];

      // Clear existing data and write new data
      await window.gapi.client.sheets.spreadsheets.values.update({
        spreadsheetId: sheetId,
        range: 'Sheet1!A1',
        valueInputOption: 'RAW',
        resource: { values }
      });

      toast.success(`Successfully synced ${expenses.length} transactions to Google Sheets!`);
    } catch (error) {
      console.error('Error syncing to Google Sheets:', error);
      toast.error('Failed to sync to Google Sheets. Make sure the Sheet ID is correct and you have edit permissions.');
    } finally {
      setIsLoading(false);
    }
  };

  // Pull expenses
  const syncFromSheets = async () => {
    if (!sheetId) {
      toast.warning('Please enter a Google Sheet ID');
      return;
    }

    try {
      setIsLoading(true);

      // Read data from sheets (expenses)
      const response = await window.gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: sheetId,
        range: 'Sheet1!A:C',
      });
      const rows = response.result.values;
      if (!rows || rows.length === 0) {
        toast.warning('No data found in the sheet');
        return;
      }
      const importedExpenses = rows.slice(1)
        .filter(row => row[0] && row[1] && row[2])
        .map(row => ({
          amount: parseFloat(row[0]),
          category: String(row[1]).trim(),
          date: String(row[2]).trim()
        }));
      if (importedExpenses.length === 0) {
        toast.warning('No valid transactions found in the sheet');
        return;
      }
      onImport(importedExpenses);
      toast.success(`Successfully imported ${importedExpenses.length} transactions from Google Sheets!`);
    } catch (error) {
      console.error('Error importing from Google Sheets:', error);
      toast.error('Failed to import from Google Sheets. Make sure the Sheet ID is correct and you have view permissions.');
    } finally {
      setIsLoading(false);
    }
  };

  // Pull credentials
  const syncCredentialsFromSheet = async () => {
    if (!sheetId) {
      toast.warning('Please enter a Google Sheet ID');
      return;
    }
    try {
      setIsLoading(true);
      // Expect credentials in Sheet2!A:B (header: username, password)
      const response = await window.gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: sheetId,
        range: 'Sheet2!A:B',
      });
      const rows = response.result.values;
      if (!rows || rows.length === 0) {
        toast.warning('No credentials found in Sheet2');
        return;
      }
      importCredentials(rows);
      toast.success(`Imported ${rows.length - 1} credentials from Sheet2!`);
    } catch (error) {
      console.error('Error importing credentials:', error);
      toast.error('Failed to import credentials. Make sure Sheet2 exists and is formatted correctly.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="glass-card p-5 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-white uppercase tracking-wider">
            Google Sheets Sync
          </h3>
          <p className="text-primary-500 text-xs mt-1">
            {isConnected ? 'Connected' : 'Not connected'}
          </p>
        </div>
        <div className="w-10 h-10 bg-accent-gold/20 rounded-lg flex items-center justify-center">
          {isConnected ? (
            <MdCloud className="w-5 h-5 text-accent-emerald" />
          ) : (
            <MdCloudOff className="w-5 h-5 text-primary-500" />
          )}
        </div>
      </div>

      {!isConnected ? (
        <button
          onClick={handleAuth}
          disabled={isLoading || !gapiReady}
          className="btn-secondary w-full flex items-center justify-center gap-2"
        >
          <MdCloud className="w-5 h-5" />
          <span>{gapiReady ? 'Connect to Google' : 'Loading...'}</span>
        </button>
      ) : (
        <div className="space-y-3">
          {/* Sin controles manuales: solo conexión automática */}

          <button
            onClick={handleDisconnect}
            className="w-full text-primary-400 text-xs hover:text-primary-200 transition-colors"
          >
            Disconnect
          </button>
        </div>
      )}

      {isLoading && (
        <div className="mt-3 text-center">
          <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-accent-gold"></div>
        </div>
      )}
    </div>
  );
}
