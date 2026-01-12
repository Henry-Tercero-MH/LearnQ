import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  // Sheet authentication: fetch credentials from Google Sheets in real time
  const GOOGLE_API_KEY = 'AIzaSyA8CdD8RP4HjD1zN00-qp3dxAD4OKzvWb4';
  const SHEET_ID = '1x4CsAtGdlJvGBOTC_ZdgeOxnsqPPNAfYvM1VD6dGeMY';
  async function fetchSheetCredentials() {
    if (!window.gapi || !window.gapi.client) return [];
    try {
      await window.gapi.client.init({
        apiKey: GOOGLE_API_KEY,
        discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
      });
      const response = await window.gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: SHEET_ID,
        range: 'Sheet2!A:B',
      });
      const rows = response.result.values;
      if (!rows || rows.length < 2) return [];
      return rows.slice(1)
        .filter(row => row[0] && row[1])
        .map(row => ({ username: String(row[0]).trim(), password: String(row[1]).trim() }));
    } catch (e) {
      return [];
    }
  }

  const login = async (username, password) => {
    const creds = await fetchSheetCredentials();
    const found = creds.find(
      cred => cred.username === username && cred.password === password
    );
    if (found) {
      setIsAuthenticated(true);
      localStorage.setItem('isAuthenticated', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
  };

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem('isAuthenticated', 'true');
    } else {
      localStorage.removeItem('isAuthenticated');
    }
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
