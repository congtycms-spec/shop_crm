
import React from 'react';
import { Page } from '../types';

interface SidebarProps {
  currentPage: Page;
  onPageChange: (page: Page) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, onPageChange, isOpen, onToggle }) => {
  const navItems = [
    { id: Page.DASHBOARD, label: 'Tổng quan', icon: 'dashboard', section: 'Menu chính' },
    { id: Page.PRODUCTS, label: 'Sản phẩm', icon: 'checkroom', section: 'Menu chính' },
    { id: Page.CUSTOMERS, label: 'Khách hàng', icon: 'groups', section: 'Menu chính' },
    { id: Page.PROMOTIONS, label: 'Khuyến mãi & Giá', icon: 'local_offer', section: 'Quản trị' },
    { id: Page.SALES_CHANNELS, label: 'Kênh bán hàng', icon: 'share', section: 'Quản trị' },
    { id: Page.BUILDER, label: 'Shop Builder', icon: 'storefront', section: 'Quản trị' },
  ];

  const handleNavClick = (page: Page) => {
    onPageChange(page);
    // Tự động đóng sidebar trên mobile sau khi chọn trang
    if (window.innerWidth < 1024) {
      onToggle();
    }
  };

  const renderNavGroup = (section: string) => (
    <div className="px-3 py-2" key={section}>
      <p className={`px-3 text-[10px] font-bold text-text-secondary uppercase tracking-wider mb-2 transition-opacity duration-300 ${!isOpen && 'lg:opacity-0'}`}>
        {section}
      </p>
      {navItems.filter(item => item.section === section).map(item => (
        <button
          key={item.id}
          onClick={() => handleNavClick(item.id)}
          className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all group mb-1 ${
            currentPage === item.id
              ? 'bg-primary text-white shadow-lg shadow-primary/25'
              : 'text-text-secondary hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-primary'
          }`}
          title={item.label}
        >
          <span className={`material-symbols-outlined text-[22px] shrink-0 ${currentPage === item.id ? 'fill' : ''}`}>
            {item.icon}
          </span>
          <span className={`text-sm whitespace-nowrap transition-all duration-300 ${isOpen ? 'opacity-100' : 'lg:hidden'}`}>
            {item.label}
          </span>
        </button>
      ))}
    </div>
  );

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={onToggle}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 lg:static flex flex-col bg-surface-light dark:bg-surface-dark border-r border-slate-200 dark:border-slate-800 transition-all duration-300 shrink-0
        ${isOpen ? 'w-72 translate-x-0' : 'w-72 -translate-x-full lg:w-20 lg:translate-x-0'}
      `}>
        <div className="flex h-16 items-center justify-between px-6 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3 text-primary">
            <span className="material-symbols-outlined text-3xl font-black">checkroom</span>
            <h1 className={`text-xl font-black tracking-tight text-slate-900 dark:text-white truncate transition-all ${!isOpen && 'lg:hidden'}`}>
              FASHION<span className="text-primary font-normal">.OS</span>
            </h1>
          </div>
          <button onClick={onToggle} className="lg:hidden text-slate-500">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        
        <div className="flex-1 flex flex-col py-6 overflow-y-auto overflow-x-hidden scrollbar-hide">
          {renderNavGroup('Menu chính')}
          {renderNavGroup('Quản trị')}
        </div>

        <div className="border-t border-slate-100 dark:border-slate-800 p-4">
          <div className={`flex items-center gap-3 bg-slate-50 dark:bg-slate-800/50 p-2 rounded-2xl transition-all ${!isOpen && 'lg:justify-center'}`}>
            <div className="size-10 rounded-xl bg-slate-200 bg-cover bg-center shrink-0 shadow-inner" style={{ backgroundImage: 'url("https://picsum.photos/100/100?random=1")' }}></div>
            <div className={`flex flex-col overflow-hidden transition-all duration-300 ${isOpen ? 'w-full opacity-100' : 'w-0 opacity-0 lg:hidden'}`}>
              <p className="text-sm font-bold text-slate-900 dark:text-white truncate">Lê Minh Admin</p>
              <p className="text-[10px] text-primary font-bold uppercase">Store Owner</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
