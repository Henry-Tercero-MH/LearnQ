import { useState, useEffect } from 'react';
import { MdSync, MdCloud, MdCloudOff, MdRefresh } from 'react-icons/md';
import { toast } from 'react-toastify';

// IMPORTANTE: Reemplaza esta URL con la URL de tu Apps Script deployment
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec';

export default function GoogleSheetsSyncNew({ expenses, onImport }) {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSync, setLastSync] = useState(null);

  // Verificar conexión al cargar
  useEffect(() => {
    checkConnection();
  }, []);

  // Auto-sync cuando cambien los expenses (opcional)
  useEffect(() => {
    if (isConnected && !isLoading && expenses.length > 0) {
      const autoSyncDelay = setTimeout(() => {
        syncToSheets();
      }, 2000); // Espera 2 segundos después del último cambio

      return () => clearTimeout(autoSyncDelay);
    }
  }, [expenses, isConnected, isLoading]);

  /**
   * Verifica si el Apps Script está disponible
   */
  const checkConnection = async () => {
    if (APPS_SCRIPT_URL.includes('YOUR_DEPLOYMENT_ID')) {
      toast.warning('Please configure APPS_SCRIPT_URL in GoogleSheetsSyncNew.jsx');
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(`${APPS_SCRIPT_URL}?action=getTransactions`);

      if (response.ok) {
        setIsConnected(true);
        toast.success('Connected to Google Sheets!');
      } else {
        setIsConnected(false);
        toast.error('Failed to connect to Google Sheets');
      }
    } catch (error) {
      console.error('Connection check failed:', error);
      setIsConnected(false);
      toast.error('Failed to connect to Google Sheets');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Sincroniza datos locales a Google Sheets (PUSH)
   */
  const syncToSheets = async () => {
    if (!isConnected) {
      toast.warning('Not connected to Google Sheets');
      return;
    }

    if (expenses.length === 0) {
      toast.warning('No transactions to sync');
      return;
    }

    try {
      setIsSyncing(true);

      const response = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify({
          action: 'syncTransactions',
          transactions: expenses
        })
      });

      const result = await response.json();

      if (result.success) {
        setLastSync(new Date());
        toast.success(`Synced ${result.count} transactions to Google Sheets!`);
      } else {
        toast.error(result.error || 'Failed to sync');
      }
    } catch (error) {
      console.error('Error syncing to Sheets:', error);
      toast.error('Failed to sync to Google Sheets');
    } finally {
      setIsSyncing(false);
    }
  };

  /**
   * Importa datos desde Google Sheets (PULL)
   */
  const syncFromSheets = async () => {
    if (!isConnected) {
      toast.warning('Not connected to Google Sheets');
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch(`${APPS_SCRIPT_URL}?action=getTransactions`);
      const result = await response.json();

      if (result.transactions && result.transactions.length > 0) {
        // Transformar datos del formato de Apps Script al formato local
        const importedExpenses = result.transactions.map(t => ({
          amount: t.amount,
          category: t.category,
          date: t.date
        }));

        onImport(importedExpenses);
        setLastSync(new Date());
        toast.success(`Imported ${importedExpenses.length} transactions from Google Sheets!`);
      } else {
        toast.info('No transactions found in Google Sheets');
      }
    } catch (error) {
      console.error('Error importing from Sheets:', error);
      toast.error('Failed to import from Google Sheets');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Limpia todas las transacciones en Google Sheets
   */
  const clearRemoteData = async () => {
    if (!isConnected) {
      toast.warning('Not connected to Google Sheets');
      return;
    }

    const ConfirmToast = ({ closeToast }) => (
      <div>
        <p className="mb-3 font-semibold">Clear all data in Google Sheets?</p>
        <p className="mb-4 text-sm opacity-80">This will delete all transactions from the Google Sheet.</p>
        <div className="flex gap-2">
          <button
            onClick={async () => {
              closeToast();
              try {
                setIsLoading(true);
                const response = await fetch(APPS_SCRIPT_URL, {
                  method: 'POST',
                  body: JSON.stringify({ action: 'clearAllTransactions' })
                });

                const result = await response.json();

                if (result.success) {
                  toast.success('All transactions cleared from Google Sheets');
                } else {
                  toast.error(result.error || 'Failed to clear');
                }
              } catch (error) {
                console.error('Error clearing Sheets:', error);
                toast.error('Failed to clear Google Sheets');
              } finally {
                setIsLoading(false);
              }
            }}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white text-sm font-medium transition-colors"
          >
            Clear All
          </button>
          <button
            onClick={closeToast}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg text-white text-sm font-medium transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    );

    toast.warn(ConfirmToast, {
      autoClose: false,
      closeButton: false,
      draggable: false,
    });
  };

  const formatLastSync = () => {
    if (!lastSync) return 'Never';
    const now = new Date();
    const diff = Math.floor((now - lastSync) / 1000); // segundos

    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return lastSync.toLocaleDateString();
  };

  return (
    <div className="glass-card p-5 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-white uppercase tracking-wider">
            Google Sheets Sync
          </h3>
          <p className="text-primary-500 text-xs mt-1">
            {isConnected ? `Connected • Last sync: ${formatLastSync()}` : 'Not connected'}
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
          onClick={checkConnection}
          disabled={isLoading}
          className="btn-secondary w-full flex items-center justify-center gap-2"
        >
          <MdRefresh className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
          <span>{isLoading ? 'Connecting...' : 'Connect to Sheets'}</span>
        </button>
      ) : (
        <div className="space-y-3">
          {/* Push to Sheets */}
          <button
            onClick={syncToSheets}
            disabled={isLoading || isSyncing || expenses.length === 0}
            className="btn-primary w-full flex items-center justify-center gap-2"
          >
            <MdSync className={`w-5 h-5 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>
              {isSyncing ? 'Syncing...' : `Push to Sheets (${expenses.length})`}
            </span>
          </button>

          {/* Pull from Sheets */}
          <button
            onClick={syncFromSheets}
            disabled={isLoading || isSyncing}
            className="btn-secondary w-full flex items-center justify-center gap-2"
          >
            <MdRefresh className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
            <span>{isLoading ? 'Loading...' : 'Pull from Sheets'}</span>
          </button>

          {/* Clear Remote */}
          <button
            onClick={clearRemoteData}
            disabled={isLoading || isSyncing}
            className="w-full text-red-400 text-xs hover:text-red-300 transition-colors"
          >
            Clear Remote Data
          </button>

          {/* Disconnect */}
          <button
            onClick={() => {
              setIsConnected(false);
              toast.info('Disconnected from Google Sheets');
            }}
            className="w-full text-primary-400 text-xs hover:text-primary-200 transition-colors"
          >
            Disconnect
          </button>
        </div>
      )}

      {(isLoading || isSyncing) && (
        <div className="mt-3 text-center">
          <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-accent-gold"></div>
        </div>
      )}

      {/* Info Box */}
      <div className="mt-4 p-3 bg-white/5 rounded-lg border border-white/10">
        <p className="text-primary-400 text-xs font-medium mb-2">Setup Instructions:</p>
        <ol className="space-y-1 text-primary-300 text-xs list-decimal list-inside">
          <li>Open your Google Sheet</li>
          <li>Go to Extensions → Apps Script</li>
          <li>Paste the code from google-apps-script.js</li>
          <li>Deploy as Web App</li>
          <li>Copy the URL and update APPS_SCRIPT_URL</li>
        </ol>
      </div>
    </div>
  );
}
