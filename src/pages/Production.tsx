import React from 'react';
import { Factory, Play, CheckCircle2, Clock } from 'lucide-react';

export default function Production() {
  const batches = [
    { id: '1', product: 'Blue Denim Jeans', quantity: 200, status: 'IN_PROGRESS', progress: 65 },
    { id: '2', product: 'White Cotton T-Shirt', quantity: 500, status: 'PLANNED', progress: 0 },
    { id: '3', product: 'Black Polo Shirt', quantity: 150, status: 'COMPLETED', progress: 100 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Production Control</h1>
        <p className="text-slate-500 text-sm">Manufacturing workflow and batch orchestration</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-brand-card p-6 rounded-xl border border-slate-800 shadow-sm flex items-center gap-4 hover:border-slate-700 transition-all cursor-pointer">
          <div className="p-3 bg-blue-900/20 text-blue-400 rounded-lg border border-blue-500/20"><Clock size={24}/></div>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Planned</p>
            <p className="text-xl font-bold text-white">12 Batches</p>
          </div>
        </div>
        <div className="bg-brand-card p-6 rounded-xl border border-slate-800 shadow-sm flex items-center gap-4 hover:border-slate-700 transition-all cursor-pointer">
          <div className="p-3 bg-brand-accent/10 text-brand-accent rounded-lg border border-brand-accent/20"><Play size={24}/></div>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">In Progress</p>
            <p className="text-xl font-bold text-white">4 Batches</p>
          </div>
        </div>
        <div className="bg-brand-card p-6 rounded-xl border border-slate-800 shadow-sm flex items-center gap-4 hover:border-slate-700 transition-all cursor-pointer">
          <div className="p-3 bg-green-900/20 text-green-400 rounded-lg border border-green-500/20"><CheckCircle2 size={24}/></div>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Completed</p>
            <p className="text-xl font-bold text-white">8 Batches</p>
          </div>
        </div>
      </div>

      <div className="bg-brand-card rounded-xl shadow-sm border border-slate-800 p-6">
        <h2 className="text-lg font-medium text-white mb-4">Active Batches</h2>
        <div className="space-y-6">
          {batches.map((batch) => (
            <div key={batch.id} className="p-4 border border-slate-800/50 rounded-lg bg-slate-900/20">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-bold text-white">{batch.product}</h4>
                  <p className="text-xs text-slate-500">Node-Batch: #PROD-{batch.id} • {batch.quantity} units</p>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                  batch.status === 'IN_PROGRESS' ? 'bg-brand-accent/20 text-brand-accent border border-brand-accent/20' :
                  batch.status === 'COMPLETED' ? 'bg-green-900/20 text-green-400 border border-green-500/20' : 'bg-slate-800 text-slate-400'
                }`}>
                  {batch.status.replace('_', ' ')}
                </span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-4">
                <div 
                  className="bg-brand-accent h-1.5 rounded-full transition-all duration-700 shadow-[0_0_8px_rgba(14,165,233,0.5)]" 
                  style={{ width: `${batch.progress}%` }}
                ></div>
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-[10px] text-slate-500 font-mono tracking-tighter">{batch.progress}% THROUGHPUT</span>
                <button 
                  onClick={() => console.log(`Accessing deep-dive telemetry for Batch #PROD-${batch.id}`)}
                  className="text-[10px] text-brand-accent font-bold uppercase tracking-widest hover:underline transition-all active:scale-95"
                >
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>
        <button 
          onClick={() => console.log("Initializing production orchestration workflow...")}
          className="w-full mt-6 py-3 border border-dashed border-slate-800 rounded-lg text-slate-500 font-bold uppercase tracking-[0.2em] text-[10px] hover:border-brand-accent hover:text-brand-accent transition-all active:scale-[0.98] cursor-pointer"
        >
          Schedule New Production Run
        </button>
      </div>
    </div>
  );
}
