import { MdCalendarToday } from 'react-icons/md';

export default function DaySelector({ value, onChange }) {
  return (
    <div className="glass-card p-5 mb-6 animate-fade-in">
      <label
        htmlFor="selectedDay"
        className="block text-xs font-semibold text-primary-300 uppercase tracking-wider mb-3 ml-1"
      >
        Select Date
      </label>
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MdCalendarToday className="w-5 h-5 text-primary-500 group-focus-within:text-accent-gold transition-colors" />
        </div>
        <input
          id="selectedDay"
          type="date"
          value={value}
          onChange={e => onChange(e.target.value)}
          className="input-modern w-full pl-10 text-base font-medium"
        />
      </div>
    </div>
  );
}
