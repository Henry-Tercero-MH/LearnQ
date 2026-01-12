import { useRef } from 'react';
import * as XLSX from 'xlsx';
import { MdUploadFile } from 'react-icons/md';

export default function ExcelImport({ onImport }) {
  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const workbook = XLSX.read(event.target.result, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(worksheet);

        // Validate and transform data
        const expenses = data
          .filter(row => row.amount && row.category && row.date)
          .map(row => ({
            amount: parseFloat(row.amount),
            category: String(row.category).trim(),
            date: formatDate(row.date)
          }));

        if (expenses.length === 0) {
          alert('No valid data found in Excel file. Please check the format.');
          return;
        }

        onImport(expenses);
        alert(`Successfully imported ${expenses.length} transactions!`);

        // Reset file input
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } catch (error) {
        console.error('Error reading Excel file:', error);
        alert('Error reading Excel file. Please check the format and try again.');
      }
    };

    reader.readAsBinaryString(file);
  };

  const formatDate = (dateValue) => {
    // Handle Excel date serial numbers
    if (typeof dateValue === 'number') {
      const excelEpoch = new Date(1899, 11, 30);
      const date = new Date(excelEpoch.getTime() + dateValue * 86400000);
      return date.toISOString().slice(0, 10);
    }

    // Handle string dates
    if (typeof dateValue === 'string') {
      const date = new Date(dateValue);
      if (!isNaN(date.getTime())) {
        return date.toISOString().slice(0, 10);
      }
    }

    // Default to today if invalid
    return new Date().toISOString().slice(0, 10);
  };

  return (
    <div className="glass-card p-5 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-white uppercase tracking-wider">Import from Excel</h3>
          <p className="text-primary-500 text-xs mt-1">Upload your transaction data</p>
        </div>
        <div className="w-10 h-10 bg-accent-gold/20 rounded-lg flex items-center justify-center">
          <MdUploadFile className="w-5 h-5 text-accent-gold" />
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileUpload}
        className="hidden"
        id="excel-upload"
      />

      <label
        htmlFor="excel-upload"
        className="btn-secondary w-full text-center cursor-pointer flex items-center justify-center gap-2 group"
      >
        <MdUploadFile className="w-5 h-5 group-hover:scale-110 transition-transform" />
        <span>Choose Excel File</span>
      </label>

      <div className="mt-4 p-3 bg-white/5 rounded-lg border border-white/10">
        <p className="text-primary-400 text-xs font-medium mb-2">Required Excel Format:</p>
        <div className="space-y-1">
          <p className="text-primary-300 text-xs font-mono">• amount: number (e.g., 150.50)</p>
          <p className="text-primary-300 text-xs font-mono">• category: text (e.g., Food)</p>
          <p className="text-primary-300 text-xs font-mono">• date: date (e.g., 2026-01-12)</p>
        </div>
      </div>
    </div>
  );
}
