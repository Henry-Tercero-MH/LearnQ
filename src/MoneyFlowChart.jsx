import { Bar } from 'react-chartjs-2';
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { MdShowChart } from 'react-icons/md';

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function MoneyFlowChart({ expenses }) {
  // Group expenses by day
  const dailyTotals = {};
  expenses.forEach(e => {
    dailyTotals[e.date] = (dailyTotals[e.date] || 0) + e.amount;
  });
  const labels = Object.keys(dailyTotals).sort();

  const data = {
    labels: labels.map(date => {
      const d = new Date(date);
      return d.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
    }),
    datasets: [
      {
        label: 'Daily Spending',
        data: labels.map(date => dailyTotals[date]),
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, 'rgba(212, 175, 55, 0.8)');
          gradient.addColorStop(0.5, 'rgba(205, 127, 50, 0.6)');
          gradient.addColorStop(1, 'rgba(192, 192, 192, 0.4)');
          return gradient;
        },
        borderColor: 'rgba(212, 175, 55, 1)',
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.95)',
        backdropPadding: 6,
        borderColor: 'rgba(212, 175, 55, 0.3)',
        borderWidth: 1,
        titleColor: '#d4af37',
        bodyColor: '#e2e8f0',
        padding: 12,
        displayColors: false,
        titleFont: {
          size: 12,
          weight: 'bold',
        },
        bodyFont: {
          size: 14,
          weight: 'bold',
        },
        callbacks: {
          label: (context) => `$${context.parsed.y.toFixed(2)}`,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#94a3b8',
          font: {
            size: 11,
            weight: '500',
          },
        },
      },
      y: {
        grid: {
          color: 'rgba(148, 163, 184, 0.1)',
        },
        ticks: {
          color: '#94a3b8',
          font: {
            size: 11,
            weight: '500',
          },
          callback: (value) => `$${value}`,
        },
      },
    },
  };

  if (!expenses.length) {
    return null;
  }

  return (
    <div className="glass-card p-6 mt-6 animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-accent-gold/20 rounded-lg flex items-center justify-center">
          <MdShowChart className="w-5 h-5 text-accent-gold" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Spending Flow</h3>
          <p className="text-primary-500 text-xs font-medium uppercase tracking-wider">Daily visualization</p>
        </div>
      </div>
      <div className="h-64 relative">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
