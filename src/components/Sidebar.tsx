import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  Factory, 
  Receipt, 
  Store, 
  BarChart3,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { auth } from '../lib/firebase';
import { cn } from '../lib/utils';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Package, label: 'Inventory', path: '/inventory' },
  { icon: Factory, label: 'Production', path: '/production' },
  { icon: Receipt, label: 'Accounting', path: '/accounting' },
  { icon: Store, label: 'E-commerce', path: '/ecommerce' },
  { icon: BarChart3, label: 'Analytics', path: '/analytics' },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 md:hidden p-2 bg-brand-sidebar border border-slate-800 rounded-lg shadow-md text-white cursor-pointer active:scale-95"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <aside className={cn(
        "fixed inset-y-0 left-0 z-40 w-64 bg-brand-sidebar border-r border-slate-800 transform transition-transform duration-200 ease-in-out md:translate-x-0 md:static",
        isOpen ? "translate-x-0" : "-translate-x-full pointer-events-none md:pointer-events-auto"
      )}>
        <div className="h-full flex flex-col">
          <div className="px-6 py-8 flex items-center gap-3">
            <div className="w-8 h-8 bg-brand-accent rounded-lg flex items-center justify-center font-bold text-black">E</div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">E-Community</h1>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest">SaaS Intelligence</p>
            </div>
          </div>

          <nav className="flex-1 px-4 space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => cn(
                  "flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors",
                  isActive 
                    ? "bg-slate-800/50 text-brand-accent" 
                    : "text-slate-400 hover:bg-slate-800/30 hover:text-white"
                )}
              >
                {({ isActive }) => (
                  <>
                    <item.icon className={cn("mr-3 h-5 w-5", isActive ? "text-brand-accent" : "opacity-60")} />
                    {item.label}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="p-4 border-t border-slate-800">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2.5 text-sm font-medium text-slate-400 rounded-lg hover:bg-red-900/10 hover:text-red-400 transition-colors cursor-pointer active:scale-95"
            >
              <LogOut className="mr-3 h-5 w-5 opacity-60" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
