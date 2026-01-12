import { useState } from 'react';

export function useBudget() {
  const [dailyBudget, setDailyBudget] = useState('');
  return { dailyBudget, setDailyBudget };
}
