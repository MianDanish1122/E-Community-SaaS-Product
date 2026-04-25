import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './lib/AuthContext';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import Production from './pages/Production';
import Accounting from './pages/Accounting';
import Ecommerce from './pages/Ecommerce';
import Analytics from './pages/Analytics';
import Login from './pages/Login';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  
  return <div className="flex bg-brand-bg min-h-screen text-slate-300">
    <Sidebar />
    <main className="flex-1 overflow-auto p-4 md:p-8">
      {children}
    </main>
  </div>;
};

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/inventory" element={<PrivateRoute><Inventory /></PrivateRoute>} />
          <Route path="/production" element={<PrivateRoute><Production /></PrivateRoute>} />
          <Route path="/accounting" element={<PrivateRoute><Accounting /></PrivateRoute>} />
          <Route path="/ecommerce" element={<PrivateRoute><Ecommerce /></PrivateRoute>} />
          <Route path="/analytics" element={<PrivateRoute><Analytics /></PrivateRoute>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
