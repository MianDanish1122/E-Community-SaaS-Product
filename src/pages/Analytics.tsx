import React from 'react';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { TrendingUp, Users, ShoppingCart, Activity } from 'lucide-react';

const salesData = [
  { name: 'Jan', revenue: 4000, orders: 240 },
  { name: 'Feb', revenue: 3000, orders: 198 },
  { name: 'Mar', revenue: 2000, orders: 980 },
  { name: 'Apr', revenue: 2780, orders: 390 },
  { name: 'May', revenue: 1890, orders: 480 },
  { name: 'Jun', revenue: 2390, orders: 380 },
  { name: 'Jul', revenue: 3490, orders: 430 },
];

const productionData = [
  { name: 'W1', efficiency: 85 },
  { name: 'W2', efficiency: 88 },
  { name: 'W3', efficiency: 92 },
  { name: 'W4', efficiency: 89 },
  { name: 'W5', efficiency: 95 },
];

export default function Analytics() {
  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">System Intelligence</h1>
        <p className="text-slate-500 text-sm">Predictive analytics and performance telemetry</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-brand-card p-6 rounded-xl border border-slate-800 shadow-sm hover:border-slate-700 transition-all cursor-pointer group">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-sky-500/10 text-sky-400 rounded-lg"><TrendingUp size={20}/></div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Revenue Growth</p>
          </div>
          <h3 className="text-2xl font-bold text-white group-hover:text-brand-accent transition-colors">+24.8%</h3>
          <p className="text-xs text-green-400 mt-2 font-medium">Outperforming baseline</p>
        </div>
        <div className="bg-brand-card p-6 rounded-xl border border-slate-800 shadow-sm hover:border-slate-700 transition-all cursor-pointer group">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-500/10 text-purple-400 rounded-lg"><Users size={20}/></div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Active Users</p>
          </div>
          <h3 className="text-2xl font-bold text-white group-hover:text-brand-accent transition-colors">1,842</h3>
          <p className="text-xs text-slate-500 mt-2 font-medium">Daily operational peak</p>
        </div>
        <div className="bg-brand-card p-6 rounded-xl border border-slate-800 shadow-sm hover:border-slate-700 transition-all cursor-pointer group">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg"><ShoppingCart size={20}/></div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Conversion</p>
          </div>
          <h3 className="text-2xl font-bold text-white group-hover:text-brand-accent transition-colors">4.2%</h3>
          <p className="text-xs text-red-400 mt-2 font-medium">-0.2% variance detected</p>
        </div>
        <div className="bg-brand-card p-6 rounded-xl border border-slate-800 shadow-sm hover:border-slate-700 transition-all cursor-pointer group">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-amber-500/10 text-amber-400 rounded-lg"><Activity size={20}/></div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Uptime</p>
          </div>
          <h3 className="text-2xl font-bold text-white group-hover:text-brand-accent transition-colors">99.98%</h3>
          <p className="text-xs text-sky-400 mt-2 font-medium">Node stability optimal</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-brand-card p-6 rounded-xl border border-slate-800 shadow-sm">
          <h3 className="text-lg font-medium text-white mb-6">Revenue vs Orders Trend</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="#64748B" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis 
                  stroke="#64748B" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                  tickFormatter={(value) => `PKR ${value}`}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#161920', border: '1px solid #1E293B', borderRadius: '8px' }}
                  itemStyle={{ color: '#0EA5E9' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#0EA5E9" 
                  fillOpacity={1} 
                  fill="url(#colorRev)" 
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-brand-card p-6 rounded-xl border border-slate-800 shadow-sm">
          <h3 className="text-lg font-medium text-white mb-6">Production Efficiency Index</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={productionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="#64748B" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis 
                  stroke="#64748B" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip 
                  cursor={{ fill: '#1E293B', opacity: 0.4 }}
                  contentStyle={{ backgroundColor: '#161920', border: '1px solid #1E293B', borderRadius: '8px' }}
                  itemStyle={{ color: '#0EA5E9' }}
                />
                <Bar 
                  dataKey="efficiency" 
                  fill="#0EA5E9" 
                  radius={[4, 4, 0, 0]} 
                  barSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
