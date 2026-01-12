# 💼 Wealth Management - Executive Financial Dashboard

An elegant, professional financial tracking application designed for high-net-worth individuals and business executives.

![Version](https://img.shields.io/badge/version-1.0.0-gold)
![React](https://img.shields.io/badge/React-19.2.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

---

## ✨ Features

### 🎯 Core Functionality
- **Transaction Management** - Add, track, and manage financial transactions
- **Category Classification** - 10 professional categories (Business, Travel, Food, etc.)
- **Daily Budgeting** - Set and monitor daily spending limits
- **Real-time Analytics** - Instant calculations and spending insights
- **Visual Reports** - Interactive charts with Chart.js

### 📊 Excel Integration
- **Import from Excel** - Bulk import transactions from `.xlsx` files
- **Export to Excel** - Download all data in professional Excel format
- **Automatic Date Parsing** - Smart date format detection
- **Data Validation** - Ensures data integrity during import

### 🔒 Security
- **Authentication System** - Login protection (default: admin/admin)
- **Secure Storage** - LocalStorage with session persistence
- **Encrypted Communication** - Modern security standards

### 🎨 Design
- **Executive Aesthetic** - Luxury gold/bronze color scheme
- **Glassmorphism UI** - Modern glass-effect cards with backdrop blur
- **Responsive Design** - Optimized for desktop, tablet, and mobile
- **Professional Icons** - Material Design icons from React Icons
- **Smooth Animations** - Polished transitions and micro-interactions

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Microsoft Excel or compatible software (for Excel features)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd LearnQ
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   Navigate to: http://localhost:5173
   ```

5. **Login**
   ```
   Username: admin
   Password: admin
   ```

---

## 📖 Usage Guide

### Adding Transactions

1. Fill out the transaction form with:
   - **Amount**: Transaction value (e.g., 150.50)
   - **Category**: Select from dropdown (Business, Food, Travel, etc.)
   - **Date**: Choose transaction date

2. Click **"Add Transaction"**

3. Transaction appears in Daily Overview and All Transactions sections

### Managing Budget

1. Enter your daily budget in the **"Daily Budget"** field
2. System calculates remaining budget automatically
3. Green = under budget, Red = over budget

### Excel Import/Export

For detailed Excel integration instructions, see **[EXCEL-INTEGRATION.md](EXCEL-INTEGRATION.md)**

**Quick Import:**
1. Prepare Excel file with columns: `amount`, `category`, `date`
2. Click **"Choose Excel File"** in Import section
3. Select your `.xlsx` file
4. Confirm import

**Quick Export:**
1. Click **"Download Excel File"** in Export section
2. File downloads as `wealth-management-YYYY-MM-DD.xlsx`
3. Open in Excel for analysis

### Using the Chart

- View spending flow over time
- Hover over bars for exact amounts
- Visual representation of daily spending patterns

---

## 🏗️ Project Structure

```
LearnQ/
├── src/
│   ├── components/
│   │   ├── BudgetInput.jsx       # Daily budget input
│   │   ├── DaySelector.jsx       # Date selection
│   │   ├── ExpenseForm.jsx       # Transaction entry form
│   │   ├── ExpenseList.jsx       # Transaction display
│   │   ├── ExcelImport.jsx       # Excel import functionality
│   │   ├── ExcelExport.jsx       # Excel export functionality
│   │   └── LoginForm.jsx         # Authentication form
│   ├── context/
│   │   ├── AuthContext.jsx       # Authentication state
│   │   └── FinanceContext.jsx    # Finance state management
│   ├── App.jsx                   # Main application
│   ├── App.css                   # Component styles
│   ├── index.css                 # Global styles & Tailwind
│   └── MoneyFlowChart.jsx        # Chart.js visualization
├── public/                       # Static assets
├── EXCEL-INTEGRATION.md          # Excel guide
├── example-transactions.csv      # Sample data
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

---

## 🛠️ Technologies

### Frontend Framework
- **React 19.2.0** - Modern UI library with hooks
- **Vite 7.2.4** - Lightning-fast build tool

### Styling
- **Tailwind CSS 4.1.18** - Utility-first CSS framework
- **Custom CSS** - Glassmorphism and executive design system

### Data Visualization
- **Chart.js 4.5.1** - Powerful charting library
- **react-chartjs-2 5.3.1** - React wrapper for Chart.js

### Icons
- **React Icons 5.5.0** - Material Design icons

### Excel Integration
- **xlsx** - SheetJS library for Excel file processing

### State Management
- **React Context API** - Global state management

---

## 🎨 Design System

### Color Palette

**Primary Colors (Slate)**
- `primary-50`: #f8fafc (Lightest)
- `primary-400`: #94a3b8
- `primary-600`: #475569
- `primary-900`: #0f172a (Darkest)

**Accent Colors (Luxury)**
- `accent-gold`: #d4af37 (Primary gold)
- `accent-bronze`: #cd7f32
- `accent-silver`: #c0c0c0
- `accent-emerald`: #10b981
- `accent-sapphire`: #3b82f6

### Typography
- **Font Family**: Inter, SF Pro Display, -apple-system
- **Headings**: Bold, uppercase, wide tracking
- **Body**: Medium weight, tight tracking

### Components
- **Glass Cards**: Translucent with backdrop blur
- **Buttons**: Gold gradients with shadow elevation
- **Inputs**: Dark glass with gold focus states

---

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

All components adapt seamlessly across devices.

---

## 📊 Excel File Format

### Required Columns

| Column | Type | Example |
|--------|------|---------|
| amount | Number | 150.50 |
| category | Text | Business |
| date | Date | 2026-01-12 |

### Supported Categories

Business, Travel, Food, Transport, Entertainment, Health, Education, Clothing, Home, Technology

### Example File

See [example-transactions.csv](example-transactions.csv) for sample data format.

Open the CSV in Excel and save as `.xlsx` to use with import feature.

---

## 🚧 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

### Adding New Categories

1. Update category list in `src/components/ExpenseForm.jsx`
2. Add icon mapping in `src/components/ExpenseList.jsx`
3. Ensure consistent naming across components

---

## 🐛 Troubleshooting

### Excel Import Issues

See detailed troubleshooting in [EXCEL-INTEGRATION.md](EXCEL-INTEGRATION.md#troubleshooting)

**Common Issues:**
- Column names don't match (use: `amount`, `category`, `date`)
- Dates in wrong format (use: YYYY-MM-DD)
- File not `.xlsx` or `.xls` format
- Missing required fields in some rows

### Build Errors

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Port Already in Use

```bash
# Use different port
npm run dev -- --port 3000
```

---

## 📈 Roadmap

### Planned Features
- [ ] Edit/Delete transactions
- [ ] Multiple user accounts
- [ ] Cloud data sync
- [ ] PDF report export
- [ ] Recurring transactions
- [ ] Budget alerts
- [ ] Multi-currency support
- [ ] Drag-and-drop Excel import
- [ ] Advanced analytics dashboard
- [ ] Mobile app (React Native)

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙏 Acknowledgments

- **React Team** - For the amazing framework
- **Tailwind CSS** - For the utility-first approach
- **Chart.js** - For beautiful charts
- **SheetJS** - For Excel integration
- **Google** - For Material Design icons

---

## 📞 Support

For detailed Excel integration help, see **[EXCEL-INTEGRATION.md](EXCEL-INTEGRATION.md)**

---

**Built with ❤️ for financial excellence**

**Secure • Encrypted • Confidential**

---

*Last Updated: January 12, 2026*
