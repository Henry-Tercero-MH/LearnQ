import * as XLSX from 'xlsx';
import { MdDownload } from 'react-icons/md';
import { toast } from 'react-toastify';

export default function ExcelExport({ expenses }) {
  const handleExport = () => {
    if (expenses.length === 0) {
      toast.warning('No transactions to export.');
      return;
    }

    try {
      // Prepare data for Excel
      const exportData = expenses.map(expense => ({
        amount: expense.amount,
        category: expense.category,
        date: expense.date
      }));

      // Create worksheet
      const worksheet = XLSX.utils.json_to_sheet(exportData);

      // Set column widths
      worksheet['!cols'] = [
        { wch: 12 }, // amount
        { wch: 20 }, // category
        { wch: 15 }  // date
      ];

      // Create workbook
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Transactions');

      // Generate filename with current date
      const today = new Date().toISOString().slice(0, 10);
      const filename = `wealth-management-${today}.xlsx`;

      // Export file
      XLSX.writeFile(workbook, filename);

      toast.success(`Successfully exported ${expenses.length} transactions!`);
    } catch (error) {
      console.error('Error exporting to Excel:', error);
      toast.error('Error exporting data. Please try again.');
    }
  };

  return (
    <div className="glass-card p-5 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-white uppercase tracking-wider">Export to Excel</h3>
          <p className="text-primary-500 text-xs mt-1">
            Download {expenses.length} {expenses.length === 1 ? 'transaction' : 'transactions'}
          </p>
        </div>
        <div className="w-10 h-10 bg-accent-gold/20 rounded-lg flex items-center justify-center">
          <MdDownload className="w-5 h-5 text-accent-gold" />
        </div>
      </div>

      <button
        onClick={handleExport}
        disabled={expenses.length === 0}
        className={`btn-secondary w-full flex items-center justify-center gap-2 group ${
          expenses.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        <MdDownload className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
        <span>Download Excel File</span>
      </button>

      <div className="mt-4 p-3 bg-white/5 rounded-lg border border-white/10">
        <p className="text-primary-400 text-xs font-medium mb-2">Export includes:</p>
        <div className="space-y-1">
          <p className="text-primary-300 text-xs">• All transaction amounts</p>
          <p className="text-primary-300 text-xs">• Category classifications</p>
          <p className="text-primary-300 text-xs">• Transaction dates</p>
        </div>
      </div>
    </div>
  );
}
