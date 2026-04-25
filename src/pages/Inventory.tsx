import React, { useState, useEffect } from 'react';
import { useAuth } from '../lib/AuthContext';
import { collection, query, where, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Plus, Search, Filter, Loader2 } from 'lucide-react';
import { handleFirestoreError, OperationType } from '../lib/errorUtils';

interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  stockLevel: number;
  category: string;
}

export default function Inventory() {
  const { profile } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', stockLevel: '', category: '' });
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!profile) return;
    
    const q = query(
      collection(db, 'products'),
      where('businessId', '==', profile.businessId)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const productList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Product[];
      
      if (productList.length === 0) {
        // Default seed data if empty
        setProducts([
          { id: '1', name: 'Cotton Fabric', sku: 'TEX-001', price: 12.5, stockLevel: 450, category: 'Raw Materials' },
          { id: '2', name: 'Silk Dye', sku: 'CHE-042', price: 85, stockLevel: 12, category: 'Chemicals' },
          { id: '3', name: 'Polyester Thread', sku: 'ACC-085', price: 4.2, stockLevel: 85, category: 'Accessories' },
        ]);
      } else {
        setProducts(productList);
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'products');
    });

    return () => unsubscribe();
  }, [profile]);

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setErrorMsg(null);
    
    if (!profile) {
      setErrorMsg("System authority not established. Please sign out and log in again.");
      return;
    }
    
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'products'), {
        name: newProduct.name,
        price: parseFloat(newProduct.price) || 0,
        stockLevel: parseInt(newProduct.stockLevel) || 0,
        category: newProduct.category || 'General',
        sku: `SKU-${Math.random().toString(36).substring(7).toUpperCase()}`,
        businessId: profile.businessId,
        updatedAt: serverTimestamp(),
      });
      setIsModalOpen(false);
      setNewProduct({ name: '', price: '', stockLevel: '', category: '' });
    } catch (error) {
      if (error instanceof Error) {
        setErrorMsg("Failed to initialize asset: " + error.message);
      }
      console.error("Firestore error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Inventory Management</h1>
          <p className="text-slate-500 text-sm">Automated node-level stock tracking</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center px-4 py-2 bg-brand-accent text-black rounded-lg hover:bg-sky-400 transition-all font-bold shadow-lg active:scale-95 cursor-pointer"
        >
          <Plus className="mr-2 h-4 w-4" /> Add Asset
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-brand-card border border-slate-800 rounded-xl w-full max-w-md p-6 shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-4">New Asset Allocation</h2>
            {errorMsg && (
              <div className="mb-4 p-3 bg-red-900/20 border border-red-500/20 rounded-lg text-red-400 text-sm font-medium">
                {errorMsg}
              </div>
            )}
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Asset Name</label>
                <input 
                  autoFocus
                  required
                  type="text" 
                  value={newProduct.name}
                  onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-brand-accent transition-all"
                  placeholder="e.g. Cotton Grade A"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Stock Level</label>
                  <input 
                    required
                    type="number" 
                    value={newProduct.stockLevel}
                    onChange={e => setNewProduct({...newProduct, stockLevel: e.target.value})}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-brand-accent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Unit Price (PKR)</label>
                  <input 
                    required
                    type="number" 
                    step="0.01"
                    value={newProduct.price}
                    onChange={e => setNewProduct({...newProduct, price: e.target.value})}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-brand-accent transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Category</label>
                <select 
                  value={newProduct.category}
                  onChange={e => setNewProduct({...newProduct, category: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-brand-accent transition-all"
                >
                  <option value="General">General</option>
                  <option value="Raw Materials">Raw Materials</option>
                  <option value="Chemicals">Chemicals</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Finished Goods">Finished Goods</option>
                </select>
              </div>
              <div className="flex gap-3 pt-4">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2 border border-slate-800 rounded-lg text-slate-400 font-bold hover:bg-slate-800 transition-all cursor-pointer active:scale-95"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2 bg-brand-accent text-black rounded-lg font-bold hover:bg-sky-400 transition-all shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting && <Loader2 size={16} className="animate-spin" />}
                  Initialize Asset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 h-4 w-4" />
          <input 
            type="text" 
            placeholder="Search inventory matrix..." 
            className="w-full pl-10 pr-4 py-2 bg-brand-card border border-slate-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand-accent"
          />
        </div>
        <button className="flex items-center px-4 py-2 border border-slate-800 rounded-lg hover:bg-brand-card text-slate-400 font-medium transition-colors cursor-pointer active:scale-95">
          <Filter className="mr-2 h-4 w-4" /> Filter
        </button>
      </div>

      <div className="bg-brand-card rounded-xl shadow-sm border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-900/50 border-b border-slate-800">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Product</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">SKU</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Price</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Stock</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Category</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-slate-800/20 transition-colors">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-white">{product.name}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500 font-mono tracking-tighter">{product.sku}</td>
                  <td className="px-6 py-4 text-sm text-white font-medium">PKR {product.price.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      product.stockLevel < 20 ? 'bg-red-900/20 text-red-400 border border-red-500/20' : 'bg-green-900/20 text-green-400 border border-green-500/20'
                    }`}>
                      {product.stockLevel} units
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">{product.category}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
