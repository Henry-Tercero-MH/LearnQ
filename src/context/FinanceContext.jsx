import { createContext, useContext, useState } from 'react';
import { toast } from 'react-toastify';

const FinanceContext = createContext();


export function FinanceProvider({ children }) {
  const [expenses, setExpenses] = useState([]);
  const [dailyBudget, setDailyBudget] = useState('');
  const [selectedDay, setSelectedDay] = useState(() => new Date().toISOString().slice(0, 10));

  const addExpense = expense => setExpenses(prev => [...prev, expense]);

  const updateExpense = (index, updatedExpense) => {
    setExpenses(prev => prev.map((e, i) => i === index ? updatedExpense : e));
  };

  const deleteExpense = (index) => {
    setExpenses(prev => prev.filter((_, i) => i !== index));
  };

  const importExpenses = (newExpenses) => {
    setExpenses(prev => [...prev, ...newExpenses]);
  };

  const clearAllExpenses = () => {
    const ConfirmToast = ({ closeToast }) => (
      <div>
        <p className="mb-3 font-semibold">Are you sure you want to delete all transactions?</p>
        <p className="mb-4 text-sm opacity-80">This action cannot be undone.</p>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setExpenses([]);
              toast.success('All transactions deleted');
              closeToast();
            }}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white text-sm font-medium transition-colors"
          >
            Delete All
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

  return (
    <FinanceContext.Provider value={{
      expenses,
      addExpense,
      updateExpense,
      deleteExpense,
      importExpenses,
      clearAllExpenses,
      dailyBudget,
      setDailyBudget,
      selectedDay,
      setSelectedDay
    }}>
      {children}
    </FinanceContext.Provider>
  );
}

export function useFinance() {
  return useContext(FinanceContext);
}
