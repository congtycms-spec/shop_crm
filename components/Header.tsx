
import React from 'react';

interface HeaderProps {
  onMenuToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  return (
    <header className="h-16 flex items-center justify-between px-4 lg:px-6 bg-surface-light dark:bg-surface-dark border-b border-slate-200 dark:border-slate-800 shrink-0 z-20">
      <div className="flex items-center gap-3 lg:gap-4">
        <button 
          onClick={onMenuToggle} 
          className="size-10 flex items-center justify-center text-slate-500 hover:text-primary hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all"
        >
          <span className="material-symbols-outlined text-[26px]">menu</span>
        </button>
        <div className="relative hidden sm:block w-64 lg:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <span className="material-symbols-outlined text-[20px]">search</span>
          </div>
          <input
            className="block w-full rounded-2xl border-none bg-background-light dark:bg-slate-800 pl-10 pr-3 py-2.5 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary dark:text-white transition-all shadow-inner"
            placeholder="Tìm đơn hàng, sản phẩm..."
            type="text"
          />
        </div>
      </div>
      <div className="flex items-center gap-2 lg:gap-4">
        <button className="relative size-10 flex items-center justify-center text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
          <span className="material-symbols-outlined text-[24px]">notifications</span>
          <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-red-500 border-2 border-white dark:border-surface-dark shadow-sm"></span>
        </button>
        <button className="hidden sm:flex size-10 items-center justify-center text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
          <span className="material-symbols-outlined text-[24px]">settings</span>
        </button>
        <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 mx-1 hidden sm:block"></div>
        <div className="flex items-center gap-2 lg:gap-3 cursor-pointer group">
          <div className="size-10 rounded-xl bg-slate-200 bg-cover bg-center border-2 border-white dark:border-slate-700 shadow-sm transition-transform active:scale-95 shrink-0" style={{ backgroundImage: 'url("https://picsum.photos/100/100?random=2")' }}></div>
          <span className="hidden lg:block text-sm font-black text-slate-700 dark:text-slate-300">Admin</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
