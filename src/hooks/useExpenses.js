import { useState } from 'react';

export function useExpenses() {
  const [expenses, setExpenses] = useState([]);
  const addExpense = expense => setExpenses(prev => [...prev, expense]);
  return { expenses, addExpense };
}
