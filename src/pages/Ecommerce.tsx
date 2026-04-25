import React from 'react';
import { ShoppingBag, Eye, Settings, BarChart3, ExternalLink } from 'lucide-react';

export default function Ecommerce() {
  const products = [
    { id: '1', name: 'Premium Blue Jeans', price: 89.99, sales: 124, status: 'PUBLISHED', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=200&h=200' },
    { id: '2', name: 'Cotton White T-Shirt', price: 29.99, sales: 452, status: 'PUBLISHED', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=200&h=200' },
    { id: '3', name: 'Leather Belt', price: 45.00, sales: 56, status: 'DRAFT', image: 'https://images.unsplash.com/photo-1524511751214-b0a384dd9faa?auto=format&fit=crop&q=80&w=200&h=200' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">E-commerce Store</h1>
          <p className="text-slate-500 text-sm">Online storefront and order lifecycle management</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => console.log("Redirecting to your public storefront node...")}
            className="flex items-center px-4 py-2 border border-slate-800 rounded-lg hover:bg-brand-card font-medium text-slate-400 transition-all active:scale-95 cursor-pointer"
          >
            <ExternalLink className="mr-2 h-4 w-4" /> View Store
          </button>
          <button 
            onClick={() => console.log("Global store configuration settings loaded.")}
            className="flex items-center px-4 py-2 bg-brand-accent text-black rounded-lg hover:bg-sky-400 font-bold transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <ShoppingBag className="mr-2 h-4 w-4" /> Store Config
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-brand-card p-6 rounded-xl border border-slate-800 shadow-sm transition-all hover:border-slate-700 cursor-pointer group">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Monthly Orders</p>
          <h2 className="text-2xl font-bold text-white mt-1 group-hover:text-brand-accent transition-colors">1,204</h2>
          <div className="mt-2 text-[10px] text-green-400 font-bold flex items-center bg-green-900/20 w-fit px-2 py-0.5 rounded">
            <BarChart3 size={12} className="mr-1" /> +15.5% vs PREV
          </div>
        </div>
        <div className="bg-brand-card p-6 rounded-xl border border-slate-800 shadow-sm">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Average Order Value</p>
          <h2 className="text-2xl font-bold text-white mt-1">PKR 68.40</h2>
          <div className="mt-2 text-[10px] text-slate-500 uppercase tracking-widest">Network Benchmark</div>
        </div>
        <div className="bg-brand-card p-6 rounded-xl border border-slate-800 shadow-sm transition-all hover:border-slate-700">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Conversion Rate</p>
          <h2 className="text-2xl font-bold text-white mt-1">3.2%</h2>
          <div className="mt-2 text-[10px] text-red-400 font-bold flex items-center bg-red-900/20 w-fit px-2 py-0.5 rounded">
            -0.4% vs PREV
          </div>
        </div>
        <div className="bg-brand-card p-6 rounded-xl border border-slate-800 shadow-sm">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Active Campaigns</p>
          <h2 className="text-2xl font-bold text-white mt-1">2</h2>
          <div className="mt-2 text-[10px] text-brand-accent font-bold uppercase tracking-widest">1 Ending 24h</div>
        </div>
      </div>

      <div className="bg-brand-card rounded-xl shadow-sm border border-slate-800 overflow-hidden">
        <div className="p-6 border-b border-slate-800/50">
          <h3 className="font-medium text-white uppercase tracking-widest text-xs">Marketplace Catalog</h3>
        </div>
        <div className="divide-y divide-slate-800/50">
          {products.map((product) => (
            <div key={product.id} className="p-4 flex items-center gap-4 hover:bg-slate-800/20 transition-colors">
              <img src={product.image} alt={product.name} className="w-16 h-16 rounded-lg object-cover grayscale hover:grayscale-0 transition-all bg-slate-900" />
              <div className="flex-1">
                <h4 className="font-bold text-white">{product.name}</h4>
                <p className="text-sm text-slate-500 font-mono">PKR {product.price.toFixed(2)} • {product.sales} sales</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                  product.status === 'PUBLISHED' ? 'bg-green-900/20 text-green-400 border border-green-500/20' : 'bg-slate-800 text-slate-400'
                }`}>
                  {product.status}
                </span>
                <button className="p-2 text-slate-500 hover:text-brand-accent transition-colors cursor-pointer active:scale-110">
                  <Settings size={18} />
                </button>
                <button className="p-2 text-slate-500 hover:text-brand-accent transition-colors cursor-pointer active:scale-110">
                  <Eye size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
