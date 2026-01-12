import { RiMoneyDollarCircleLine } from 'react-icons/ri';

export default function BudgetInput({ value, onChange }) {
  return (
    <div className="glass-card p-5 mb-6 animate-fade-in">
      <label
        htmlFor="dailyBudget"
        className="block text-xs font-semibold text-primary-300 uppercase tracking-wider mb-3 ml-1"
      >
        Daily Budget
      </label>
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <RiMoneyDollarCircleLine className="w-5 h-5 text-primary-500 group-focus-within:text-accent-gold transition-colors" />
        </div>
        <input
          id="dailyBudget"
          type="number"
          step="0.01"
          placeholder="0.00"
          value={value}
          onChange={e => onChange(e.target.value)}
          className="input-modern w-full pl-10 text-base font-semibold"
        />
      </div>
    </div>
  );
}
