
import {
  MdRestaurant, MdDirectionsCar, MdTheaters, MdLocalHospital,
  MdSchool, MdCheckroom, MdHome, MdFlight, MdLaptop, MdAttachMoney, MdEdit, MdDelete
} from 'react-icons/md';
import { useState } from 'react';
import { useFinance } from '../context/FinanceContext';

// Category icon mapping - Professional icons only
const categoryIcons = {
  comida: MdRestaurant,
  food: MdRestaurant,
  transporte: MdDirectionsCar,
  transport: MdDirectionsCar,
  entretenimiento: MdTheaters,
  entertainment: MdTheaters,
  salud: MdLocalHospital,
  health: MdLocalHospital,
  educacion: MdSchool,
  education: MdSchool,
  ropa: MdCheckroom,
  clothing: MdCheckroom,
  hogar: MdHome,
  home: MdHome,
  viajes: MdFlight,
  travel: MdFlight,
  tecnologia: MdLaptop,
  technology: MdLaptop,
  business: MdAttachMoney,
  default: MdAttachMoney
};

const getCategoryIcon = (category) => {
  const normalized = category.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return categoryIcons[normalized] || categoryIcons.default;
};


export default function ExpenseList({ expenses }) {
  const { updateExpense, deleteExpense } = useFinance();
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({ amount: '', category: '', date: '' });

  if (!expenses.length) {
    return (
      <div className="glass-card p-8 text-center animate-fade-in">
        <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-primary-800/30 rounded-xl">
          <MdAttachMoney className="w-8 h-8 text-primary-500" />
        </div>
        <p className="text-primary-400 text-base font-medium">No transactions recorded</p>
        <p className="text-primary-600 text-sm mt-2">
          Add your first transaction to get started
        </p>
      </div>
    );
  }

  const handleEditClick = (idx) => {
    setEditIndex(idx);
    setEditData({ ...expenses[idx] });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSave = (idx) => {
    updateExpense(idx, {
      ...editData,
      amount: parseFloat(editData.amount),
    });
    setEditIndex(null);
  };

  const handleEditCancel = () => {
    setEditIndex(null);
  };

  return (
    <div className="space-y-2 animate-slide-up">
      {expenses.map((expense, index) => {
        const IconComponent = getCategoryIcon(expense.category);

        const isEditing = editIndex === index;

        return (
          <div
            key={index}
            className="glass-card p-4 card-hover group"
            style={{ animationDelay: `${index * 30}ms` }}
          >
            <div className="flex items-center justify-between gap-4">
              {/* Icon & Category */}
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className="shrink-0 w-11 h-11 bg-linear-to-br from-accent-gold/15 to-accent-bronze/10 rounded-lg flex items-center justify-center border border-accent-gold/20 group-hover:border-accent-gold/40 transition-colors">
                  <IconComponent className="w-5 h-5 text-accent-gold" />
                </div>
                <div className="flex-1 min-w-0">
                  {isEditing ? (
                    <>
                      <input
                        name="category"
                        value={editData.category}
                        onChange={handleEditChange}
                        className="input-modern text-base font-semibold mb-1 w-full"
                      />
                      <input
                        name="date"
                        type="date"
                        value={editData.date}
                        onChange={handleEditChange}
                        className="input-modern text-sm w-full"
                      />
                    </>
                  ) : (
                    <>
                      <p className="text-white font-semibold text-base truncate capitalize">
                        {expense.category}
                      </p>
                      <p className="text-primary-500 text-sm font-medium">
                        {new Date(expense.date).toLocaleDateString('en-US', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </p>
                    </>
                  )}
                </div>
              </div>

              {/* Amount & Actions */}
              <div className="shrink-0 flex flex-col items-end gap-2">
                {isEditing ? (
                  <>
                    <input
                      name="amount"
                      type="number"
                      step="0.01"
                      value={editData.amount}
                      onChange={handleEditChange}
                      className="input-modern text-xl font-bold text-accent-gold tracking-tight mb-1 w-24"
                    />
                    <div className="flex gap-2">
                      <button
                        className="btn-primary px-3 py-1 text-xs"
                        onClick={() => handleEditSave(index)}
                      >Save</button>
                      <button
                        className="btn-secondary px-3 py-1 text-xs"
                        onClick={handleEditCancel}
                      >Cancel</button>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-xl font-bold text-accent-gold tracking-tight">
                      ${expense.amount.toFixed(2)}
                    </p>
                    <div className="flex gap-2 mt-1">
                      <button
                        className="text-primary-400 hover:text-accent-gold transition-colors"
                        title="Edit"
                        onClick={() => handleEditClick(index)}
                      >
                        <MdEdit className="w-5 h-5" />
                      </button>
                      <button
                        className="text-primary-400 hover:text-red-500 transition-colors"
                        title="Delete"
                        onClick={() => deleteExpense(index)}
                      >
                        <MdDelete className="w-5 h-5" />
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
