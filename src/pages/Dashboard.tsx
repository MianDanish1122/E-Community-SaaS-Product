import React, { useEffect, useState } from 'react';
import { useAuth } from '../lib/AuthContext';
import { collection, query, where, getDocs, limit, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { GoogleGenAI } from '@google/genai';
import { 
  TrendingUp, 
  Package, 
  AlertCircle, 
  Banknote, 
  Sparkles,
  Loader2
} from 'lucide-react';
import { motion } from 'motion/react';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default function Dashboard() {
  const { profile } = useAuth();
  const [stats, setStats] = useState({
    totalSales: 0,
    activeProduction: 0,
    lowStock: 0,
    recentPurchases: 0
  });
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  useEffect(() => {
    if (!profile) return;

    const fetchStats = async () => {
      // Mocking some data for demonstration
      // In a real app, you'd perform these queries
      setStats({
        totalSales: 15420,
        activeProduction: 4,
        lowStock: 7,
        recentPurchases: 12
      });
    };

    fetchStats();
  }, [profile]);

  const generateAiInsight = async () => {
    if (!profile) return;
    setIsAiLoading(true);
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Given a business with PKR ${stats.totalSales} in total sales, ${stats.activeProduction} active production batches, and ${stats.lowStock} items low on stock. provide a concise (2-3 sentences) strategic business insight or advice.`,
      });
      setAiInsight(response.text || "No insights available at the moment.");
    } catch (error) {
      console.error("AI Insight error:", error);
      setAiInsight("Failed to generate AI insights.");
    } finally {
      setIsAiLoading(false);
    }
  };

  const statCards = [
    { label: 'Total Sales', value: `PKR ${stats.totalSales}`, icon: Banknote, color: 'text-green-400', bg: 'bg-green-400/10' },
    { label: 'Active Production', value: stats.activeProduction, icon: TrendingUp, color: 'text-sky-400', bg: 'bg-sky-400/10' },
    { label: 'Low Stock Alerts', value: stats.lowStock, icon: AlertCircle, color: 'text-red-400', bg: 'bg-red-400/10' },
    { label: 'Recent Orders', value: stats.recentPurchases, icon: Package, color: 'text-brand-accent', bg: 'bg-brand-accent/10' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Good morning, {profile?.displayName?.split(' ')[0]}</h1>
          <p className="text-slate-500 text-sm">Real-time SaaS operational intelligence.</p>
        </div>
        <button 
          onClick={generateAiInsight}
          disabled={isAiLoading}
          className="flex items-center px-4 py-2 bg-brand-accent text-black font-bold rounded-lg hover:bg-sky-400 transition-all shadow-[0_0_15px_rgba(14,165,233,0.3)] active:scale-95 disabled:opacity-50 cursor-pointer"
        >
          {isAiLoading ? <Loader2 className="mr-2 animate-spin h-4 w-4" /> : <Sparkles className="mr-2 h-4 w-4" />}
          AI Insights
        </button>
      </div>

      {aiInsight && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-[#161920] to-[#1a1c2e] border border-slate-800 p-6 rounded-xl shadow-lg relative overflow-hidden"
        >
          <div className="relative z-10">
            <h3 className="text-xs font-semibold uppercase tracking-widest mb-2 text-brand-accent">AI Demand Prediction</h3>
            <p className="text-lg font-medium text-white italic font-serif leading-relaxed">"{aiInsight}"</p>
          </div>
          <Sparkles className="absolute right-[-10px] bottom-[-10px] h-24 w-24 opacity-5 text-brand-accent" />
        </motion.div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-brand-card p-6 rounded-xl shadow-sm border border-slate-800 hover:border-slate-700 transition-all group"
          >
            <div className={`p-3 rounded-lg ${stat.bg} ${stat.color} w-fit mb-4 group-hover:scale-110 transition-transform`}>
              <stat.icon size={24} />
            </div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">{stat.label}</p>
            <h2 className="text-2xl font-bold text-white mt-1">{stat.value}</h2>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-brand-card p-6 rounded-xl border border-slate-800 shadow-sm">
          <h3 className="text-lg font-medium text-white mb-4">Inventory Node Status</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 border-b border-slate-800/50">
              <span className="text-sm font-medium">Cotton Fabric</span>
              <span className="text-sm text-green-400 font-bold">450 units</span>
            </div>
            <div className="flex items-center justify-between p-3 border-b border-slate-800/50">
              <span className="text-sm font-medium">Silk Dye</span>
              <span className="text-sm text-red-400 font-bold">12 units</span>
            </div>
            <div className="flex items-center justify-between p-3">
              <span className="text-sm font-medium">Polyester Thread</span>
              <span className="text-sm text-amber-400 font-bold">85 units</span>
            </div>
          </div>
          <button className="w-full mt-6 py-2 text-sm text-brand-accent font-medium hover:bg-slate-800/30 rounded-lg transition-colors border border-slate-800 cursor-pointer active:scale-95">
            Node Data View
          </button>
        </div>

        <div className="bg-brand-card p-6 rounded-xl border border-slate-800 shadow-sm">
          <h3 className="text-lg font-medium text-white mb-4">Ledger Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 border-b border-slate-800/50 text-sm">
              <div>
                <p className="font-medium text-white">Raw Material Purchase</p>
                <p className="text-xs text-slate-500">Node-01, 10:45 AM</p>
              </div>
              <span className="text-red-400 font-bold">-PKR 1,200</span>
            </div>
            <div className="flex items-center justify-between p-3 border-b border-slate-800/50 text-sm">
              <div>
                <p className="font-medium text-white">Online Sale - Order #1042</p>
                <p className="text-xs text-slate-500">Yesterday</p>
              </div>
              <span className="text-green-400 font-bold">+PKR 850</span>
            </div>
            <div className="flex items-center justify-between p-3 text-sm">
              <div>
                <p className="font-medium text-white">Bulk Wholesale Order</p>
                <p className="text-xs text-slate-500">2 days ago</p>
              </div>
              <span className="text-green-400 font-bold">+PKR 4,200</span>
            </div>
          </div>
          <button className="w-full mt-6 py-2 text-sm text-brand-accent font-medium hover:bg-slate-800/30 rounded-lg transition-colors border border-slate-800 cursor-pointer active:scale-95">
            Full Audit Log
          </button>
        </div>
      </div>
    </div>
  );
}
