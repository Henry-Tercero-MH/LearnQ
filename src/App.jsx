import './App.css';
import { AuthProvider, useAuth } from './context/AuthContext';
import { FinanceProvider, useFinance } from './context/FinanceContext';
import LoginForm from './components/LoginForm';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import BudgetInput from './components/BudgetInput';
import DaySelector from './components/DaySelector';
import MoneyFlowChart from './MoneyFlowChart';
import ExcelImport from './components/ExcelImport';
import ExcelExport from './components/ExcelExport';
import GoogleSheetsSync from './components/GoogleSheetsSync';
import { HiArrowRightOnRectangle } from 'react-icons/hi2';
import { MdTrendingUp, MdAccountBalance, MdInsights } from 'react-icons/md';

function MainApp() {
  const { logout } = useAuth();
  const {
    expenses,
    addExpense,
    importExpenses,
    clearAllExpenses,
    dailyBudget,
    setDailyBudget,
    selectedDay,
    setSelectedDay
  } = useFinance();

  const expensesForDay = expenses.filter(e => e.date === selectedDay);
  const totalForDay = expensesForDay.reduce((sum, e) => sum + e.amount, 0);
  const totalAllExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const budgetRemaining = dailyBudget ? parseFloat(dailyBudget) - totalForDay : null;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 md:py-12">
      {/* Subtle Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-gold/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-700/20 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-5xl relative z-10 animate-fade-in">
        {/* Executive Header */}
        <div className="text-center mb-10 relative">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-gradient-to-br from-accent-gold/20 to-accent-bronze/10 rounded-2xl border border-accent-gold/30">
            <MdAccountBalance className="w-8 h-8 text-accent-gold" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">
            <span className="gradient-text">WEALTH MANAGEMENT</span>
          </h1>
          <p className="text-primary-400 text-sm font-medium uppercase tracking-wider">
            Executive Financial Dashboard
          </p>

          {/* Logout Button */}
          <button
            onClick={logout}
            className="absolute top-0 right-0 btn-secondary px-4 py-2 text-xs flex items-center gap-2 group"
            title="Sign out"
          >
            <HiArrowRightOnRectangle className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>

        {/* Main Form */}
        <ExpenseForm onAdd={addExpense} />

        {/* Controls Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <DaySelector value={selectedDay} onChange={setSelectedDay} />
          <BudgetInput value={dailyBudget} onChange={setDailyBudget} />
        </div>

        {/* Excel Import/Export Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <ExcelImport onImport={importExpenses} />
          <ExcelExport expenses={expenses} />
          <GoogleSheetsSync expenses={expenses} onImport={importExpenses} />
        </div>

        {/* Daily Summary Card */}
        <div className="glass-card p-6 mb-8 animate-slide-up">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-accent-gold/20 rounded-lg flex items-center justify-center">
                <MdTrendingUp className="w-5 h-5 text-accent-gold" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">
                  Daily Overview
                </h2>
                <p className="text-primary-500 text-xs font-medium uppercase">
                  {new Date(selectedDay).toLocaleDateString('en-US', {
                    weekday: 'short',
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <p className="text-primary-400 text-xs uppercase tracking-wider mb-1">Total Spent</p>
              <p className="text-2xl font-bold text-accent-gold">
                ${totalForDay.toFixed(2)}
              </p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <p className="text-primary-400 text-xs uppercase tracking-wider mb-1">
                {budgetRemaining !== null ? 'Remaining' : 'No Budget Set'}
              </p>
              <p className={`text-2xl font-bold ${
                budgetRemaining !== null
                  ? budgetRemaining >= 0
                    ? 'text-accent-emerald'
                    : 'text-red-400'
                  : 'text-primary-600'
              }`}>
                {budgetRemaining !== null ? `$${budgetRemaining.toFixed(2)}` : '---'}
              </p>
            </div>
          </div>

          <ExpenseList expenses={expensesForDay} />
        </div>

        {/* All Transactions Section */}
        <div className="glass-card p-6 mb-8 animate-slide-up" style={{ animationDelay: '100ms' }}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-accent-gold/20 rounded-lg flex items-center justify-center">
                <MdInsights className="w-5 h-5 text-accent-gold" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">
                  All Transactions
                </h2>
                <p className="text-primary-500 text-xs">
                  {expenses.length} {expenses.length === 1 ? 'record' : 'records'}
                </p>
              </div>
            </div>
            <div className="bg-linear-to-br from-accent-gold/20 to-accent-bronze/10 rounded-xl px-4 py-2 border border-accent-gold/20">
              <p className="text-xs text-primary-400 uppercase tracking-wider">Total</p>
              <p className="text-2xl font-bold text-accent-gold">
                ${totalAllExpenses.toFixed(2)}
              </p>
            </div>
          </div>
          <ExpenseList expenses={expenses} />
        </div>

        {/* Chart */}
        <MoneyFlowChart expenses={expenses} />

        {/* Financial Best Practices */}
        <div className="glass-card p-6 mt-8 animate-slide-up" style={{ animationDelay: '200ms' }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-accent-gold/20 rounded-lg flex items-center justify-center">
              <MdInsights className="w-5 h-5 text-accent-gold" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Financial Best Practices</h2>
              <p className="text-primary-500 text-xs font-medium uppercase tracking-wider">Executive wealth management guidelines</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              'Track expenses daily with precision',
              'Budget before spending strategically',
              'Review cash flow weekly',
              'Eliminate unnecessary expenditures',
              'Maintain fixed savings percentage',
              'Invest in financial education',
            ].map((text, index) => (
              <div
                key={index}
                className="flex items-center gap-3 bg-white/5 rounded-xl p-3 border border-white/10 hover:bg-white/10 transition-all duration-300 card-hover"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-accent-gold flex-shrink-0"></div>
                <span className="text-primary-200 text-sm font-medium">{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-primary-600 text-xs">
          <p className="font-medium tracking-wider">SECURE • ENCRYPTED • CONFIDENTIAL</p>
        </div>
      </div>
    </div>
  );
}

function AppContent() {
  const { isAuthenticated, login } = useAuth();

  if (!isAuthenticated) {
    return <LoginForm onLogin={login} />;
  }

  return <MainApp />;
}

export default function App() {
  return (
    <AuthProvider>
      <FinanceProvider>
        <AppContent />
      </FinanceProvider>
    </AuthProvider>
  );
}
