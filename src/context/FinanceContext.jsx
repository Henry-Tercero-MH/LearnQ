import { createContext, useContext, useState } from 'react';

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
    if (window.confirm('Are you sure you want to delete all transactions? This action cannot be undone.')) {
      setExpenses([]);
    }
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
