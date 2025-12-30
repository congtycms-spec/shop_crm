
import React from 'react';
import { Page } from '../types';

interface SidebarProps {
  currentPage: Page;
  onPageChange: (page: Page) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, onPageChange, isOpen }) => {
  const navItems = [
    { id: Page.DASHBOARD, label: 'Tổng quan', icon: 'dashboard', section: 'Menu chính' },
    { id: Page.PRODUCTS, label: 'Sản phẩm', icon: 'checkroom', section: 'Menu chính' },
    { id: Page.CUSTOMERS, label: 'Khách hàng', icon: 'groups', section: 'Menu chính' },
    { id: Page.PROMOTIONS, label: 'Khuyến mãi & Giá', icon: 'local_offer', section: 'Quản trị' },
    { id: Page.SALES_CHANNELS, label: 'Kênh bán hàng', icon: 'share', section: 'Quản trị' },
    { id: Page.BUILDER, label: 'Shop Builder', icon: 'storefront', section: 'Quản trị' },
  ];

  const renderNavGroup = (section: string) => (
    <div className="px-3 py-2" key={section}>
      <p className="px-3 text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">
        {section}
      </p>
      {navItems.filter(item => item.section === section).map(item => (
        <button
          key={item.id}
          onClick={() => onPageChange(item.id)}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group mb-1 ${
            currentPage === item.id
              ? 'bg-primary/10 text-primary'
              : 'text-text-secondary hover:bg-background-light dark:hover:bg-slate-800 hover:text-primary'
          }`}
        >
          <span className={`material-symbols-outlined text-[20px] ${currentPage === item.id ? 'fill' : ''}`}>
            {item.icon}
          </span>
          <span className={`text-sm ${currentPage === item.id ? 'font-bold' : 'font-medium'}`}>
            {item.label}
          </span>
        </button>
      ))}
    </div>
  );

  return (
    <aside className={`${isOpen ? 'w-64' : 'w-20'} hidden lg:flex flex-col bg-surface-light dark:bg-surface-dark border-r border-slate-200 dark:border-slate-800 transition-all duration-300 shrink-0`}>
      <div className="flex h-16 items-center px-6 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2 text-primary">
          <span className="material-symbols-outlined text-3xl">checkroom</span>
          {isOpen && <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white truncate">Fashion Shop</h1>}
        </div>
      </div>
      
      <div className="flex-1 flex flex-col py-4 overflow-y-auto overflow-x-hidden">
        {renderNavGroup('Menu chính')}
        {renderNavGroup('Quản trị')}
      </div>

      <div className="border-t border-slate-100 dark:border-slate-800 p-4">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-full bg-slate-200 bg-cover bg-center shrink-0" style={{ backgroundImage: 'url("https://picsum.photos/100/100?random=1")' }}></div>
          {isOpen && (
            <div className="flex flex-col overflow-hidden">
              <p className="text-sm font-bold text-slate-900 dark:text-white truncate">Admin User</p>
              <p className="text-xs text-slate-500 truncate">Quản lý cấp cao</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
