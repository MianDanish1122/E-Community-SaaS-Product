import React from 'react';
import { TrendingUp, TrendingDown, Receipt, Download } from 'lucide-react';

export default function Accounting() {
  const transactions = [
    { id: '1', desc: 'Raw Material Purchase', amount: -4500.00, date: '2024-03-24', type: 'EXPENSE' },
    { id: '2', desc: 'Online Sales Revenue', amount: 12400.50, date: '2024-03-23', type: 'INCOME' },
    { id: '3', desc: 'Employee Payroll', amount: -8000.00, date: '2024-03-22', type: 'EXPENSE' },
    { id: '4', desc: 'Utility Bill Payment', amount: -350.25, date: '2024-03-21', type: 'EXPENSE' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Financial Ledger</h1>
          <p className="text-slate-500 text-sm">Cross-tenant financial audit and reporting</p>
        </div>
        <button 
          onClick={() => console.log("Report generation scheduled for next sync cycle.")}
          className="flex items-center justify-center px-4 py-2 border border-slate-800 rounded-lg bg-brand-card hover:bg-slate-800 text-slate-400 font-bold transition-all active:scale-95 cursor-pointer"
        >
          <Download className="mr-2 h-4 w-4" /> Export CSV
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-brand-card p-6 rounded-xl border border-slate-800 shadow-sm relative overflow-hidden group cursor-pointer hover:border-slate-700 transition-all">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Net Profit (Monthly)</p>
          <div className="flex items-center gap-2 mt-1 relative z-10">
            <h2 className="text-3xl font-bold text-white transition-transform group-hover:scale-105 origin-left">PKR 24,520</h2>
            <span className="text-green-400 text-[10px] font-bold flex items-center bg-green-900/20 px-2 py-0.5 rounded border border-green-500/20">+12%</span>
          </div>
          <div className="absolute right-0 bottom-0 opacity-5 group-hover:opacity-10 transition-opacity">
            <TrendingUp size={80} />
          </div>
        </div>
        <div className="bg-brand-card p-6 rounded-xl border border-slate-800 shadow-sm border-l-4 border-l-green-500/50 hover:border-r-slate-700 transition-all cursor-pointer">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Total Revenue</p>
          <div className="flex items-center gap-2 mt-1 text-green-400">
            <TrendingUp size={20} />
            <h2 className="text-3xl font-bold text-white">PKR 42,100</h2>
          </div>
        </div>
        <div className="bg-brand-card p-6 rounded-xl border border-slate-800 shadow-sm border-l-4 border-l-red-500/50 hover:border-r-slate-700 transition-all cursor-pointer">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Total Expenses</p>
          <div className="flex items-center gap-2 mt-1 text-red-400">
            <TrendingDown size={20} />
            <h2 className="text-3xl font-bold text-white">PKR 17,580</h2>
          </div>
        </div>
      </div>

      <div className="bg-brand-card rounded-xl shadow-sm border border-slate-800 overflow-hidden">
        <div className="p-6 border-b border-slate-800/50 flex justify-between items-center">
          <h3 className="font-medium text-white uppercase tracking-widest text-xs">Recent Ledger Entries</h3>
          <button 
            onClick={() => console.log("New transaction entry modal coming soon in v2.0 update.")}
            className="text-xs text-brand-accent font-bold hover:underline uppercase tracking-widest transition-all active:scale-95 cursor-pointer"
          >
            Add Record
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-900/50 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                <th className="px-6 py-4">Transaction</th>
                <th className="px-6 py-4">Timestamp</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-800/20 transition-colors">
                  <td className="px-6 py-4 font-medium text-white text-sm">{tx.desc}</td>
                  <td className="px-6 py-4 text-xs text-slate-500 font-mono">{tx.date}</td>
                  <td className="px-6 py-4">
                    <span className="bg-green-900/20 text-green-400 border border-green-500/20 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">Verified</span>
                  </td>
                  <td className={`px-6 py-4 text-right font-bold text-sm ${tx.amount > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {tx.amount > 0 ? '+ PKR ' : '- PKR '}{Math.abs(tx.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
