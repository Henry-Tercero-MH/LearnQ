import { useState } from 'react';
import { HiPlus } from 'react-icons/hi2';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';
import { MdCategory, MdCalendarToday } from 'react-icons/md';

export default function ExpenseForm({ onAdd }) {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));

  const handleSubmit = e => {
    e.preventDefault();
    if (!amount || !category || !date) return;
    onAdd({ amount: parseFloat(amount), category, date });
    setAmount('');
    setCategory('');
    setDate(new Date().toISOString().slice(0, 10));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="glass-card p-6 space-y-5 animate-fade-in mb-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Amount Input */}
        <div className="space-y-2">
          <label
            htmlFor="amount"
            className="block text-xs font-semibold text-primary-300 uppercase tracking-wider ml-1"
          >
            Amount
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <RiMoneyDollarCircleLine className="w-5 h-5 text-primary-500 group-focus-within:text-accent-gold transition-colors" />
            </div>
            <input
              id="amount"
              type="number"
              step="0.01"
              placeholder="0.00"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              className="input-modern w-full pl-10 text-base font-semibold"
              required
            />
          </div>
        </div>

        {/* Category Select */}
        <div className="space-y-2">
          <label
            htmlFor="category"
            className="block text-xs font-semibold text-primary-300 uppercase tracking-wider ml-1"
          >
            Category
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
              <MdCategory className="w-5 h-5 text-primary-500 group-focus-within:text-accent-gold transition-colors" />
            </div>
            <select
              id="category"
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="input-modern w-full pl-10 text-base appearance-none cursor-pointer"
              required
            >
              <option value="">Select category</option>
              <option value="Business">Business</option>
              <option value="Travel">Travel</option>
              <option value="Food">Food</option>
              <option value="Transport">Transport</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Health">Health</option>
              <option value="Education">Education</option>
              <option value="Clothing">Clothing</option>
              <option value="Home">Home</option>
              <option value="Technology">Technology</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg className="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Date Input */}
        <div className="space-y-2">
          <label
            htmlFor="date"
            className="block text-xs font-semibold text-primary-300 uppercase tracking-wider ml-1"
          >
            Date
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MdCalendarToday className="w-5 h-5 text-primary-500 group-focus-within:text-accent-gold transition-colors" />
            </div>
            <input
              id="date"
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              className="input-modern w-full pl-10 text-base"
              required
            />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="btn-primary w-full md:w-auto md:px-8 flex items-center justify-center gap-2 group"
      >
        <HiPlus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
        <span>Add Transaction</span>
      </button>
    </form>
  );
}
