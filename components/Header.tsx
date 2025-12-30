
import React from 'react';

interface HeaderProps {
  onMenuToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  return (
    <header className="h-16 flex items-center justify-between px-6 bg-surface-light dark:bg-surface-dark border-b border-slate-200 dark:border-slate-800 shrink-0 z-20">
      <div className="flex items-center gap-4">
        <button onClick={onMenuToggle} className="p-1 text-slate-500 hover:text-primary lg:hidden">
          <span className="material-symbols-outlined">menu</span>
        </button>
        <div className="relative hidden sm:block w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="material-symbols-outlined text-slate-400 text-[20px]">search</span>
          </div>
          <input
            className="block w-full rounded-lg border-none bg-background-light dark:bg-slate-800 pl-10 pr-3 py-2 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary dark:text-white"
            placeholder="Tìm kiếm mã vận đơn, sản phẩm..."
            type="text"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="relative p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 border-2 border-white dark:border-surface-dark"></span>
        </button>
        <button className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
          <span className="material-symbols-outlined">settings</span>
        </button>
        <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 mx-1"></div>
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="size-9 rounded-full bg-slate-200 bg-cover bg-center border border-white shadow-sm" style={{ backgroundImage: 'url("https://picsum.photos/100/100?random=2")' }}></div>
        </div>
      </div>
    </header>
  );
};

export default Header;
